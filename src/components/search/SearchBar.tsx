"use client";
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      searchMovies(query)
        .then((data) => {
          setResults(data.results.slice(0, 5));
        })
        .finally(() => setLoading(false));
    }, 400);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);
  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };
  return (
    <div className="mt-6 max-w-xl mx-auto relative text-white">
      {" "}
      <div className="relative">
        {" "}
        <input
          type="search"
          placeholder="Buscar película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" w-full rounded-full px-4 pr-10 py-2 bg-transparent border border-red-600 text-white font-bold placeholder-red-500 shadow-[0_0_10px_rgba(255,0,0,0.7)] focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 "
          autoComplete="off"
        />{" "}
        {/* Botón X para limpiar */}{" "}
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
            className=" absolute top-1/2 right-3 -translate-y-1/2 text-red-600 hover:text-red-400 transition-colors duration-200 font-bold text-lg select-none focus:outline-none "
          >
            {" "}
            &#10005;{" "}
          </button>
        )}{" "}
      </div>{" "}
      {/* Dropdown resultados */}{" "}
      {query && (
        <div className=" absolute z-30 w-full bg-black bg-opacity-20 rounded-xl shadow-[0_4px_12px_rgba(255,0,0,0.7)] max-h-72 overflow-y-auto mt-1 backdrop-blur-md border border-red-600 scrollbar ">
          {" "}
          {loading && (
            <div className="p-4 text-center text-red-400 italic font-semibold">
              {" "}
              Buscando...{" "}
            </div>
          )}{" "}
          {!loading && results.length === 0 && (
            <div className="p-4 text-center text-red-400 italic font-semibold">
              {" "}
              No se encontraron resultados{" "}
            </div>
          )}{" "}
          {!loading &&
            results.map((movie) => (
              <div
                key={movie.id}
                className=" p-3 cursor-pointer flex items-center gap-3 rounded-md transition-colors duration-200 hover:bg-red-800 hover:bg-opacity-70 "
                onClick={() =>
                  window.open(
                    `https://www.themoviedb.org/movie/${movie.id}`,
                    "_blank"
                  )
                }
                title={movie.title}
              >
                {" "}
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 rounded-md flex-shrink-0 object-cover shadow-[0_0_5px_rgba(255,0,0,0.7)]"
                  loading="lazy"
                />{" "}
                <div className="text-sm font-semibold truncate text-red-400 drop-shadow-[0_0_6px_#ff0000]">
                  {" "}
                  {movie.title}{" "}
                </div>{" "}
              </div>
            ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}

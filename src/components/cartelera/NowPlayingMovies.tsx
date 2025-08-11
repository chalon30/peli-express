"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getNowPlayingMovies } from "@/services/movieService";

export default function NowPlayingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (pageNum: number) => {
    const data = await getNowPlayingMovies(pageNum);
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  if (movies.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-bold mb-4">
        🎬 Películas en Cartelera
      </h2>

      {/* Grid de películas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div
              className="w-full h-[250px] sm:h-[300px] bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-semibold drop-shadow-md">
                {movie.title}
              </h3>
              <p className="text-xs opacity-80 line-clamp-2">
                {movie.overview || "Sinopsis no disponible."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ⬅ Anterior
        </button>
        <span className="text-white">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente ➡
        </button>
      </div>
    </section>
  );
}

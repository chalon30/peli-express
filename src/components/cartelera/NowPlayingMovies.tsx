"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getNowPlayingMovies } from "@/services/movieService";

export default function NowPlayingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNowPlayingMovies(pageNum);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch {
      setError("Error al cargar las películas.");
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  return (
    <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-40 shadow-red-900">
      <h2 className="flex items-center gap-3 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-wide drop-shadow-[0_0_12px_rgba(255,0,0,0.9)]">
        <span className="flex-6 border-b border-red-600 ml-4"></span>
        <span>Catálogo de Películas</span>
        <span className="flex-1 border-b border-red-600 ml-4"></span>
      </h2>

      {/* Mensajes de estado */}
      {loading && (
        <p className="text-white text-center mb-4 animate-pulse text-base sm:text-lg">
          Cargando películas...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center mb-4 text-base sm:text-lg">
          {error}
        </p>
      )}
      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-400 text-center mb-4 text-base sm:text-lg">
          No hay películas disponibles.
        </p>
      )}

      {/* Grid de películas */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          !error &&
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-full h-[140px] sm:h-[180px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 p-2 sm:p-3 text-white bg-gradient-to-t from-black/80 via-transparent to-transparent w-full">
                <h3 className="text-sm sm:text-base font-semibold drop-shadow-md truncate">
                  {movie.title}
                </h3>
                <p className="text-[10px] sm:text-xs opacity-80 line-clamp-2">
                  {movie.overview || "Sinopsis no disponible."}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 mb-8">
        <button
          className="px-5 py-2.5 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition w-full sm:w-auto"
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ⬅ Anterior
        </button>
        <span className="text-white select-none text-sm sm:text-base">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-5 py-2.5 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition w-full sm:w-auto"
          disabled={page === totalPages || loading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente ➡
        </button>
      </div>
    </section>
  );
}

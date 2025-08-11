"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";

export default function TrendsMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setMovies(data.results.slice(0, 6));
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 relative"> {/* Más padding para el top */}
      {/* Etiqueta */}
      <h2
        className="
          inline-flex
          bg-red-700 bg-opacity-90
          rounded-full
          px-6 py-2
          text-white
          font-extrabold
          text-xl
          tracking-wide
          drop-shadow-[0_0_8px_#ff0000]
          select-none
          absolute
          left-1/2
          -top-4
          -translate-x-1/2
          z-10
        "
      >
        Tendencias
      </h2>

      {/* Grid 2 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="flex gap-4 items-start">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-28 rounded-md object-cover flex-shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="text-lg font-semibold text-red-500 drop-shadow-[0_0_6px_#ff0000] mb-1">
                {movie.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-3">
                {movie.overview || "Sin descripción disponible."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

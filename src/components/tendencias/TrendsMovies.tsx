"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";
import ScrollAnimation from "@/components/scroll/ScrollAnimation";

export default function TrendsMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setMovies(data.results.slice(0, 6));
    });
  }, []);

  return (
    <div className="max-w-[1450px] w-full mx-auto py-16 px-6 relative">
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
          hover:bg-red-600
          hover:drop-shadow-[0_0_16px_#ff4d4d]
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
          <ScrollAnimation key={movie.id}>
            <div className="flex gap-6 items-start bg-black rounded-lg p-4 shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-20 rounded-lg object-cover flex-shrink-0 shadow-sm"
                loading="lazy"
              />
              <div className="flex flex-col flex-grow min-w-0">
                <h3
                  className="
                    text-md
                    font-semibold
                    text-red-500
                    drop-shadow-[0_0_6px_#ff0000]
                    mb-2
                    truncate
                  "
                >
                  {movie.title}
                </h3>
                <div
                  className="
                    text-gray-300
                    text-sm
                    max-h-24
                    overflow-y-auto
                    pr-2
                    scrollbar
                    scrollbar-thumb-gray-700
                    scrollbar-track-gray-900
                    scrollbar-thumb-rounded
                    scrollbar-track-rounded
                    scrollbar-w-2
                    scrollbar-thumb-hover:bg-gray-600
                  "
                  title={movie.overview || "Sin descripción disponible."}
                >
                  {movie.overview || "Sin descripción disponible."}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}

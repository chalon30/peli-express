"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getUpcomingMovies } from "@/services/movieService";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export default function UpcomingMoviesCalendar() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((data) => {
      setMovies(data.results.slice(0, 6)); // solo 6 estrenos
    });
  }, []);

  if (!movies.length) return null;

  return (
    <section >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl border border-red-700 hover:border-red-500 transition-all duration-300 hover:scale-[1.03] transform cursor-pointer"
          >
            {/* Fecha estilo calendario */}
            <div className="flex flex-col items-center justify-center bg-red-700 p-4 w-20 text-white rounded-l-xl">
              <span className="text-2xl font-extrabold tracking-wide">
                {dayjs(movie.release_date).format("DD")}
              </span>
              <span className="text-sm uppercase tracking-wider">
                {dayjs(movie.release_date).format("MMM")}
              </span>
            </div>

            {/* Poster y detalles */}
            <div className="flex-1 flex items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-20 h-full object-cover hidden sm:block"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold line-clamp-2 tracking-tight">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

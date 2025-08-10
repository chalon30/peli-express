"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getPopularMovies } from "@/services/movieService";

export default function FeaturedMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setMovie(data.results[0]); // primera película popular
    });
  }, []);

  if (!movie) return null;

  return (
    <section
      className="relative w-full h-[350px] md:h-[480px] rounded-xl overflow-hidden shadow-2xl group animate-fadeIn mt-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* Etiqueta en la parte superior */}
      <div className="absolute top-4 right-4 bg-red-600/90 text-white px-3 py-1.5 rounded-lg shadow-md text-xs sm:text-sm font-semibold uppercase tracking-wide drop-shadow-[0_0_8px_#ff0000]">
        Película del Día
      </div>

      {/* Contenido principal */}
      <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-white max-w-2xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 drop-shadow-[0_0_10px_#ff0000] tracking-wide">
          {movie.title}
        </h2>
        <p className="text-xs sm:text-base mb-4 line-clamp-3 opacity-90 leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </section>
  );
}

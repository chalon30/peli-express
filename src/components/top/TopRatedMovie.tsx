"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getTopRatedMovies } from "@/services/movieService";

export default function TopRatedMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const storedData = localStorage.getItem("topRatedMovie");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed.date === today) {
        setMovie(parsed.movie);
        return;
      }
    }

    getTopRatedMovies().then((data) => {
      if (!data.results.length) return;

      let newMovie: Movie;
      if (storedData) {
        const prevMovieId = JSON.parse(storedData).movie.id;
        const availableMovies = data.results.filter(
          (m: Movie) => m.id !== prevMovieId
        );
        newMovie =
          availableMovies[Math.floor(Math.random() * availableMovies.length)];
      } else {
        newMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
      }

      setMovie(newMovie);
      localStorage.setItem(
        "topRatedMovie",
        JSON.stringify({ date: today, movie: newMovie })
      );
    });
  }, []);

  if (!movie) return null;

  const synopsis =
    movie.overview?.trim() ||
    "Sinopsis no disponible. Vuelve más tarde para más información.";

  return (
    <section
      className="relative w-full h-[350px] md:h-[480px] overflow-hidden shadow-2xl group animate-fadeIn mt-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* Etiqueta */}
      <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1.5 rounded-lg shadow-md text-xs sm:text-sm font-semibold uppercase tracking-wide drop-shadow-[0_0_8px_#ffd700]">
        Mejor Valorada
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-white max-w-2xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 drop-shadow-[0_0_10px_#ffd700] tracking-wide">
          {movie.title}
        </h2>
        <p className="text-xs sm:text-base mb-4 line-clamp-3 opacity-90 leading-relaxed">
          {synopsis}
        </p>
      </div>
    </section>
  );
}

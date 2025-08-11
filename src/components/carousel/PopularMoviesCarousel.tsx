"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import MovieTrailerModal from "@/components/trailer/MovieTrailer";

export default function PopularMoviesCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    getPopularMovies().then((data) => setMovies(data.results));
  }, []);

  const openTrailer = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const closeTrailer = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-6 px-4 relative">
        {/* Etiqueta */}
        <div
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
          transition
          duration-300
          cursor-default
          select-none
          absolute
          top-0
          left-1/2
          transform
          -translate-x-1/2
          -translate-y-1/2
          z-10
          text-center 
        "
        >
          Populares
        </div>

        {/* Carrusel */}
        <div className="pt-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={movies.length >= 6}
            className="w-full"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    // Zoom solo en desktop (md y superior)
                    className="rounded-xl transition-transform duration-500 cursor-pointer md:group-hover:scale-110"
                  />
                  {/* Overlay visible siempre en móviles, solo en hover en desktop */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t from-black/80 via-black/40 to-transparent
                      opacity-100
                      md:opacity-0 md:group-hover:opacity-100
                      transition-opacity duration-500
                      flex flex-col justify-end p-4 space-y-2
                    "
                  >
                    <h3 className="text-lg font-bold text-red-500 drop-shadow-[0_0_6px_#ff0000]">
                      {movie.title}
                    </h3>
                    <span className="text-xs text-gray-300">
                      Estreno:{" "}
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString("es-ES")
                        : "N/A"}
                    </span>
                    <button
                      onClick={() => openTrailer(movie.id)}
                      className="self-start bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white text-sm px-4 py-1 rounded shadow-md"
                      type="button"
                    >
                      Ver Trailer
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal del trailer */}
      {selectedMovieId && (
        <MovieTrailerModal movieId={selectedMovieId} onClose={closeTrailer} />
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function PopularMoviesCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((data) => setMovies(data.results));
  }, []);

  return (
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

      {/* Espaciado para que la etiqueta no tape el carrusel */}
      <div className="pt-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl transform group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <h3 className="text-lg font-bold text-red-500 drop-shadow-[0_0_6px_#ff0000]">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

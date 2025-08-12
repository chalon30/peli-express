"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMovieDetails } from "@/services/movieService";
import { Movie } from "@/interfaces/Movie";
import MovieTrailerModal from "@/components/trailer/MovieTrailer";

export default function MovieDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((e) => {
        console.error("Error al obtener detalles:", e);
        setError("No se pudo cargar la película");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-20 text-sm sm:text-base">
        Cargando detalles de la película...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-20 text-sm sm:text-base">
        {error}
        <br />
        <button
          className="mt-4 px-4 py-2 bg-red-600 rounded text-sm sm:text-base"
          onClick={() => router.back()}
        >
          Volver
        </button>
      </div>
    );
  }

  if (!movie) {
    return null; // o un mensaje de no encontrado
  }

  return (
    <>
      <main className="max-w-5xl mx-auto p-4 sm:p-8 bg-gradient-to-br rounded-lg shadow-2xl mt-10 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-center sm:text-left">
          {movie.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-shrink-0 lg:w-2/5 rounded-lg overflow-hidden shadow-lg">
            {movie.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover max-h-[300px] sm:max-h-[400px]"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[300px] sm:h-[400px] bg-gray-700 flex items-center justify-center text-gray-400 text-sm sm:text-base">
                Imagen no disponible
              </div>
            )}
          </div>

          <section className="lg:w-3/5 flex flex-col justify-between text-sm sm:text-base">
            <p className="leading-relaxed mb-6">
              {movie.overview || "Sinopsis no disponible."}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
              {movie.genres && movie.genres.length > 0 && (
                <span className="bg-red-600 px-3 py-1 rounded-full text-white font-semibold shadow-md text-xs sm:text-sm">
                  Géneros: {movie.genres.map((g) => g.name).join(", ")}
                </span>
              )}

              {movie.release_date && (
                <span className="bg-gray-800 px-3 py-1 rounded-full shadow-md text-xs sm:text-sm">
                  Estreno: {movie.release_date}
                </span>
              )}

              {movie.runtime && (
                <span className="bg-gray-800 px-3 py-1 rounded-full shadow-md text-xs sm:text-sm">
                  Duración: {movie.runtime} min
                </span>
              )}

              <span className="bg-yellow-200 px-3 py-1 rounded-full font-bold text-black shadow-md flex items-center gap-1 text-xs sm:text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <button
              onClick={() => setIsTrailerOpen(true)}
              className="bg-red-600 px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-red-700 transition text-sm sm:text-base w-full"
            >
              Ver Trailer
            </button>
          </section>
        </div>
      </main>

      {isTrailerOpen && (
        <MovieTrailerModal
          movieId={movie.id}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </>
  );
}

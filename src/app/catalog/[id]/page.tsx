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
    return null;
  }

  return (
    <>
      <main className="max-w-6xl mx-auto p-6 sm:p-10 rounded-lg mt-10 text-white">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 tracking-wide drop-shadow-lg text-center sm:text-left">
          {movie.title}
        </h1>

        {/* Contenedor principal: poster + detalles */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Poster + botón */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/3">
            {movie.poster_path ? (
              <div className="w-full max-w-[300px] aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full max-w-[300px] aspect-[2/3] bg-gray-700 flex items-center justify-center text-gray-400 text-sm sm:text-base rounded-lg shadow-lg">
                Imagen no disponible
              </div>
            )}

            <button
              onClick={() => setIsTrailerOpen(true)}
              className="mt-6 w-full max-w-[300px] bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-lg shadow-md text-base"
            >
              Ver Trailer
            </button>
          </div>

          {/* Sinopsis + detalles */}
          <section className="lg:w-2/2 flex flex-col text-sm sm:text-base">
            <h2 className="text-2xl font-semibold mb-6">Sinopsis</h2>
            <p className="leading-relaxed mb-8">
              {movie.overview || "Sinopsis no disponible."}
            </p>

            <div className="flex flex-wrap gap-4">
              {movie.genres && movie.genres.length > 0 && (
                <span className="bg-red-600 px-4 py-2 rounded-full text-white font-semibold shadow-md text-sm">
                  Géneros: {movie.genres.map((g) => g.name).join(", ")}
                </span>
              )}

              {movie.release_date && (
                <span className="bg-gray-800 px-4 py-2 rounded-full shadow-md text-sm">
                  Estreno: {movie.release_date}
                </span>
              )}

              {movie.runtime && (
                <span className="bg-gray-800 px-4 py-2 rounded-full shadow-md text-sm">
                  Duración: {movie.runtime} min
                </span>
              )}

              <span className="bg-yellow-200 px-4 py-2 rounded-full font-bold text-black shadow-md flex items-center gap-2 text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
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

"use client";

import { useEffect, useState } from "react";
import { getMovieVideos } from "@/services/movieService";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  movieId: number | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function MovieTrailerModal({ movieId, onClose }: Props) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    getMovieVideos(movieId).then((videos) => {
      const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer?.key ?? null);
      setLoading(false);
    });
  }, [movieId]);

  return (
    <AnimatePresence>
      {movieId && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-5xl aspect-video overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            {loading && (
              <div className="flex flex-col items-center justify-center h-full text-white">
                <svg
                  className="animate-spin h-10 w-10 mb-4 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-label="Cargando trailer"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <p>Cargando trailer...</p>
              </div>
            )}

            {!loading && trailerKey && (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1`}
                title="Trailer de película"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-none"
              />
            )}

            {!loading && !trailerKey && (
              <div className="flex items-center justify-center h-full p-6 text-center text-white">
                <p>No hay trailer disponible para esta película.</p>
              </div>
            )}

            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white text-5xl font-extrabold hover:text-red-600
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded-full"
              aria-label="Cerrar"
              title="Cerrar"
              type="button"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

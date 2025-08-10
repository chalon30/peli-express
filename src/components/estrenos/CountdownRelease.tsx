"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { getNextReleaseMovie } from "@/services/movieService";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownRelease() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    getNextReleaseMovie().then(setMovie);
  }, []);

  useEffect(() => {
    if (!movie || !movie.release_date) return;

    const target = dayjs(movie.release_date).endOf("day");

    const update = () => {
      const now = dayjs();
      const diff = target.diff(now);

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return false;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: String(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });

      return true;
    };

    let running = update();

    const id = setInterval(() => {
      if (!running) {
        clearInterval(id);
        return;
      }
      running = update();
    }, 1000);

    return () => clearInterval(id);
  }, [movie]);

  if (!movie) {
    return (
      <aside>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border-2 border-red-700/70 text-white">
          <h3 className="text-lg font-bold text-red-500 mb-2">🔔 Próximo estreno</h3>
          <p className="text-sm text-gray-400">No hay estrenos próximos disponibles.</p>
        </div>
      </aside>
    );
  }

  const isExpired =
    timeLeft.days === "00" &&
    timeLeft.hours === "00" &&
    timeLeft.minutes === "00" &&
    timeLeft.seconds === "00";

  return (
    <aside>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-red-600/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-5 border-b border-red-600/30">
          <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder-poster.png";
              }}
            />
          </div>
          <div>
            <span className="text-xs uppercase text-red-500 font-semibold tracking-wider drop-shadow-[0_0_8px_#ff4444]">
              Próximo Estreno
            </span>
            <h4 className="text-2xl font-extrabold text-white leading-tight mt-1">
              {movie.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">
              {dayjs(movie.release_date).format("D [de] MMMM, YYYY")}
            </p>
          </div>
        </div>

        {/* Contador o mensaje */}
        {isExpired ? (
          <p className="text-center text-red-600 font-extrabold text-2xl p-8">
            ¡Ya disponible!
          </p>
        ) : (
          <div className="p-6">
            <div className="bg-black/50 rounded-xl p-5 flex justify-between gap-4 shadow-lg">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit} className="flex flex-col items-center px-3">
                  <span className="text-4xl font-extrabold text-red-500 drop-shadow-[0_0_8px_#ff0000]">
                    {timeLeft[unit as keyof typeof timeLeft]}
                  </span>
                  <span className="text-sm text-gray-300 mt-1 uppercase tracking-wide">
                    {unit === "days"
                      ? "Días"
                      : unit === "hours"
                      ? "Horas"
                      : unit === "minutes"
                      ? "Min"
                      : "Seg"}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA / acciones */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-2xl text-white font-bold transition-shadow shadow-md hover:shadow-[0_0_18px_#ff4444]"
                onClick={() => alert(`Recordatorio establecido para: ${movie.title}`)}
              >
                Recordarme
              </button>

              <a
                className="px-5 py-3 rounded-2xl text-sm bg-transparent border border-red-600 text-red-400 hover:bg-red-600/20 transition"
                href={`/movie/${movie.id}`}
              >
                Ver ficha
              </a>
            </div>

            {/* Nota */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              Estreno local: {dayjs(movie.release_date).format("D MMM YYYY")}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

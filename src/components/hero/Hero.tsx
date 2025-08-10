"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[40vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/img/hero/fondo.png"
        alt="Fondo de películas"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover scale-105 transition-transform duration-[4000ms] ease-out hover:scale-110"
      />

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg leading-tight">
          Encuentra tu <span className="text-red-500 hover:text-red-400 transition-colors duration-400 drop-shadow-[2px_2px_10px_#ff0000]">película</span> favorita
        </h1>
        <p className="mt-3 text-sm md:text-lg text-gray-200 drop-shadow-md">
          Explora miles de títulos y descubre nuevas historias
        </p>
      </div>

      {/* Animación con Tailwind */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

import CountdownRelease from "./CountdownRelease";
import UpcomingMoviesCalendar from "./UpcomingMoviesCalendar";

export default function Estrenos() {
  return (
    <section className="flex flex-col lg:flex-row max-w-8xl mx-auto gap-6 px-4 py-2 items-start relative">
      {/* Etiqueta Estrenos */}
      <div
        className="
          inline-block
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
        "
      >
        Estrenos
      </div>

      {/* Contenedor izquierdo */}
      <div className="lg:w-3/3 pt-10"> {/* padding top para que no tape la etiqueta */}
        <UpcomingMoviesCalendar />
      </div>

      {/* Contenedor derecho sin margen negativo, alineado arriba y con espacio */}
      {/* <div className="lg:w-1/3 flex justify-center">
        <div className="mt-12 w-full max-w-sm">
          <CountdownRelease />
        </div>
      </div> */}
    </section>
  );
}

// src/components/HeaderDesktop.tsx
import Link from "next/link";

const HeaderDesktop = () => {
  return (
    <header
      className="text-white p-4 shadow-lg shadow-red-900 hidden md:flex items-center justify-between border-b-4 border-red-600 shadow-[0_0_10px_red]"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #1a0000 120%)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="flex items-center space-x-2">
          <Link
            href="/"
            className="text-3xl md:text-4xl font-extrabold tracking-wider text-red-500 hover:text-red-400 transition-colors duration-300 drop-shadow-[0_0_8px_#ff0000]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "2px",
            }}
          >
            Pelixpress
          </Link>
          <img
            src="/img/header/gif.gif"
            alt="Logo"
            className="w-12 h-12 drop-shadow-[0_0_6px_red]"
          />
        </h1>

        {/* Menú de navegación */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/catalog"
                className="text-lg font-semibold hover:text-red-400 hover:drop-shadow-[0_0_6px_red] transition-all duration-300 ease-in-out"
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:text-yellow-400 hover:drop-shadow-[0_0_6px_yellow] transition-all duration-300 ease-in-out"
              >
                ⭐
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:text-yellow-400 hover:drop-shadow-[0_0_6px_yellow] transition-all duration-300 ease-in-out"
              >
                📩
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderDesktop;

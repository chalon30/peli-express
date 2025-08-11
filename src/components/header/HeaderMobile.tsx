"use client";

import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import useMenu from "@/scripts/menu";

const HeaderMobile = () => {
  const { isOpen, toggleMenu, containerRef } = useMenu();

  return (
    <header
      ref={containerRef}
      className="bg-black text-white p-4 shadow-lg shadow-red-900 flex md:hidden relative z-50 border-b-4 border-red-600 shadow-[0_0_10px_red]"
    >
      <div className="container mx-auto flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wider text-red-500 hover:text-red-400 transition-colors duration-300 drop-shadow-[0_0_8px_#ff0000] flex items-center space-x-2"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "1.5px",
            }}
          >
            <span>Pelixpress</span>
          </Link>
          <img
            src="/img/header/gif.gif"
            alt="Logo"
            className="w-10 h-10 drop-shadow-[0_0_6px_red]"
          />
        </div>

        {/* Botón menú */}
        <button
          id="menu-button"
          onClick={toggleMenu}
          className="text-white p-2 rounded-md focus:outline-none ml-auto z-50"
        >
          {isOpen ? (
            <FaTimes className="w-8 h-8 text-red-500 hover:text-red-400 transition-colors duration-300" />
          ) : (
            <FaBars className="w-8 h-8 text-red-500 hover:text-red-400 transition-colors duration-300" />
          )}
        </button>
      </div>

      {/* Menú desplegable estilizado */}
      <nav
        id="mobile-menu"
        className={`absolute top-20 left-0 w-full p-6 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "block opacity-100 translate-y-0"
            : "hidden opacity-0 -translate-y-10"
        } shadow-lg border-t-4 border-red-500 shadow-[0_0_10px_red]`}
        style={{
          background: "linear-gradient(180deg, #000000 0%, #1a0000 100%)",
        }}
      >
        <ul className="flex flex-col space-y-6">
          <li>
            <Link
              href="/catalog"
              className="text-lg font-semibold hover:text-red-400 hover:drop-shadow-[0_0_6px_red] transition-all duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              Catálogo
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-lg font-semibold hover:text-yellow-400 hover:drop-shadow-[0_0_6px_yellow] transition-all duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              ⭐
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-lg font-semibold hover:text-yellow-400 hover:drop-shadow-[0_0_6px_yellow] transition-all duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              📩
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderMobile;

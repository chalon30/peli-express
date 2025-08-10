export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-500/30 text-gray-400 py-8 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <h2 className="text-2xl font-bold text-red-500 drop-shadow-[0_0_6px_#ff0000]">
              MovieApp
            </h2>
            <p className="mt-4 text-sm">
              Explora las películas más populares, descubre próximos estrenos y disfruta del cine desde casa.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-400 transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Populares</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Próximos estrenos</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-red-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-red-400 transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} MovieApp. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

// src/scripts/menu.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Creamos un ref para el contenedor del menú (que incluirá botón y menú)
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el menú está abierto y el clic ocurre fuera del contenedor, se cierra
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    toggleMenu,
    containerRef,
  };
};

export default useMenu;

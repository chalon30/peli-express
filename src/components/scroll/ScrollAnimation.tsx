"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  animationClass?: string; // clase CSS para animación
  className?: string;
};

export default function ScrollAnimation({
  children,
  animationClass = "animate-fadeInUp",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // solo animar 1 vez
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible
          ? animationClass
          : "opacity-0 translate-y-10 pointer-events-none"
      } transition-all duration-700 ease-out will-change-transform will-change-opacity`}
    >
      {children}
    </div>
  );
}

'use client'

import Hero from "@/components/hero/Hero";
import PopularMoviesCarousel from "@/components/carousel/PopularMoviesCarousel"
import FeaturedMovie from "@/components/popular/FeaturedMovie";
import TopRatedMovie from "@/components/top/TopRatedMovie";
import UpcomingMoviesCarousel from "@/components/carousel/UpcomingMoviesCarousel";
import TrendsMovies from "@/components/tendencias/TrendsMovies";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <section>
          <PopularMoviesCarousel />
          <FeaturedMovie />
          <TrendsMovies />
          <TopRatedMovie />
          <UpcomingMoviesCarousel />
        </section>
      </main>
    </>
  );
}

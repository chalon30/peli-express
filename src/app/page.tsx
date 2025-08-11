'use client'

import Hero from "@/components/hero/Hero";
import PopularMoviesCarousel from "@/components/carousel/PopularMoviesCarousel"
import FeaturedMovie from "@/components/popular/FeaturedMovie";
import Estrenos from "@/components/estrenos/Estrenos";
import TopRatedMovie from "@/components/top/TopRatedMovie";
import UpcomingMoviesCarousel from "@/components/carousel/UpcomingMoviesCarousel";


export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <section>
          <PopularMoviesCarousel />
          <FeaturedMovie />
          <Estrenos />
          <TopRatedMovie />
          <UpcomingMoviesCarousel />
        </section>
      </main>
    </>
  );
}

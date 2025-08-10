import tmdbApi from "@/api/tmdbApi";
import { MovieResponse, Movie } from "@/interfaces/Movie";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

export const getPopularMovies = async (): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/movie/popular");
  return data;
};

export const getUpcomingMovies = async (): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/movie/upcoming");
  return data;
};

export const searchMovies = async (query: string): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/search/movie", {
    params: { query },
  });
  return data;
};

/**
 * Obtiene la próxima película que se estrenará (la más cercana a hoy)
 */
export const getNextReleaseMovie = async (): Promise<Movie | null> => {
  const { data } = await tmdbApi.get<MovieResponse>("/movie/upcoming");

  console.log("Películas upcoming:", data.results.map(m => ({ title: m.title, date: m.release_date })));

  const today = dayjs().startOf("day");

  const futureMovies = data.results
    .filter((movie) => movie.release_date)
    .map((movie) => ({
      ...movie,
      releaseAt: dayjs(movie.release_date),
    }))
    .filter((movie) => movie.releaseAt.isSameOrAfter(today, "day"));

  console.log("Películas futuras:", futureMovies.map(m => ({ title: m.title, date: m.releaseAt.format("YYYY-MM-DD") })));

  if (futureMovies.length === 0) return null;

  futureMovies.sort((a, b) => a.releaseAt.valueOf() - b.releaseAt.valueOf());

  const { releaseAt, ...movieWithoutReleaseAt } = futureMovies[0];

  return movieWithoutReleaseAt as Movie;
};

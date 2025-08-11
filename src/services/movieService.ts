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

  const today = dayjs().startOf("day");

  const filteredResults = data.results
    .filter(movie => movie.release_date)
    .filter(movie => dayjs(movie.release_date).isSameOrAfter(today, "day"));

  return {
    ...data,
    results: filteredResults,
  };
};

export const searchMovies = async (query: string): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/search/movie", {
    params: { query },
  });
  return data;
};

export const getTopRatedMovies = async (): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/movie/top_rated");
  return data;
};

export const getNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
  const { data } = await tmdbApi.get<MovieResponse>("/movie/now_playing", {
    params: { page },
  });
  return data;
};

/**
 * Obtiene la próxima película que se estrenará (la más cercana a hoy)
 */
export const getNextReleaseMovie = async (): Promise<Movie | null> => {
  const upcoming = await getUpcomingMovies(); // Ya filtrado por fecha

  if (!upcoming.results.length) return null;

  // Ordenar por fecha más cercana
  const sorted = [...upcoming.results].sort(
    (a, b) => dayjs(a.release_date).valueOf() - dayjs(b.release_date).valueOf()
  );

  return sorted[0];
};

import tmdbApi from "@/api/tmdbApi";
import { MovieResponse, Movie } from "@/interfaces/Movie";
import { MovieVideosResponse } from "@/interfaces/MovieVideo";
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

export const getMovieVideos = async (movieId: number) => {
  try {
    const { data } = await tmdbApi.get<MovieVideosResponse>(`/movie/${movieId}/videos`);
    return data.results;
  } catch (error) {
    console.error("Error fetching videos for movie:", movieId, error);
    return [];
  }
};



//no sirve la api no devulve peliculas en estreno a la fecha posteior a hoy (recien me doy cuenta xd)

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

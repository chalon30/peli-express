// api/tmdbApi.ts
import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "es-ES", // puedes cambiar el idioma
  },
});

export default tmdbApi;

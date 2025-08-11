export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string; // "YouTube", etc.
  size: number;
  type: string; // "Trailer", "Teaser", etc.
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

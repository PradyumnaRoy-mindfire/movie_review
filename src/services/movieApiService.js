import axios from 'axios';

const MOVIE_API_BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const api = axios.create({
  baseURL: MOVIE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMovies = async (page) => {
  const response = await api.get(
    `/movie/popular?api_key=${MOVIE_API_KEY}&page=${page}`
  );
  return response.data;
};

export const fetchGenres = async () => {
  const response = await api.get(`/genre/movie/list?api_key=${MOVIE_API_KEY}`);
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}?api_key=${MOVIE_API_KEY}`);
  return response.data;
};

export const fetchMovieVideos = async (movieId) => {
  const response = await api.get(
    `/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}`
  );
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await api.get(
    `/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`
  );
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await api.get(
    `/search/movie?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(query)}`
  );
  return response.data;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await api.get(
    `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=${genreId}`
  );
  return response.data;
};

export const fetchTrendingMovies = async () => {
  const response = await api.get(
    `/trending/movie/week?api_key=${MOVIE_API_KEY}`
  );
  return response.data;
};

export const fetchTopRatedMovies = async () => {
  const response = await api.get(`/movie/top_rated?api_key=${MOVIE_API_KEY}`);
  return response.data;
};

export const fetchUpcomingMovies = async () => {
  const response = await api.get(
    `/movie/upcoming?api_key=${MOVIE_API_KEY}&page=2`
  );
  return response.data;
};

export const fetchNowPlayingMovies = async () => {
  const response = await api.get(`/movie/now_playing?api_key=${MOVIE_API_KEY}`);
  return response.data;
};

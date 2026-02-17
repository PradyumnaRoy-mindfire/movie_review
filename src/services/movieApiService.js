import axios from 'axios';
import { logApiError } from '../utils/errorLogger';

const MOVIE_API_BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const api = axios.create({
  baseURL: MOVIE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    logApiError(error, endpoint);
    throw error;
  }
};

export const fetchMovies = async (page) => {
  const endpoint = `/movie/popular?api_key=${MOVIE_API_KEY}&page=${page}`;
  return apiRequest(endpoint);
};

export async function fetchMovieDetails(movieId) {
  const endpoint = `/movie/${movieId}?api_key=${MOVIE_API_KEY}`;
  return apiRequest(endpoint);
}

export const searchMovies = async (query) => {
  const endpoint = `/search/movie?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(query)}`;
  return apiRequest(endpoint);
};

export const fetchTrendingMovies = async () => {
  const endpoint = `/trending/movie/week?api_key=${MOVIE_API_KEY}`;
  return apiRequest(endpoint);
};

export const fetchTopRatedMovies = async () => {
  const endpoint = `/movie/top_rated?api_key=${MOVIE_API_KEY}`;
  return apiRequest(endpoint);
};

export async function fetchUpcomingMovies() {
  const endpoint = `/movie/upcoming?api_key=${MOVIE_API_KEY}`;
  return apiRequest(endpoint);
}

export async function fetchNowPlayingMovies() {
  const endpoint = `/movie/now_playing?api_key=${MOVIE_API_KEY}`;
  return apiRequest(endpoint);
}

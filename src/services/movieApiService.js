import axios from 'axios';
import { logApiError } from '../utils/errorLogger';
import { getMovieBaseUrl, getMovieApiKey } from '../env';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async (endpoint) => {
  try {
    const url = `${getMovieBaseUrl()}${endpoint}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    logApiError(error, endpoint);
    throw error;
  }
};

export const fetchMovies = async (page) => {
  const endpoint = `/movie/popular?api_key=${getMovieApiKey()}&page=${page}`;
  return apiRequest(endpoint);
};

export const fetchMovieDetails = async (movieId) => {
  const endpoint = `/movie/${movieId}?api_key=${getMovieApiKey()}`;
  return apiRequest(endpoint);
};

export const searchMovies = async (query) => {
  const endpoint = `/search/movie?api_key=${getMovieApiKey()}&query=${encodeURIComponent(query)}`;
  return apiRequest(endpoint);
};

export const fetchTrendingMovies = async () => {
  const endpoint = `/trending/movie/week?api_key=${getMovieApiKey()}`;
  return apiRequest(endpoint);
};

export const fetchTopRatedMovies = async () => {
  const endpoint = `/movie/top_rated?api_key=${getMovieApiKey()}`;
  return apiRequest(endpoint);
};

export const fetchUpcomingMovies = async () => {
  const endpoint = `/movie/upcoming?api_key=${getMovieApiKey()}`;
  return apiRequest(endpoint);
};

export const fetchNowPlayingMovies = async () => {
  const endpoint = `/movie/now_playing?api_key=${getMovieApiKey()}`;
  return apiRequest(endpoint);
};

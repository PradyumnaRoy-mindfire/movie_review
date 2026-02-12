import axios from 'axios';

const MOVIE_API_BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const api = axios.create({
  baseURL: MOVIE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMovies = async () => {
  const response = await api.get(`/movie/popular?api_key=${MOVIE_API_KEY}`);
  return response.data;
};

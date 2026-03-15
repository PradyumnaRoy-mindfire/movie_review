import {
  fetchMovies,
  fetchMovieDetails,
  searchMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
} from '../services/movieApiService';
import { useQuery } from '@tanstack/react-query';

export const useMoviesData = (page) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, error };
};

export const useMovieDetailsData = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
};

export const useSearchMovie = (query) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchMovie', query],
    queryFn: () => searchMovies(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, error };
};

export const useTrendingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: () => fetchTrendingMovies(),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
};

export const useUpcomingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: () => fetchUpcomingMovies(),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
};

export const useTopRatedMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: () => fetchTopRatedMovies(),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
};

export const useNowPlayingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: () => fetchNowPlayingMovies(),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
};

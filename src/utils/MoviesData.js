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

export const MoviesData = (page) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
  });

  return { data, isLoading, isError, error };
};

export const MovieDetailsData = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
  });

  return { data, isLoading, isError, error };
};

export const SearchMovie = (query) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchMovie', query],
    queryFn: () => searchMovies(query),
  });

  return { data, isLoading, isError, error };
};

export const TrendingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: () => fetchTrendingMovies(),
  });

  return { data, isLoading, isError, error };
};

export const UpcomingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: () => fetchUpcomingMovies(),
  });

  return { data, isLoading, isError, error };
};

export const TopRatedMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: () => fetchTopRatedMovies(),
  });

  return { data, isLoading, isError, error };
};

export const NowPlayingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: () => fetchNowPlayingMovies(),
  });

  return { data, isLoading, isError, error };
};

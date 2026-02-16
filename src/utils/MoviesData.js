import { fetchMovies, fetchMovieDetails } from '../services/movieApiService';
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

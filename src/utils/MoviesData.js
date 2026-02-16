import {
  fetchMovies,
  fetchMovieDetails,
} from '../services/movieApiService';
import { useQuery } from '@tanstack/react-query';

export const MoviesData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
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



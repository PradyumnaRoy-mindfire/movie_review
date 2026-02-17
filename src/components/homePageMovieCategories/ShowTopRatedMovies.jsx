import LoadingAndErrorHandler from '../errorHandling/LoadingAndErrorHandler';
import MovieCard from '../MovieCard';
import { TopRatedMovies } from '../../utils/MoviesData';
import { Star } from 'lucide-react';

const ShowTopRatedMovies = () => {
  const { data, isLoading, isError, error } = TopRatedMovies();

  if (isLoading || isError) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  const movies = data?.results.slice(0, 10) || [];
  const badge = () => {
    return (
      <span className="absolute left-2 z-10 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
        Top Rated
      </span>
    );
  };

  return (
    <>
      <h1 className="col-span-full text-2xl font-bold pt-8 pl-6 underline underline-offset-5 text-gray-500">
        <Star
          className="inline-block mr-2 text-amber-600 animate-pulse"
          size={32}
        />
        Top 10 Rated Movies
      </h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} badge={badge} />
      ))}
    </>
  );
};

export default ShowTopRatedMovies;

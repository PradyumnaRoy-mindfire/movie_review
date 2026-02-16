import MovieCard from '../MovieCard';
import LoadingAndErrorHandler from '../LoadingAndErrorHandler';
import { UpcomingMovies } from '../../utils/MoviesData';
import { CalendarFold } from 'lucide-react';

const ShowUpcomingMovies = () => {
  const { data, isLoading, isError, error } = UpcomingMovies();

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
      <span className="absolute left-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
        Upcoming
      </span>
    );
  };

  return (
    <>
      <h1 className="col-span-full text-2xl font-bold pt-8 pl-6 underline underline-offset-5 text-gray-500">
        <CalendarFold
          className="inline-block mr-2 text-blue-400 animate-pulse"
          size={32}
        />
        Top 10 Upcoming Movies
      </h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} badge={badge} />
      ))}
    </>
  );
};

export default ShowUpcomingMovies;

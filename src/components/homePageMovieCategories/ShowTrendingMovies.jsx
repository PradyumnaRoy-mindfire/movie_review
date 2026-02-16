import MovieCard from '../MovieCard';
import LoadingAndErrorHandler from '../LoadingAndErrorHandler';
import { TrendingMovies } from '../../utils/MoviesData';
import { ChartNoAxesCombined } from 'lucide-react';

const ShowTrendingMovies = () => {
  const { data, isLoading, isError, error } = TrendingMovies();
  if (isLoading || isError) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }
  const movies = data?.results?.slice(0, 10) || [];
  const badge = () => {
    return (
      <span className="absolute left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        Trending
      </span>
    );
  };
  return (
    <>
      <h1 className="text-2xl font-bold pt-8 pl-6 underline underline-offset-5 text-gray-500 col-span-full">
        <ChartNoAxesCombined
          className="inline-block mr-2  text-orange-400 animate-pulse font-bold"
          size={32}
        />
        Top 10 Trending Movies
      </h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} badge={badge} />
      ))}
    </>
  );
};

export default ShowTrendingMovies;

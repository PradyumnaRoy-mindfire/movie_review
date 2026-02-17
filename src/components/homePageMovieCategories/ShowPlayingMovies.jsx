import LoadingAndErrorHandler from '../errorHandling/LoadingAndErrorHandler';
import MovieCard from '../MovieCard';
import { NowPlayingMovies } from '../../utils/MoviesData';
import { Clapperboard } from 'lucide-react';

const ShowPlayingMovies = () => {
  const { data, isLoading, isError, error } = NowPlayingMovies();

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
      <span className="absolute left-2 z-10 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-l-2xl">
        Now Playing
      </span>
    );
  };

  return (
    <>
      <h1 className="col-span-full text-2xl font-bold pt-8 pl-6 underline underline-offset-5 text-gray-500">
        <Clapperboard
          className="inline-block mr-2 text-pink-500 animate-pulse"
          size={32}
        />
        Now Playing in Theaters
      </h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} badge={badge} />
      ))}
    </>
  );
};

export default ShowPlayingMovies;

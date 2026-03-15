import MovieCard from '../MovieCard';
import LoadingAndErrorHandler from '../errorHandling/LoadingAndErrorHandler';

const MovieCategory = ({
  title,
  icon: Icon,
  data,
  isLoading,
  isError,
  error,
  renderBadge,
}) => {
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

  return (
    <>
      <h1 className="col-span-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold pt-8 pl-6 underline underline-offset-5 text-gray-500">
        <Icon className="inline-block mr-2 animate-pulse" size={32} />
        {title}
      </h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} renderBadge={renderBadge} />
      ))}
    </>
  );
};

export default MovieCategory;

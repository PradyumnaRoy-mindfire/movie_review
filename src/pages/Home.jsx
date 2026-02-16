import MovieCard from '../components/MovieCard';
import LoadingAndErrorHandler from '../components/LoadingAndErrorHandler';
import { MoviesData } from '../utils/MoviesData';

const Home = () => {
  const { data, isLoading, isError, error } = MoviesData();

  if (isLoading || isError) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  return (
    <>
      <div className=" bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Home;

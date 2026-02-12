import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieApiService';
import LoadingEffect from '../components/animations/LoadingEffect';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (isLoading) {
    return <LoadingEffect />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;

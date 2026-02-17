import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingAndErrorHandler from '../components/errorHandling/LoadingAndErrorHandler';
import { SearchMovie } from '../utils/MoviesData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, isError, error } = SearchMovie(query);

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
    <div className="bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 px-8 pt-8 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Search Result for the "{query}"
      </h2>

      {data?.results?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl">No movie found for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

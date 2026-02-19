import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingAndErrorHandler from '../components/errorHandling/LoadingAndErrorHandler';
import { MoviesData } from '../utils/MoviesData';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get('page') || 1;
  page = parseInt(page);

  let { data, isLoading, isError, error } = MoviesData(page);

  if (isLoading || isError) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  const goToNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const goToPrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  return (
    <section
      aria-label="Popular movies"
      className="bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm-gap-3 md:gap-4 lg:gap-6 xl:gap-6  px-2 md:px-4 lg:px-8 pt-8"
    >
      {data?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <div
        className="mt-8 flex justify-center items-center col-span-full mb-5"
        aria-label="Pagination"
      >
        <button
          className={`px-4 py-1.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors rounded-lg active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400`}
          disabled={page == 1}
          onClick={goToPrevPage}
          aria-label="Go to previous page"
        >
          Prev
        </button>
        <span className="mx-4 font-bold text-gray-700">Page {page}</span>
        <button
          className="px-4 py-1.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors active:scale-90 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
          disabled={page == data.total_pages}
          onClick={goToNextPage}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Movies;

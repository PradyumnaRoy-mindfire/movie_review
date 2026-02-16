import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingAndErrorHandler from '../components/LoadingAndErrorHandler';
import { MoviesData } from '../utils/MoviesData';

const Movies = () => {
  const [page, setPage] = useState(1);
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

  return (
    <>
      <div className=" bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-8 pt-8">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        <div className=" mt-8 flex justify-center items-center col-span-full mb-5">
          <button
            className={`px-4 py-1.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors rounded-lg active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={page == 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="mx-4 font-bold text-gray-700">{page}</span>
          <button
            className="px-4 py-1.5 bg-orange-500 text-white hover:bg-orange-600  transition-colors active:scale-90 rounded-lg cursor-pointer"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;

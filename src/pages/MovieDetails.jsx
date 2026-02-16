import { useParams } from 'react-router-dom';
import { MovieDetailsData } from '../utils/MoviesData';
import LoadingAndErrorHandler from '../components/LoadingAndErrorHandler';
import FavouriteButton from '../components/addToFavourite/FavouriteButton';
import { Star, Clock, Calendar, DollarSign } from 'lucide-react';

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const placeHolderImageUrl = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL;

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movie, isLoading, isError, error } = MovieDetailsData(id);

  if (isLoading || isError) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  if (movie === undefined) {
    return <div className="text-3xl text-red-400">Movie not found.</div>;
  }

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}w500${movie.poster_path}`
    : placeHolderImageUrl;

  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}w1280${movie.backdrop_path}`
    : null;

  const formatCurrency = (amount) => {
    if (!amount) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {backdropUrl && (
        <div className="relative h-64 md:h-80 lg:h-90 w-full overflow-hidden">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="object-cover  w-full h-full "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-xl shadow-lg shadow-amber-200 "
              />
              <div className="absolute top-3 right-3">
                <FavouriteButton size={32} movie={movie} />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-gray-500 mb-4 italic ">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap mb-6 gap-6 ">
              <div className="flex items-center gap-2">
                <Star size={22} className="text-yellow-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {movie.vote_average?.toFixed(1)} / 10
                </span>
                <span className="text-sm text-gray-500">
                  ({movie.vote_count} votes)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                <span className="text-gray-700">{movie.runtime} min</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-green-500" size={20} />
                <span className="text-gray-700">{movie.release_date}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-green-500" size={18} />
                  <span className="text-sm text-gray-500">Budget</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  {formatCurrency(movie.budget)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-blue-500" size={18} />
                  <span className="text-sm text-gray-500">Revenue</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
            </div>

            {movie.production_companies?.length > 0 && (
              <div>
                <h2 className="text-xl mb-3 font-semibold text-gray-800">
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-3 items-center">
                  {movie.production_companies.map((company) => (
                    <span
                      key={company.id}
                      className="bg-gray-100 text-gray-700 rounded-lg px-3 text-sm"
                    >
                      {company.logo_path ? (
                        <img
                          src={`${imageBaseUrl}w92${company.logo_path}`}
                          alt={company.name}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold bg-amber-200 px-2 py-2 rounded text-gray-500 ">
                          {company.name}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

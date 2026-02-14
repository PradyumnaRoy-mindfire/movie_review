import FavouriteButton from './addToFavourite/FavouriteButton';

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const placeHolderImageUrl = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL;

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}w500${movie.poster_path}`
    : placeHolderImageUrl;

  return (
    <div className="w-full sm:w-56 md:w-60 lg:w-64 bg-amber-100 rounded-xl shadow-lg shadow-amber-200 overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover rotate-x-15 -rotate-y-25 mt-5"
        />

        <div className="absolute top-3 right-3">
          <FavouriteButton movie={movie} />
        </div>
      </div>

      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 ">{movie.title}</h2>
      </div>
    </div>
  );
};

export default MovieCard;

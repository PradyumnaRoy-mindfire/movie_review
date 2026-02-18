import { memo } from 'react';
import { Grip, Calendar, Star } from 'lucide-react';
import FavouriteButton from './FavouriteButton';
import { Link } from 'react-router-dom';

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const placeHolderImageUrl = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL;

const FavouriteMovieCard = memo(function FavouriteMovieCard({
  movie,
  onDragStart,
  onDragEnd,
}) {
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}w200${movie.poster_path}`
    : placeHolderImageUrl;
  return (
    <>
      <div
        className="flex items-center border-2 bg-gradient-to-r from-orange-200 to-pink-200 border-gray-300  hover:shadow-lg hover:scale-103 shadow-gray-400 rounded-lg p-2 m-4 transition-transform duration-300 cursor-grabbing"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Grip size={18} className="inline-block mr-2 top" />
        <Link to={`/movie/${movie.id}/details`}>
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-25 h-20 sm:h-20 md:h-25 lg:h-30 object-cover rounded-md"
          />
        </Link>
        <div className="mx-2 flex flex-col items-baseline h-15 md:h-18 lg:h-20 justify-center">
          <h1 className="text-lg font-bold">{movie.title}</h1>
          <div className="flex items-center justify-center gap-5">
            <p className="text-sm text-gray-500">
              <Star size={18} className="inline-block mr-1 text-yellow-500" />
              {movie.vote_average}
            </p>
            <p className="text-sm text-gray-500">
              <Calendar size={15} className="inline-block mr-1 text-blue-500" />
              {movie.release_date}
            </p>
          </div>
        </div>

        <div className="ml-auto">
          <FavouriteButton movie={movie} size={25} />
        </div>
      </div>
    </>
  );
});

export default FavouriteMovieCard;

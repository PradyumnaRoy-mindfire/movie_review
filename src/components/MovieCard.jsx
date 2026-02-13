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
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
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

// adult: false;
// backdrop_path: '/tyjXlexbNZQ0ZT1KEJslQtBirqc.jpg';
// genre_ids: (3)[(12, 53, 878)];
// id: 840464;
// original_language: 'en';
// original_title: 'Greenland 2: Migration';
// overview: 'Having found the safety of the Greenland bunker after the comet Clarke decimated the Earth, the Garrity family must now risk everything to embark on a perilous journey across the wasteland of Europe to find a new home.';
// popularity: 393.0964;
// poster_path: '/z2tqCJLsw6uEJ8nJV8BsQXGa3dr.jpg';
// release_date: '2026-01-07';
// title: 'Greenland 2: Migration';
// video: false;
// vote_average: 6.554;
// vote_count: 395;

import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { FavouriteContext } from '../../context/FavouriteContext';

const Favourite = ({ movie, size }) => {
  size = size || 18;
  const { isFavourite, toggleFavourite } = useContext(FavouriteContext);

  return (
    <button
      onClick={() => toggleFavourite(movie)}
      className="bg-white p-2 rounded-full shadow-md cursor-pointer"
      title={
        isFavourite(movie) ? 'Remove from favourites' : 'Add to favourites'
      }
    >
      <Heart
        size={size}
        className={`${
          isFavourite(movie) ? 'fill-red-500 text-red-500' : 'text-gray-600'
        }`}
      />
    </button>
  );
};

export default Favourite;

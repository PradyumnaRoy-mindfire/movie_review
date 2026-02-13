import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { FavouriteContext } from '../../context/FavouriteContext';

const Favourite = ({ movie }) => {
  const { isFavourite, toggleFavourite } = useContext(FavouriteContext);

  return (
    <button
      onClick={() => toggleFavourite(movie)}
      className="bg-white p-2 rounded-full shadow-md"
    >
      <Heart
        size={18}
        className={`${
          isFavourite(movie) ? 'fill-red-500 text-red-500' : 'text-gray-600'
        }`}
      />
    </button>
  );
};

export default Favourite;

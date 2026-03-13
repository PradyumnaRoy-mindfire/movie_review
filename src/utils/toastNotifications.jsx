import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const DissmissButton = ({ toastId }) => (
  <button
    onClick={() => toast.dismiss(toastId)}
    className="ml-2 text-white bg-gray-500 px-2 py-2 rounded-full"
  >
    <X size={16} />
  </button>
);

export const showAddToFavouritesToast = (movie) => {
  return toast.success(
    (t) => (
      <span className="flex items-center gap-2">
        <span>
          <span className="font-bold text-orange-400">{movie.title}</span> added
          to favourites!
        </span>

        <DissmissButton toastId={t.id} />
      </span>
    ),
    { duration: 3000 }
  );
};

export const showRemoveFromFavouritesToast = (movie) => {
  return toast.error(
    (t) => (
      <span className="flex items-center gap-2">
        <span>
          <span className="font-bold text-orange-400">{movie.title}</span>{' '}
          removed from favourites!
        </span>
        <DissmissButton toastId={t.id} />
      </span>
    ),
    { duration: 3000 }
  );
};

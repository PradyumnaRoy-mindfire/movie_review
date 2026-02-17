import { toast } from 'react-hot-toast';

export const showAddToFavouritesToast = (movie) => {
  return toast.success(
    <span>
      <span className="font-bold">{movie.title}</span> added to favourites!
    </span>,
    { duration: 3000 }
  );
};

export const showRemoveFromFavouritesToast = (movie) => {
  return toast.error(
    <span>
      <span className="font-bold">{movie.title}</span>removed from favourites!
    </span>,
    { duration: 3000 }
  );
};

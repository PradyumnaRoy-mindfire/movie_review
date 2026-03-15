import { createContext, useState } from 'react';
import {
  showAddToFavouritesToast,
  showRemoveFromFavouritesToast,
} from '../utils/toastNotifications';
import { logError } from '../utils/errorLogger';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favouriteMovies');
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logError(error, 'LOCALSTORAGE_FAVOURITES_MOVIE_FETCH_ERROR');
      return [];
    }
  });

  const isFavourite = (movie) => {
    if (!movie) {
      return false;
    }
    return favourites.some((fav) => fav.id === movie.id);
  };

  const toggleFavourite = (movie) => {
    if (!movie) {
      return;
    }

    const isAlreadyFavourite = favourites.some((fav) => fav.id === movie.id);
    let updatedFavourites;

    if (isAlreadyFavourite) {
      updatedFavourites = favourites.filter((fav) => fav.id !== movie.id);
      showRemoveFromFavouritesToast(movie);

      //remove from watchLater if it exists there
      try {
        const watchLaterData = localStorage.getItem('watchLaterMovies');
        if (watchLaterData) {
          const watchLater = JSON.parse(watchLaterData);
          const filteredWatchLater = watchLater.filter(
            (item) => item.id !== movie.id
          );
          localStorage.setItem(
            'watchLaterMovies',
            JSON.stringify(filteredWatchLater)
          );
        }
      } catch (error) {
        logError(error, 'LOCALSTORAGE_WATCHLATER_ERROR');
      }
    } else {
      updatedFavourites = [movie, ...favourites];
      showAddToFavouritesToast(movie);
    }

    setFavourites(updatedFavourites);
    localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavourites));
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, isFavourite, toggleFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

import { createContext, useState, useMemo } from 'react';
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

  const [watchLaterMovies, setWatchLaterMovies] = useState(() => {
    const stored = localStorage.getItem('watchLaterMovies');
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logError(error, 'LOCALSTORAGE_WATCHLATER_FETCH_ERROR');
      return [];
    }
  });

  const favouriteIds = useMemo(
    () => new Set(favourites.map((fav) => fav.id)),
    [favourites]
  );
  const watchLaterIds = useMemo(
    () => new Set(watchLaterMovies.map((watch) => watch.id)),
    [watchLaterMovies]
  );

  const isFavourite = (movie) => {
    if (!movie) {
      return false;
    }
    return favouriteIds.has(movie.id);
  };

  const isWatchLater = (movie) => {
    if (!movie) {
      return false;
    }
    return watchLaterIds.has(movie.id);
  };

  const toggleWatchLater = (movie) => {
    if (!movie) {
      return;
    }
    if (isWatchLater(movie)) {
      const updated = watchLaterMovies.filter((watch) => watch.id !== movie.id);
      setWatchLaterMovies(updated);
      localStorage.setItem('watchLaterMovies', JSON.stringify(updated));
    } else {
      const updated = [...watchLaterMovies, movie];
      setWatchLaterMovies(updated);
      localStorage.setItem('watchLaterMovies', JSON.stringify(updated));
    }
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
      // Also remove from watchLater if it exists there
      if (isWatchLater(movie)) {
        toggleWatchLater(movie);
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
      value={{
        favourites,
        watchLaterMovies,
        isFavourite,
        isWatchLater,
        toggleFavourite,
        toggleWatchLater,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

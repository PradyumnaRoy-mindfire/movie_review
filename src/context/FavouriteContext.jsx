import { createContext, useState } from 'react';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favouriteMovies');
    return stored ? JSON.parse(stored) : [];
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
    } else {
      updatedFavourites = [...favourites, movie];
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

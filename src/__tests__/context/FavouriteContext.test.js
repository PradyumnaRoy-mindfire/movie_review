import { renderHook, act } from '@testing-library/react';
import { useContext } from 'react';
import {
  FavouriteProvider,
  FavouriteContext,
} from '../../context/FavouriteContext';

describe('FavouriteContext', () => {
  // Helper hook to access context just like in Favourite.jsx
  const useTestContext = () => useContext(FavouriteContext);

  const wrapper = ({ children }) => (
    <FavouriteProvider>{children}</FavouriteProvider>
  );

  // Clear localStorage before each test for clean state
  beforeEach(() => {
    localStorage.clear();
  });

  //Check initial empty favorites
  test('should provide initial context value', () => {
    const { result } = renderHook(useTestContext, { wrapper });

    expect(result.current.favourites).toBeDefined();
    expect(Array.isArray(result.current.favourites)).toBe(true);
    expect(result.current.favourites.length).toBe(0);
  });

  //Add movie to favorites using toggleFavourite
  test('should add movie to favourites', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.toggleFavourite(movie);
    });

    expect(result.current.favourites.length).toBe(1);
    expect(result.current.favourites[0].id).toBe(1);
  });

  // Remove movie from favorites by toggling again
  test('should remove movie from favourites', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    // Add movie
    act(() => {
      result.current.toggleFavourite(movie);
    });

    expect(result.current.favourites.length).toBe(1);

    // Remove movie by toggling again
    act(() => {
      result.current.toggleFavourite(movie);
    });

    expect(result.current.favourites.length).toBe(0);
  });

  //Check if movie is in favorites using isFavourite
  test('should check if movie is in favourites', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.toggleFavourite(movie);
    });

    expect(result.current.isFavourite(movie)).toBe(true);
    expect(result.current.isFavourite({ id: 999 })).toBe(false);
  });

  //Count favorites correctly (separate act blocks for each toggle)
  test('should return correct favourites count', () => {
    const { result } = renderHook(useTestContext, { wrapper });

    act(() => {
      result.current.toggleFavourite({ id: 1, title: 'Movie 1' });
    });

    act(() => {
      result.current.toggleFavourite({ id: 2, title: 'Movie 2' });
    });

    act(() => {
      result.current.toggleFavourite({ id: 3, title: 'Movie 3' });
    });

    expect(result.current.favourites.length).toBe(3);
  });

  //Properly test toggle add/remove behavior with separate act blocks
  test('should not add duplicate movies', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    // First toggle adds the movie
    act(() => {
      result.current.toggleFavourite(movie);
    });
    expect(result.current.favourites.length).toBe(1);

    // Second toggle removes it (now it exists)
    act(() => {
      result.current.toggleFavourite(movie);
    });
    expect(result.current.favourites.length).toBe(0);

    // Third toggle adds it back
    act(() => {
      result.current.toggleFavourite(movie);
    });
    expect(result.current.favourites.length).toBe(1);
  });

  //Add to watch later using toggleWatchLater
  test('should add movie to watch later', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.toggleWatchLater(movie);
    });

    expect(result.current.watchLaterMovies.length).toBe(1);
    expect(result.current.isWatchLater(movie)).toBe(true);
  });

  // Remove from watch later by toggling again
  test('should remove movie from watch later', () => {
    const { result } = renderHook(useTestContext, { wrapper });
    const movie = { id: 1, title: 'Inception' };

    // Add to watch later
    act(() => {
      result.current.toggleWatchLater(movie);
    });

    expect(result.current.watchLaterMovies.length).toBe(1);

    // Remove by toggling again
    act(() => {
      result.current.toggleWatchLater(movie);
    });

    expect(result.current.watchLaterMovies.length).toBe(0);
  });
});

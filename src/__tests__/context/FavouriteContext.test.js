import { renderHook, act } from '@testing-library/react';
import {
  FavouriteProvider,
  useFavourite,
} from '../../context/FavouriteContext';

describe('FavouriteContext', () => {
  // Verifies context provides initial values correctly
  test('should provide initial context value', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    expect(result.current.favourites).toBeDefined();
    expect(Array.isArray(result.current.favourites)).toBe(true);
  });

  // Tests adding a movie to favourites list
  test('should add movie to favourites', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    const movieToAdd = { id: 1, title: 'Inception' };

    act(() => {
      result.current.addToFavourites(movieToAdd);
    });

    expect(result.current.favourites).toContain(
      expect.objectContaining({ id: 1 })
    );
  });

  // Tests removing a movie from favourites
  test('should remove movie from favourites', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.addToFavourites(movie);
    });

    act(() => {
      result.current.removeFromFavourites(1);
    });

    expect(result.current.favourites).not.toContain(
      expect.objectContaining({ id: 1 })
    );
  });

  // Tests checking if a movie is favourited
  test('should check if movie is in favourites', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.addToFavourites(movie);
    });

    expect(result.current.isFavourited(1)).toBe(true);
    expect(result.current.isFavourited(999)).toBe(false);
  });

  // Validates count of favourites is correct
  test('should return correct favourites count', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    act(() => {
      result.current.addToFavourites({ id: 1, title: 'Movie 1' });
      result.current.addToFavourites({ id: 2, title: 'Movie 2' });
      result.current.addToFavourites({ id: 3, title: 'Movie 3' });
    });

    expect(result.current.favourites.length).toBe(3);
  });

  // Tests prevention of duplicate movies in favourites
  test('should not add duplicate movies', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    const movie = { id: 1, title: 'Inception' };

    act(() => {
      result.current.addToFavourites(movie);
      result.current.addToFavourites(movie);
    });

    expect(result.current.favourites.length).toBe(1);
  });

  // Tests clearing all favourites
  test('should clear all favourites', () => {
    const wrapper = ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    );

    const { result } = renderHook(() => useFavourite(), { wrapper });

    act(() => {
      result.current.addToFavourites({ id: 1, title: 'Movie 1' });
      result.current.addToFavourites({ id: 2, title: 'Movie 2' });
    });

    act(() => {
      result.current.clearFavourites();
    });

    expect(result.current.favourites.length).toBe(0);
  });
});

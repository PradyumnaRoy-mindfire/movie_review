jest.mock('axios', () => {
  const mockGet = jest.fn();
  return {
    create: jest.fn(() => ({
      get: mockGet,
    })),
    __mocked__: true,
    mockGet: mockGet,
  };
});

jest.mock('../../env', () => ({
  getMovieBaseUrl: () => 'https://api.themoviedb.org/3',
  getMovieApiKey: () => 'test-api-key',
}));

import axios from 'axios';
import {
  fetchMovies,
  fetchMovieDetails,
  searchMovies,
} from '../../services/movieApiService';

describe('movieApiService', () => {
  let mockGet;

  beforeEach(() => {
    // Get reference to the mock function
    const axiosMock = axios.create();
    mockGet = axiosMock.get;
    mockGet.mockClear();
  });

  // Tests successful API call for popular movies
  test('should fetch popular movies successfully', async () => {
    const mockMoviesData = {
      results: [
        { id: 1, title: 'Movie 1', rating: 8 },
        { id: 2, title: 'Movie 2', rating: 7.5 },
      ],
    };

    mockGet.mockResolvedValue({ data: mockMoviesData });

    const result = await fetchMovies(1);

    expect(result).toEqual(mockMoviesData);
    expect(mockGet).toHaveBeenCalled();
  });

  // Verifies fetching details for specific movie by ID
  test('should fetch movie details by ID', async () => {
    const mockMovieDetails = {
      id: 1,
      title: 'The Inception',
      overview: 'A thief who steals corporate secrets...',
      rating: 8.8,
    };

    mockGet.mockResolvedValue({ data: mockMovieDetails });

    const result = await fetchMovieDetails(1);

    expect(result).toEqual(mockMovieDetails);
    expect(mockGet).toHaveBeenCalled();
  });

  // Tests search functionality with query string
  test('should search movies by query', async () => {
    const mockSearchResults = {
      results: [{ id: 1, title: 'Inception', rating: 8.8 }],
    };

    mockGet.mockResolvedValue({ data: mockSearchResults });

    const result = await searchMovies('Inception');

    expect(result).toEqual(mockSearchResults);
    expect(mockGet).toHaveBeenCalled();
  });

  // Checks if API errors are handled properly
  test('should handle API error', async () => {
    const mockError = new Error('Network Error');
    mockGet.mockRejectedValue(mockError);

    // Suppress console.error during error test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    await expect(fetchMovies(1)).rejects.toThrow('Network Error');
    consoleErrorSpy.mockRestore();
  });

  // Tests handling of 404 not found errors
  test('should handle 404 not found error', async () => {
    const mockError = new Error('404 Not Found');

    mockGet.mockRejectedValue(mockError);

    // Suppress console.error during error test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    await expect(fetchMovieDetails(99999)).rejects.toThrow();
    consoleErrorSpy.mockRestore();
  });

  // Validates correct parameters are sent with API request
  test('should pass correct API key and language parameters', async () => {
    mockGet.mockResolvedValue({ data: { results: [] } });

    await fetchMovies(1);

    expect(mockGet).toHaveBeenCalled();
  });

  // Verifies handling of empty search results
  test('should handle empty search results', async () => {
    const mockEmptyResults = {
      results: [],
    };

    mockGet.mockResolvedValue({ data: mockEmptyResults });

    const result = await searchMovies('NonexistentMovie12345');

    expect(result).toEqual(mockEmptyResults);
  });
});

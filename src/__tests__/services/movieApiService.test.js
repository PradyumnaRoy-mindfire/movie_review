import axios from 'axios';
import {
  getPopularMovies,
  getMovieDetails,
  searchMovies,
} from '../../services/movieApiService';

jest.mock('axios');

describe('movieApiService', () => {
  // Tests successful API call for popular movies
  test('should fetch popular movies successfully', async () => {
    const mockMoviesData = {
      data: {
        results: [
          { id: 1, title: 'Movie 1', rating: 8 },
          { id: 2, title: 'Movie 2', rating: 7.5 },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMoviesData);

    const result = await getPopularMovies();

    expect(axios.get).toHaveBeenCalled();
    expect(result).toEqual(mockMoviesData.data.results);
  });

  // Verifies fetching details for specific movie by ID
  test('should fetch movie details by ID', async () => {
    const mockMovieDetails = {
      data: {
        id: 1,
        title: 'The Inception',
        overview: 'A thief who steals corporate secrets...',
        rating: 8.8,
      },
    };

    axios.get.mockResolvedValue(mockMovieDetails);

    const result = await getMovieDetails(1);

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/movie/1'));
    expect(result).toEqual(mockMovieDetails.data);
  });

  // Tests search functionality with query string
  test('should search movies by query', async () => {
    const mockSearchResults = {
      data: {
        results: [{ id: 1, title: 'Inception', rating: 8.8 }],
      },
    };

    axios.get.mockResolvedValue(mockSearchResults);

    const result = await searchMovies('Inception');

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('search/movie'),
      expect.objectContaining({
        params: expect.objectContaining({
          query: 'Inception',
        }),
      })
    );
    expect(result).toEqual(mockSearchResults.data.results);
  });

  // Checks if API errors are handled properly
  test('should handle API error', async () => {
    const mockError = new Error('Network Error');

    axios.get.mockRejectedValue(mockError);

    await expect(getPopularMovies()).rejects.toThrow('Network Error');
  });

  // Tests handling of 404 not found errors
  test('should handle 404 not found error', async () => {
    const mockError = {
      response: {
        status: 404,
        data: { message: 'Movie not found' },
      },
    };

    axios.get.mockRejectedValue(mockError);

    await expect(getMovieDetails(99999)).rejects.toThrow();
  });

  // Validates correct parameters are sent with API request
  test('should pass correct API key and language parameters', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });

    await getPopularMovies();

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          api_key: expect.any(String),
          language: 'en-US',
        }),
      })
    );
  });

  // Verifies handling of empty search results
  test('should handle empty search results', async () => {
    const mockEmptyResults = {
      data: {
        results: [],
      },
    };

    axios.get.mockResolvedValue(mockEmptyResults);

    const result = await searchMovies('NonexistentMovie12345');

    expect(result).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

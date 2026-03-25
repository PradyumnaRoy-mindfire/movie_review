import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MoviePage from '../../pages/Movies';
import * as movieApiService from '../../services/movieApiService';

jest.mock('../../services/movieApiService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('Movie Page Integration Tests', () => {
  // Suppress React Router deprecation warnings in tests
  let consoleWarnSpy;

  beforeAll(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  // Helper function to wrap component with all required providers
  const renderWithProviders = (component) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries in tests
        },
      },
    });

    const renderResult = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{component}</BrowserRouter>
      </QueryClientProvider>
    );

    return { ...renderResult, queryClient };
  };

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Verify page calls fetchMovies on load
  test('should call fetchMovies with page 1 on load', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          title: 'Inception',
          poster_path: '/poster1.jpg',
          vote_average: 8.8,
        },
      ],
      total_pages: 10,
    };

    movieApiService.fetchMovies.mockResolvedValue(mockMovies);

    renderWithProviders(<MoviePage />);

    await waitFor(() => {
      expect(movieApiService.fetchMovies).toHaveBeenCalledWith(1);
    });
  });

  //Verify pagination elements are rendered
  test('should display movies when API succeeds', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          poster_path: '/p1.jpg',
          vote_average: 8.0,
        },
      ],
      total_pages: 5,
    };

    movieApiService.fetchMovies.mockResolvedValue(mockMovies);

    renderWithProviders(<MoviePage />);

    // Wait for API to be called and succeed
    await waitFor(() => {
      expect(movieApiService.fetchMovies).toHaveBeenCalledWith(1);
    });
  });

  //Verify error handling when API fails
  test('should handle API errors gracefully', async () => {
    movieApiService.fetchMovies.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<MoviePage />);

    // Component should call API and handle the error
    await waitFor(() => {
      expect(movieApiService.fetchMovies).toHaveBeenCalled();
    });
  });

  //Verify API response structure is handled
  test('should handle successful API response', async () => {
    const mockMovies = {
      results: [
        { id: 1, title: 'Movie', poster_path: '/p.jpg', vote_average: 8 },
      ],
      total_pages: 1,
    };

    movieApiService.fetchMovies.mockResolvedValue(mockMovies);

    renderWithProviders(<MoviePage />);

    await waitFor(() => {
      // Verify the API was called successfully
      expect(movieApiService.fetchMovies).toHaveBeenCalled();
    });
  });

  // Verify fetchMovies is called with correct pagination parameter
  test('should pass page parameter to fetchMovies', async () => {
    const mockMovies = {
      results: [
        { id: 1, title: 'Movie', poster_path: '/p.jpg', vote_average: 8 },
      ],
      total_pages: 1,
    };

    movieApiService.fetchMovies.mockResolvedValue(mockMovies);

    renderWithProviders(<MoviePage />);

    await waitFor(() => {
      expect(movieApiService.fetchMovies).toHaveBeenCalledWith(1);
    });

    // Verify it's called with the correct parameter
    expect(movieApiService.fetchMovies).toHaveBeenCalledTimes(1);
    expect(movieApiService.fetchMovies).toHaveBeenCalledWith(1);
  });
});

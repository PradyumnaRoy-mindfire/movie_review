import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MoviePage from '../../pages/Movies';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('Movie Page Integration Tests', () => {
  // Tests loading and displaying movies on page load
  test('should load and display movies on page load', async () => {
    const mockMovies = {
      data: {
        results: [
          {
            id: 1,
            title: 'Inception',
            poster_path: '/poster1.jpg',
            rating: 8.8,
          },
          {
            id: 2,
            title: 'Interstellar',
            poster_path: '/poster2.jpg',
            rating: 8.6,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMovies);

    render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
    });
  });

  // Tests search functionality with user input
  test('should search movies when user enters search term', async () => {
    const user = userEvent.setup();
    const mockResults = {
      data: {
        results: [
          {
            id: 1,
            title: 'Inception',
            poster_path: '/poster1.jpg',
            rating: 8.8,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResults);

    render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search movies/i);
    await user.type(searchInput, 'Inception');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });

  // Tests error message display when API fails
  test('should display error message when API fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error|failed to load/i)).toBeInTheDocument();
    });
  });

  // Tests navigation to movie details page on card click
  test('should navigate to movie details on click', async () => {
    const user = userEvent.setup();
    const mockMovies = {
      data: {
        results: [
          {
            id: 1,
            title: 'Inception',
            poster_path: '/poster.jpg',
            rating: 8.8,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMovies);

    const { container } = render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });

    const movieCard = screen.getByText('Inception').closest('a');
    await user.click(movieCard);

    expect(movieCard).toHaveAttribute(
      'href',
      expect.stringContaining('/movie/1')
    );
  });

  // Tests loading indicator visibility during data fetch
  test('should show loading indicator while fetching movies', async () => {
    let resolveRequest;
    const pendingPromise = new Promise((resolve) => {
      resolveRequest = resolve;
    });

    axios.get.mockReturnValue(pendingPromise);

    render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    resolveRequest({
      data: {
        results: [{ id: 1, title: 'Movie', poster_path: '/p.jpg', rating: 8 }],
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByText('Movie')).toBeInTheDocument();
    });
  });
});

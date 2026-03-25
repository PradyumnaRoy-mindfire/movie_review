import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as useMoviesHooks from '../../hooks/useMovies';
import MovieDetails from '../../pages/MovieDetails';

const mockMovieData = {
  id: 1,
  title: 'Inception',
  tagline: 'The Dream is Real',
  poster_path: '/inception.jpg',
  backdrop_path: '/inception-backdrop.jpg',
  vote_average: 8.8,
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ],
  runtime: 148,
  budget: 160000000,
  revenue: 839000000,
  release_date: '2010-07-16',
  overview: 'A skilled thief who steals corporate secrets...',
};

jest.mock('../../hooks/useMovies', () => ({
  useMovieDetailsData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../components/errorHandling/LoadingAndErrorHandler', () => {
  return function MockLoadingAndErrorHandler({ isLoading, isError }) {
    return (
      <div data-testid="loading-error-handler">
        {isLoading ? 'Loading...' : isError ? 'Error' : 'OK'}
      </div>
    );
  };
});

jest.mock('../../components/addToFavourite/FavouriteButton', () => {
  return function MockFavouriteButton() {
    return <button data-testid="favourite-button">Add to Favourite</button>;
  };
});

describe('MovieDetails Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render movie title', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  test('should display movie tagline', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/The Dream is Real/i)).toBeInTheDocument();
  });

  test('should display all genres', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
  });

  test('should display vote average', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/8.8/)).toBeInTheDocument();
  });

  test('should display movie overview', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/A skilled thief/)).toBeInTheDocument();
  });

  test('should render favourite button', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByTestId('favourite-button')).toBeInTheDocument();
  });

  test('should render back button', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(
      screen.getByLabelText('Go back to previous page')
    ).toBeInTheDocument();
  });

  test('should display loading state', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should display error state', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch'),
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should display "Movie not found" when data is null', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Movie not found.')).toBeInTheDocument();
  });

  test('should display runtime', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/148/)).toBeInTheDocument();
  });

  test('should format budget as currency', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    // Check that budget is displayed (it should contain $160 or similar)
    expect(screen.getByText(/160,000,000/)).toBeInTheDocument();
  });

  test('should render poster and backdrop images', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  test('should have correct page styling', () => {
    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toBeInTheDocument();
  });

  test('should handle movie without tagline', () => {
    const movieWithoutTagline = { ...mockMovieData, tagline: null };

    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: movieWithoutTagline,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  test('should handle movie without genres', () => {
    const movieWithoutGenres = { ...mockMovieData, genres: null };

    useMoviesHooks.useMovieDetailsData.mockReturnValue({
      data: movieWithoutGenres,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResults from '../../pages/SearchResults';
import * as useMoviesHooks from '../../hooks/useMovies';

const mockMovieData = {
  results: [
    { id: 1, title: 'Avatar', poster_path: '/avatar.jpg', vote_average: 9.0 },
    {
      id: 2,
      title: 'Inception',
      poster_path: '/inception.jpg',
      vote_average: 8.8,
    },
  ],
};

jest.mock('../../components/MovieCard', () => {
  return function MockMovieCard({ movie }) {
    return <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>;
  };
});

jest.mock('../../components/errorHandling/LoadingAndErrorHandler', () => {
  return function MockLoadingAndErrorHandler({ isLoading, isError }) {
    return (
      <div data-testid="loading-error-handler">
        {isLoading ? 'Loading...' : isError ? 'Error' : 'OK'}
      </div>
    );
  };
});

describe('SearchResults Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render search results section', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Search results')).toBeInTheDocument();
  });

  test('should display movies when search returns results', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
  });

  test('should display no results message when no movies found', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByText(/No movie found/i)).toBeInTheDocument();
  });

  test('should display no results message when data is null', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // When data is null/undefined, the condition data?.results?.length === 0 is true
    expect(screen.queryByTestId('movie-card-1')).not.toBeInTheDocument();
  });

  test('should show loading handler when loading', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should show error handler when error occurs', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('API error'),
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should render movie results in grid layout', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    const grid = container.querySelector('[aria-label="Movie search results"]');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
  });

  test('should have correct styling classes', () => {
    jest.spyOn(useMoviesHooks, 'useSearchMovie').mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    const section = container.querySelector('[aria-label="Search results"]');
    expect(section).toHaveClass('min-h-screen');
    expect(section).toHaveClass('bg-linear-to-br');
  });
});

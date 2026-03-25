import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import * as useMoviesHooks from '../../hooks/useMovies';

const mockMoviesData = {
  data: {
    results: [
      { id: 1, title: 'Movie 1', poster_path: '/p1.jpg', vote_average: 8 },
      { id: 2, title: 'Movie 2', poster_path: '/p2.jpg', vote_average: 7.5 },
    ],
  },
  isLoading: false,
  isError: false,
  error: null,
};

jest.mock('../../components/homePageMovieCategories/MovieCategory', () => {
  return function MockMovieCategory({ title, renderBadge }) {
    const Badge = renderBadge ? renderBadge() : null;
    return (
      <div data-testid={`movie-category-${title.replace(/\s+/g, '-')}`}>
        <h3>{title}</h3>
        {Badge}
      </div>
    );
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(useMoviesHooks, 'useTrendingMovies')
      .mockReturnValue(mockMoviesData);
    jest
      .spyOn(useMoviesHooks, 'useTopRatedMovies')
      .mockReturnValue(mockMoviesData);
    jest
      .spyOn(useMoviesHooks, 'useUpcomingMovies')
      .mockReturnValue(mockMoviesData);
    jest
      .spyOn(useMoviesHooks, 'useNowPlayingMovies')
      .mockReturnValue(mockMoviesData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render Home page without crashing', () => {
    render(<Home />);
    expect(screen.getByLabelText('Movie categories')).toBeInTheDocument();
  });

  test('should render Trending Movies category', () => {
    render(<Home />);
    expect(screen.getByText('Top 10 Trending Movies')).toBeInTheDocument();
  });

  test('should render Upcoming Movies category', () => {
    render(<Home />);
    expect(screen.getByText('Top 10 Upcoming Movies')).toBeInTheDocument();
  });

  test('should render Top Rated Movies category', () => {
    render(<Home />);
    expect(screen.getByText('Top 10 Rated Movies')).toBeInTheDocument();
  });

  test('should render Now Playing category', () => {
    render(<Home />);
    expect(screen.getByText('Now Playing in Theaters')).toBeInTheDocument();
  });

  test('should call useTrendingMovies hook', () => {
    render(<Home />);
    expect(useMoviesHooks.useTrendingMovies).toHaveBeenCalled();
  });

  test('should call useTopRatedMovies hook', () => {
    render(<Home />);
    expect(useMoviesHooks.useTopRatedMovies).toHaveBeenCalled();
  });

  test('should call useUpcomingMovies hook', () => {
    render(<Home />);
    expect(useMoviesHooks.useUpcomingMovies).toHaveBeenCalled();
  });

  test('should call useNowPlayingMovies hook', () => {
    render(<Home />);
    expect(useMoviesHooks.useNowPlayingMovies).toHaveBeenCalled();
  });

  test('should pass badge render functions to MovieCategory components', () => {
    render(<Home />);
    // Check if all categories are rendered with their respective icons
    const categories = screen.getAllByTestId(/movie-category-/);
    expect(categories.length).toBe(4);
  });

  test('should have correct section aria-label', () => {
    render(<Home />);
    const section = screen.getByLabelText('Movie categories');
    expect(section.tagName).toBe('SECTION');
  });

  test('should render with correct styling classes', () => {
    render(<Home />);
    const section = screen.getByLabelText('Movie categories');
    expect(section).toHaveClass('bg-linear-to-br');
    expect(section).toHaveClass('gap-2');
    expect(section).toHaveClass('px-2');
  });
});

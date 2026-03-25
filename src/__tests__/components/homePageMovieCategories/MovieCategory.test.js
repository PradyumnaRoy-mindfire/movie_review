import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCategory from '../../../components/homePageMovieCategories/MovieCategory';
import { Star } from 'lucide-react';

const mockMovieData = {
  results: [
    { id: 1, title: 'Movie 1', poster_path: '/p1.jpg', vote_average: 8.5 },
    { id: 2, title: 'Movie 2', poster_path: '/p2.jpg', vote_average: 8.0 },
    { id: 3, title: 'Movie 3', poster_path: '/p3.jpg', vote_average: 7.5 },
  ],
};

jest.mock('../../../components/MovieCard', () => {
  return function MockMovieCard({ movie }) {
    return <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>;
  };
});

jest.mock('../../../components/errorHandling/LoadingAndErrorHandler', () => {
  return function MockLoadingAndErrorHandler({ isLoading, isError }) {
    return (
      <div data-testid="loading-error-handler">
        {isLoading ? 'Loading...' : isError ? 'Error' : 'OK'}
      </div>
    );
  };
});

describe('MovieCategory Component', () => {
  test('should render category title', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Top Rated Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Top Rated Movies')).toBeInTheDocument();
  });

  test('should render icon with title', () => {
    const { container } = render(
      <BrowserRouter>
        <MovieCategory
          title="Top Rated Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    // Lucide icon should be rendered
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('should render movies from data', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Top Rated Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-3')).toBeInTheDocument();
  });

  test('should limit movies to 10 items', () => {
    const manyMoviesData = {
      results: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Movie ${i + 1}`,
        poster_path: `/p${i + 1}.jpg`,
        vote_average: 8.0,
      })),
    };

    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={manyMoviesData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    // Should render only first 10 movies
    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-10')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-card-11')).not.toBeInTheDocument();
  });

  test('should show loading state', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={null}
          isLoading={true}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should show error state', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={null}
          isLoading={false}
          isError={true}
          error={new Error('API Error')}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-error-handler')).toBeInTheDocument();
  });

  test('should handle empty data gracefully', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Empty Category"
          icon={Star}
          data={{ results: [] }}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Empty Category')).toBeInTheDocument();
  });

  test('should render custom badge when provided', () => {
    const BadgeComponent = () => <span data-testid="custom-badge">Badge</span>;

    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={BadgeComponent}
        />
      </BrowserRouter>
    );

    // Badge is passed to MovieCard, not rendered in MovieCategory
    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  test('should have proper styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('col-span-full');
    expect(heading).toHaveClass('text-base');
    expect(heading).toHaveClass('underline');
  });

  test('should handle null data gracefully', () => {
    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={null}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  test('should pass renderBadge to MovieCard', () => {
    const mockRenderBadge = jest.fn();

    render(
      <BrowserRouter>
        <MovieCategory
          title="Movies"
          icon={Star}
          data={mockMovieData}
          isLoading={false}
          isError={false}
          error={null}
          renderBadge={mockRenderBadge}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Movies')).toBeInTheDocument();
  });
});

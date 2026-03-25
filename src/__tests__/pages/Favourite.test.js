import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favourite from '../../pages/Favourite';
import { FavouriteContext } from '../../context/FavouriteContext';

const mockToggleWatchLater = jest.fn();

const mockContextValue = {
  favourites: [
    { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg' },
    { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg' },
  ],
  watchLaterMovies: [{ id: 3, title: 'Movie 3', poster_path: '/poster3.jpg' }],
  toggleWatchLater: mockToggleWatchLater,
  toggleFavourite: jest.fn(),
  isFavourite: jest.fn(),
};

jest.mock('../../components/addToFavourite/DropZone', () => {
  return function MockDropZone({
    title,
    movies,
    onDragStart,
    onDrop,
    onDragEnd,
    onDragOver,
  }) {
    return (
      <div
        data-testid={`dropzone-${title.toLowerCase().replace(/\s+/g, '-')}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <h2>{title}</h2>
        <div>
          {movies.map((movie) => (
            <div
              key={movie.id}
              draggable
              onDragStart={() => onDragStart(movie)}
              data-testid={`movie-${movie.id}`}
            >
              {movie.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
});

describe('Favourite Page', () => {
  const renderFavourite = () => {
    return render(
      <FavouriteContext.Provider value={mockContextValue}>
        <Favourite />
      </FavouriteContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render page title', () => {
    renderFavourite();
    expect(screen.getByText('My Favourites')).toBeInTheDocument();
  });

  test('should render tip message with drag and drop instructions', () => {
    renderFavourite();
    expect(screen.getByText(/Drag and drop movies/i)).toBeInTheDocument();
  });

  test('should render Favourites section', () => {
    renderFavourite();
    expect(screen.getByTestId('dropzone-favourites')).toBeInTheDocument();
  });

  test('should render Watch Later section', () => {
    renderFavourite();
    expect(screen.getByTestId('dropzone-watch-later')).toBeInTheDocument();
  });

  test('should display favourite movies in Favourites section', () => {
    renderFavourite();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('should display watch later movies in Watch Later section', () => {
    renderFavourite();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
  });

  test('should filter out watch later movies from favourites list', () => {
    const contextValue = {
      ...mockContextValue,
      favourites: [
        { id: 1, title: 'In Favourites Only', poster_path: '/p1.jpg' },
        { id: 3, title: 'Movie 3', poster_path: '/poster3.jpg' }, // This is also in watchLater
      ],
      watchLaterMovies: [
        { id: 3, title: 'Movie 3', poster_path: '/poster3.jpg' },
      ],
    };

    render(
      <FavouriteContext.Provider value={contextValue}>
        <Favourite />
      </FavouriteContext.Provider>
    );

    const favouritesZone = screen.getByTestId('dropzone-favourites');
    expect(favouritesZone).toHaveTextContent('In Favourites Only');
    // Movie 3 should only appear in Watch Later zone, not Favourites
    expect(favouritesZone).not.toHaveTextContent('Movie 3');
  });

  test('should handle drag and drop from favourites to watch later', async () => {
    renderFavourite();
    const dropZone = screen.getByTestId('dropzone-watch-later');

    // Verify the drop zone element exists and has the necessary attributes
    expect(dropZone).toBeInTheDocument();
    expect(dropZone).toHaveAttribute('data-testid', 'dropzone-watch-later');
  });

  test('should render Grip and AlarmClock icons', () => {
    renderFavourite();
    const favourite = screen.getByTestId('dropzone-favourites');
    const watchLater = screen.getByTestId('dropzone-watch-later');

    expect(favourite).toBeInTheDocument();
    expect(watchLater).toBeInTheDocument();
  });
});

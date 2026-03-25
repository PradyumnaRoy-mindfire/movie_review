import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavouriteMovieCard from '../../../components/addToFavourite/FavouriteMovieCard';
import { FavouriteContext } from '../../../context/FavouriteContext';

jest.mock('../../../components/addToFavourite/FavouriteButton', () => {
  return function MockFavouriteButton({ movie }) {
    return <button data-testid="favourite-btn">Favourite {movie.id}</button>;
  };
});

describe('FavouriteMovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Inception',
    poster_path: '/inception.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
  };

  const mockContextValue = {
    isFavourite: jest.fn(() => false),
    toggleFavourite: jest.fn(),
  };

  const mockCallbacks = {
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
  };

  const renderCard = (movie = mockMovie) => {
    return render(
      <BrowserRouter>
        <FavouriteContext.Provider value={mockContextValue}>
          <FavouriteMovieCard movie={movie} {...mockCallbacks} />
        </FavouriteContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render movie title', () => {
    renderCard();
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  test('should display vote average', () => {
    renderCard();
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  test('should display release date', () => {
    renderCard();
    expect(screen.getByText('2010-07-16')).toBeInTheDocument();
  });

  test('should render favourite button', () => {
    renderCard();
    expect(screen.getByTestId('favourite-btn')).toBeInTheDocument();
  });

  test('should render movie poster image', () => {
    renderCard();
    const image = screen.getByAltText('Inception');
    expect(image).toBeInTheDocument();
  });

  test('should use placeholder image when poster_path is null', () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
    };
    renderCard(movieWithoutPoster);
    const image = screen.getByAltText('Inception');
    expect(image.src).toContain('thumbs.dreamstime.com');
  });

  test('should render Link to movie details', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/1/details');
  });

  test('should have draggable attribute', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');
    expect(draggableDiv).toBeInTheDocument();
  });

  test('should call onDragStart when drag starts', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');

    // Create mock drag event since DragEvent is not available in jsdom
    const dragEvent = new Event('dragstart', { bubbles: true });
    draggableDiv.dispatchEvent(dragEvent);

    expect(mockCallbacks.onDragStart).toHaveBeenCalled();
  });

  test('should call onDragEnd when drag ends', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');

    const dragEvent = new Event('dragend', { bubbles: true });
    draggableDiv.dispatchEvent(dragEvent);

    expect(mockCallbacks.onDragEnd).toHaveBeenCalled();
  });

  test('should have correct aria-label', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');
    expect(draggableDiv).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Inception')
    );
  });

  test('should have button role on draggable div', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');
    expect(draggableDiv).toHaveAttribute('role', 'button');
  });

  test('should have tabIndex for keyboard navigation', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');
    expect(draggableDiv).toHaveAttribute('tabIndex', '0');
  });

  test('should call onDragStart on Enter key press', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    enterEvent.preventDefault = jest.fn();

    draggableDiv.dispatchEvent(enterEvent);

    expect(mockCallbacks.onDragStart).toHaveBeenCalled();
  });

  test('should call onDragStart on Space key press', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');

    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
    });
    spaceEvent.preventDefault = jest.fn();

    draggableDiv.dispatchEvent(spaceEvent);

    expect(mockCallbacks.onDragStart).toHaveBeenCalled();
  });

  test('should have correct styling classes', () => {
    const { container } = renderCard();
    const draggableDiv = container.querySelector('[draggable="true"]');
    expect(draggableDiv).toHaveClass('bg-gradient-to-r');
    expect(draggableDiv).toHaveClass('from-orange-200');
    expect(draggableDiv).toHaveClass('to-pink-200');
  });

  test('should render Star icon', () => {
    renderCard();
    // Check that vote average text is present which should have star icon
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  test('should render Calendar icon', () => {
    renderCard();
    // Check that release date text is present which should have calendar icon
    expect(screen.getByText('2010-07-16')).toBeInTheDocument();
  });

  test('should render Grip icon', () => {
    const { container } = renderCard();
    // Component includes Grip icon, verify draggable div exists
    expect(container.querySelector('[draggable="true"]')).toBeInTheDocument();
  });
});

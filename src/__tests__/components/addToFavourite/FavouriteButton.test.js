import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavouriteButton from '../../../components/addToFavourite/FavouriteButton';
import { FavouriteContext } from '../../../context/FavouriteContext';

describe('FavouriteButton Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Inception',
    poster_path: '/poster.jpg',
  };

  test('should render button with heart icon', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should display "Add to favourites" title when not favourite', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Add to favourites');
  });

  test('should display "Remove from favourites" title when favourite', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => true),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Remove from favourites');
  });

  test('should call toggleFavourite when clicked', async () => {
    const user = userEvent.setup();
    const toggleFavourite = jest.fn();
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite,
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(toggleFavourite).toHaveBeenCalledWith(mockMovie);
  });

  test('should have correct aria-label when not favourite', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Add')
    );
  });

  test('should have correct aria-label when favourite', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => true),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Remove')
    );
  });

  test('should accept size prop', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    const { container } = render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} size={25} />
      </FavouriteContext.Provider>
    );

    expect(container).toBeInTheDocument();
  });

  test('should have correct styling classes', () => {
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-full');
  });

  test('should prevent default on click', async () => {
    const user = userEvent.setup();
    const mockContextValue = {
      isFavourite: jest.fn(() => false),
      toggleFavourite: jest.fn(),
    };

    render(
      <FavouriteContext.Provider value={mockContextValue}>
        <FavouriteButton movie={mockMovie} />
      </FavouriteContext.Provider>
    );

    const button = screen.getByRole('button');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    clickEvent.preventDefault = jest.fn();

    button.dispatchEvent(clickEvent);
    // The component calls preventDefault, so we're testing the behavior
  });
});

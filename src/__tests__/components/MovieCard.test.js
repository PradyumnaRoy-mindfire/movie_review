import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from '../../components/MovieCard';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'The Inception',
    poster_path: '/movie-poster.jpg',
    rating: 8.8,
    release_date: '2010-07-16',
    overview:
      'A thief who steals corporate secrets through dream-sharing technology.',
  };

  // Verifies component renders without errors
  test('should render movie card without crashing', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('The Inception')).toBeInTheDocument();
  });

  // Checks if movie title is displayed properly
  test('should display movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    const titleElement = screen.getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();
  });

  // Validates rating is shown correctly
  test('should display movie rating', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText(mockMovie.rating.toString())).toBeInTheDocument();
  });

  // Ensures release date is visible
  test('should display release date', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2010-07-16')).toBeInTheDocument();
  });

  // Checks if poster image renders with correct alt text
  test('should render movie poster image', () => {
    render(<MovieCard movie={mockMovie} />);
    const imageElement = screen.getByAltText(/movie poster|movie image/i);
    expect(imageElement).toBeInTheDocument();
  });

  // Tests click handler is triggered when card is clicked
  test('should handle card click', async () => {
    const handleClick = jest.fn();
    render(<MovieCard movie={mockMovie} onClick={handleClick} />);

    const card = screen.getByRole('article');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Verifies component handles missing poster gracefully
  test('should handle missing image gracefully', () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
    };

    render(<MovieCard movie={movieWithoutPoster} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  // Ensures placeholder shows when poster is missing
  test('should display placeholder for missing poster', () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
    };

    render(<MovieCard movie={movieWithoutPoster} />);
    expect(screen.getByAltText(/placeholder|no image/i)).toBeInTheDocument();
  });
});

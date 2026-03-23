import { render, screen } from '@testing-library/react';
import MovieCard from '../../components/MovieCard';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('../../components/addToFavourite/FavouriteButton', () => {
  return function MockFavouriteButton() {
    return <div data-testid="favourite-button" />;
  };
});

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'The Inception',
    poster_path: '/movie-poster.jpg',
  };

  test('should display movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('The Inception')).toBeInTheDocument();
  });

  test('should render poster image when poster_path exists', () => {
    render(<MovieCard movie={mockMovie} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
  });

  test('should display placeholder when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
  });
});

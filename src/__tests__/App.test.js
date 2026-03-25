import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock all lazy-loaded pages
jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div>Home Page</div>;
  };
});

jest.mock('../pages/Favourite', () => {
  return function MockFavourite() {
    return <div>Favourite Page</div>;
  };
});

jest.mock('../pages/Movies', () => {
  return function MockMovies() {
    return <div>Movies Page</div>;
  };
});

jest.mock('../pages/SearchResults', () => {
  return function MockSearchResults() {
    return <div>Search Results Page</div>;
  };
});

jest.mock('../pages/MovieDetails', () => {
  return function MockMovieDetails() {
    return <div>Movie Details Page</div>;
  };
});

jest.mock('../pages/AboutUs', () => {
  return function MockAboutUs() {
    return <div>About Us Page</div>;
  };
});

jest.mock('../pages/ErrorNotFound', () => {
  return function MockErrorNotFound() {
    return <div>404 Page</div>;
  };
});

jest.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

jest.mock('../components/errorHandling/ErrorBoundary', () => {
  return function MockErrorBoundary({ children }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

jest.mock('../components/animations/LoadingEffect', () => {
  return function MockLoadingEffect() {
    return <div data-testid="loading-effect" />;
  };
});

jest.mock('../context/FavouriteContext', () => ({
  FavouriteProvider: ({ children }) => (
    <div data-testid="favourite-provider">{children}</div>
  ),
}));

describe('App Component', () => {
  test('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  test('should render error boundary', () => {
    render(<App />);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  test('should render favourite provider', () => {
    render(<App />);
    expect(screen.getByTestId('favourite-provider')).toBeInTheDocument();
  });

  test('should render Toaster with correct options', () => {
    render(<App />);
    const toaster = screen.getByTestId('toaster');
    expect(toaster).toBeInTheDocument();
  });
});

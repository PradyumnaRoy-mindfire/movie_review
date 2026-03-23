import '@testing-library/jest-dom';

// Mock import.meta for Jest environment
if (!global.import) {
  global.import = {};
}
global.import.meta = {
  env: {
    VITE_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    VITE_PLACEHOLDER_IMAGE_URL:
      'https://thumbs.dreamstime.com/b/film-strip-london-photographic-showing-scenes-around-included-images-tower-bridge-river-thames-iconic-62944820.jpg',
    VITE_MOVIE_BASE_URL: 'https://api.themoviedb.org/3',
    VITE_MOVIE_API_KEY: 'test-api-key',
  },
};

// Mock the env module to return test values
jest.mock('./env.js', () => ({
  getImageBaseUrl: () => 'https://image.tmdb.org/t/p/',
  getPlaceHolderImageUrl: () =>
    'https://thumbs.dreamstime.com/b/film-strip-london-photographic-showing-scenes-around-included-images-tower-bridge-river-thames-iconic-62944820.jpg',
  getMovieBaseUrl: () => 'https://api.themoviedb.org/3',
  getMovieApiKey: () => 'test-api-key',
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

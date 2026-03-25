import '@testing-library/jest-dom';

//  React Router v7 deprecation warnings in tests
const originalWarn = console.warn;
console.warn = jest.fn((...args) => {
  if (
    args[0]?.includes?.('React Router Future Flag Warning') ||
    args[0]?.includes?.('v7_startTransition') ||
    args[0]?.includes?.('v7_relativeSplatPath')
  ) {
    return;
  }
  originalWarn.call(console, ...args);
});

// suspended resource errors from lazy-loaded components in tests
const originalError = console.error;
console.error = jest.fn((...args) => {
  if (
    args[0]?.includes?.('suspended resource') ||
    args[0]?.includes?.('act(...)')
  ) {
    return;
  }
  originalError.call(console, ...args);
});

// Mock import.meta for Jest environment this Creates a fake import.meta.env
if (!global.import) {
  global.import = {};
}

//provides fallback values when Jest tries to parse import.meta.env.VITE_* in component files during test execution.
global.import.meta = {
  env: {
    VITE_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    VITE_PLACEHOLDER_IMAGE_URL:
      'https://thumbs.dreamstime.com/b/film-strip-london-photographic-showing-scenes-around-included-images-tower-bridge-river-thames-iconic-62944820.jpg',
    VITE_MOVIE_BASE_URL: 'https://api.themoviedb.org/3',
    VITE_MOVIE_API_KEY: 'test-api-key',
  },
};

// mocks a separate env.js helper module
jest.mock('./env.js', () => ({
  getImageBaseUrl: () => 'https://image.tmdb.org/t/p/',
  getPlaceHolderImageUrl: () =>
    'https://thumbs.dreamstime.com/b/film-strip-london-photographic-showing-scenes-around-included-images-tower-bridge-river-thames-iconic-62944820.jpg',
  getMovieBaseUrl: () => 'https://api.themoviedb.org/3',
  getMovieApiKey: () => 'test-api-key',
}));

// mocks matchMedia() to test responsive design or media queries.
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

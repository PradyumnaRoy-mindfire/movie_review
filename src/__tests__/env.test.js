import {
  getImageBaseUrl,
  getPlaceHolderImageUrl,
  getMovieBaseUrl,
  getMovieApiKey,
} from '../env';

// Note: env.js is mocked in setupTests.js, so we're testing the mock implementation
describe('env.js', () => {
  test('should return image base URL', () => {
    const url = getImageBaseUrl();
    expect(url).toBe('https://image.tmdb.org/t/p/');
  });

  test('should return placeholder image URL', () => {
    const url = getPlaceHolderImageUrl();
    expect(url).toContain('https://thumbs.dreamstime.com');
  });

  test('should return movie base URL', () => {
    const url = getMovieBaseUrl();
    expect(url).toBe('https://api.themoviedb.org/3');
  });

  test('should return movie API key', () => {
    const key = getMovieApiKey();
    expect(key).toBe('test-api-key');
  });
});

import { logError } from '../../utils/errorLogger';

describe('errorLogger', () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  test('should log error message to console', () => {
    const errorMessage = 'Test error occurred';
    logError(errorMessage);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
  });

  // Verifies function can handle error objects
  test('should handle error objects', () => {
    const errorObj = new Error('Test error object');
    logError(errorObj);

    expect(console.error).toHaveBeenCalled();
  });

  // Ensures function returns undefined
  test('should return undefined', () => {
    const result = logError('test');
    expect(result).toBeUndefined();
  });

  // Validates timestamp is included in logged message
  test('should include timestamp in logged message', () => {
    logError('test error');

    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/\d{1,2}:\d{2}:\d{2}/)
    );
  });
});

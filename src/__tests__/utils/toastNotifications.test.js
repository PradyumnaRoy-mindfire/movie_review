import {
  showSuccess,
  showError,
  showInfo,
  showWarning,
} from '../../utils/toastNotifications';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');

describe('Toast Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests success toast notification
  test('should show success toast', () => {
    const message = 'Movie added to favourites!';
    showSuccess(message);

    expect(toast.success).toHaveBeenCalledWith(message);
  });

  // Tests error toast notification
  test('should show error toast', () => {
    const message = 'Failed to load movies';
    showError(message);

    expect(toast.error).toHaveBeenCalledWith(message);
  });

  // Tests info toast notification
  test('should show info toast', () => {
    const message = 'Loading movies...';
    showInfo(message);

    expect(toast).toHaveBeenCalledWith(message);
  });

  // Tests warning toast notification
  test('should show warning toast', () => {
    const message = 'This movie is not available in your region';
    showWarning(message);

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: expect.any(String),
      })
    );
  });

  // Validates empty message handling
  test('should handle empty message gracefully', () => {
    showSuccess('');

    expect(toast.success).toHaveBeenCalled();
  });

  // Tests multiple notifications
  test('should handle multiple notifications', () => {
    showSuccess('Message 1');
    showError('Message 2');
    showInfo('Message 3');

    expect(toast.success).toHaveBeenCalledWith('Message 1');
    expect(toast.error).toHaveBeenCalledWith('Message 2');
    expect(toast).toHaveBeenCalledTimes(3);
  });

  // Tests passing custom options to toast
  test('should pass toast options when provided', () => {
    const message = 'Save successful';
    const options = { duration: 5000, position: 'top-center' };

    showSuccess(message, options);

    expect(toast.success).toHaveBeenCalledWith(
      message,
      expect.objectContaining(options)
    );
  });
});

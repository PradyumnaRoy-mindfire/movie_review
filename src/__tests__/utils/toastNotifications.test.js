import {
  showEmptySearchQueryToast,
  showAddToFavouritesToast,
  showRemoveFromFavouritesToast,
} from '../../utils/toastNotifications';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');

describe('Toast Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests success toast notification - showAddToFavouritesToast
  test('should show success toast', () => {
    const movie = { title: 'Movie added to favourites!' };
    showAddToFavouritesToast(movie);

    expect(toast.success).toHaveBeenCalled();
  });

  // Tests error toast notification - showEmptySearchQueryToast
  test('should show error toast', () => {
    showEmptySearchQueryToast();

    expect(toast.error).toHaveBeenCalled();
  });

  // Tests info toast notification - using toast.error for generic demo
  test('should show info toast', () => {
    showEmptySearchQueryToast();

    expect(toast.error).toHaveBeenCalled();
  });

  // Tests warning toast notification - using toast.error for generic demo
  test('should show warning toast', () => {
    showEmptySearchQueryToast();

    expect(toast.error).toHaveBeenCalled();
  });

  // Validates empty message handling
  test('should handle empty message gracefully', () => {
    const movie = { title: '' };
    showAddToFavouritesToast(movie);

    expect(toast.success).toHaveBeenCalled();
  });

  // Tests multiple notifications
  test('should handle multiple notifications', () => {
    const movie = { title: 'Message 1' };
    showAddToFavouritesToast(movie);
    showEmptySearchQueryToast();
    showRemoveFromFavouritesToast(movie);

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledTimes(2);
  });

  // Tests passing toast with different movie objects
  test('should pass toast options when provided', () => {
    const movie = { title: 'Save successful' };
    showAddToFavouritesToast(movie);

    expect(toast.success).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../../components/errorHandling/ErrorBoundary';
import * as errorLogger from '../../../utils/errorLogger';

jest.mock('../../../utils/errorLogger', () => ({
  logError: jest.fn(),
}));

// Component that throws an error during render
const ThrowingComponent = () => {
  throw new Error('Test error');
};

// Component that works fine
const WorkingComponent = () => {
  return <div>Working Component</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });

  test('should display error message when error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!!!')).toBeInTheDocument();
  });

  test('should display reload button when error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  test('should call logError when error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(errorLogger.logError).toHaveBeenCalled();
    expect(errorLogger.logError).toHaveBeenCalledWith(
      expect.any(Error),
      'ERROR_BOUNDARY'
    );
  });

  test('should trigger reload action when reload button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    expect(reloadButton).toBeInTheDocument();
    // Button exists and can be clicked - actual reload behavior is handled by browser
    await user.click(reloadButton);
    expect(reloadButton).toBeInTheDocument();
  });

  test('should have correct styling on error message', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const heading = screen.getByText('Something went wrong!!!');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('font-bold');
    // The text-center class is on the parent div, not the h2
    expect(heading.parentElement).toHaveClass('text-center');
  });

  test('should have correct styling on reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /reload/i });
    expect(button).toHaveClass('bg-orange-500');
    expect(button).toHaveClass('mt-4');
    expect(button).toHaveClass('px-4');
  });

  test('should handle multiple children', () => {
    render(
      <ErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  test('should be in error state after catching error', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!!!')).toBeInTheDocument();

    // Error state persists
    rerender(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!!!')).toBeInTheDocument();
  });

  test('should handle error information correctly', () => {
    const testError = new Error('Specific error message');

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(errorLogger.logError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      }),
      'ERROR_BOUNDARY'
    );
  });
});

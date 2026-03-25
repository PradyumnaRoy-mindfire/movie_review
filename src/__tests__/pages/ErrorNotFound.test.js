import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import ErrorNotFound from '../../pages/ErrorNotFound';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ErrorNotFound Page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('should render 404 heading', () => {
    render(<ErrorNotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('should render error message', () => {
    render(<ErrorNotFound />);
    expect(screen.getByText('Oops! Page not found.')).toBeInTheDocument();
  });

  test('should render Home button', () => {
    render(<ErrorNotFound />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('should render Go Back button', () => {
    render(<ErrorNotFound />);
    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  });

  test('should navigate to home when Home button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorNotFound />);
    const homeButton = screen.getByText(/Home/i);
    await user.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('should go back when Go Back button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorNotFound />);
    const backButton = screen.getByText(/Go Back/i);
    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('should have correct ARIA labels', () => {
    render(<ErrorNotFound />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });
});

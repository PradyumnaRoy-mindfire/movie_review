import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';

jest.mock('../../../utils/toastNotifications', () => ({
  showEmptySearchQueryToast: jest.fn(),
}));

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('should render navbar with navigation role', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('should render PixelPoint logo text', () => {
    renderNavbar();
    expect(screen.getByText('PixelPoint')).toBeInTheDocument();
  });

  test('should render Home link', () => {
    renderNavbar();
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  test('should render Favourite link', () => {
    renderNavbar();
    const favouriteLinks = screen.getAllByText('Favourite');
    expect(favouriteLinks.length).toBeGreaterThan(0);
  });

  test('should render Movies link', () => {
    renderNavbar();
    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  test('should render About Us link', () => {
    renderNavbar();
    const aboutUsLinks = screen.getAllByText('About Us');
    expect(aboutUsLinks.length).toBeGreaterThan(0);
  });

  test('should render search input', () => {
    renderNavbar();
    const searchInputs = screen.getAllByPlaceholderText(/search/i);
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  test('should render menu toggle button on mobile', () => {
    renderNavbar();
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  test('should toggle mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const menuButton = screen.getByLabelText(/Open menu/i);

    // Initially mobile menu should not be visible
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    // Click menu button
    await user.click(menuButton);

    // Mobile menu should be visible
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('should update search input when user types', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const searchInputs = screen.getAllByPlaceholderText(/search/i);

    await user.type(searchInputs[0], 'Avatar');
    expect(searchInputs[0]).toHaveValue('Avatar');
  });

  test('should have skip to main content link', () => {
    renderNavbar();
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  test('should have correct aria-label on navigation', () => {
    renderNavbar();
    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();
  });

  test('should render movie logo image', () => {
    renderNavbar();
    const logo = screen.getByAltText('Movie logo');
    expect(logo).toBeInTheDocument();
  });

  test('should have correct styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-gradient-to-r');
    expect(nav).toHaveClass('from-orange-200');
    expect(nav).toHaveClass('to-pink-200');
  });

  test('should render search submit buttons', () => {
    renderNavbar();
    const searchButtons = screen.getAllByLabelText(/Submit search/i);
    expect(searchButtons.length).toBeGreaterThan(0);
  });
});

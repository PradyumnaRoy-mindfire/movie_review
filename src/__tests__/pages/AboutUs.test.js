import { render, screen } from '@testing-library/react';
import AboutUs from '../../pages/AboutUs';

describe('AboutUs Page', () => {
  test('should render page without crashing', () => {
    render(<AboutUs />);
    const headings = screen.getAllByText(/About/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should render About Us section heading', () => {
    render(<AboutUs />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('should render "Our Site" text', () => {
    render(<AboutUs />);
    expect(screen.getByText('Our Site')).toBeInTheDocument();
  });

  test('should render "Perks" section', () => {
    render(<AboutUs />);
    expect(screen.getByText('Perks')).toBeInTheDocument();
  });

  test('should render all perk items', () => {
    render(<AboutUs />);
    expect(screen.getByText(/Thousands of Movies/i)).toBeInTheDocument();
    expect(screen.getByText(/Search a Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/See Various Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Add to Favourite/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 10 Trending/i)).toBeInTheDocument();
  });

  test('should render "OUR STORY" section', () => {
    render(<AboutUs />);
    expect(screen.getByText('OUR STORY')).toBeInTheDocument();
  });

  test('should have aria-label for About Us Section', () => {
    render(<AboutUs />);
    const section = screen.getByLabelText('About Us Section');
    expect(section).toBeInTheDocument();
  });

  test('should have aria-label for All the Perks Section', () => {
    render(<AboutUs />);
    const section = screen.getByLabelText('All the Perks Section');
    expect(section).toBeInTheDocument();
  });

  test('should have aria-label for Our Story Section', () => {
    render(<AboutUs />);
    const section = screen.getByLabelText('our story section');
    expect(section).toBeInTheDocument();
  });

  test('should render Why Choose Us section', () => {
    render(<AboutUs />);
    expect(screen.getByText(/Why/i)).toBeInTheDocument();
  });

  test('should have min-h-screen class for full height', () => {
    const { container } = render(<AboutUs />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('min-h-screen');
  });

  test('should have proper gradient background', () => {
    const { container } = render(<AboutUs />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('bg-linear-to-br');
    expect(mainDiv).toHaveClass('from-blue-100');
  });
});

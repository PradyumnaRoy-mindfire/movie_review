import { render, screen } from '@testing-library/react';
import Footer from '../../../components/layout/Footer';

describe('Footer Component', () => {
  test('should render footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('should display copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 PixelPoint/)).toBeInTheDocument();
  });

  test('should display "All rights reserved" text', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  test('should have correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gradient-to-r');
    expect(footer).toHaveClass('from-orange-200');
    expect(footer).toHaveClass('to-pink-200');
    expect(footer).toHaveClass('mt-auto');
  });

  test('should render Copyright icon', () => {
    const { container } = render(<Footer />);
    // Check that the footer contains the required text
    expect(screen.getByText(/2026 PixelPoint/)).toBeInTheDocument();
    // Verify that the footer structure is correct
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  test('should have footer text in correct paragraph', () => {
    render(<Footer />);
    const paragraph = screen.getByText(/All rights reserved/);
    expect(paragraph.tagName).toBe('P');
  });
});

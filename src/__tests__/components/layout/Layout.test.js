import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';

jest.mock('../../../components/layout/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock('../../../components/layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

describe('Layout Component', () => {
  const renderLayout = () => {
    return render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  };

  test('should render navbar', () => {
    renderLayout();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('should render footer', () => {
    renderLayout();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('should render main content area', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('should have correct main content aria attributes', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('aria-label', 'Main content');
  });

  test('should have flex layout with flex-col', () => {
    renderLayout();
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
  });

  test('should have flex-grow on main content', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-grow');
  });
});

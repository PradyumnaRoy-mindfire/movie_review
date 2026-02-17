import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow" role="main" aria-label="Main content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

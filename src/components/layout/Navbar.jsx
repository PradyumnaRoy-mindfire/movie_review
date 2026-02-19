import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setIsMenuOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block py-2 md:py-0 lg:py-0 ${isActive ? 'text-orange-500' : 'hover:text-orange-400'} transition-colors`;

  return (
    <nav
      className="bg-gradient-to-r from-orange-200 to-pink-200 shadow-md text-gray-700"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="/src/assets/movie_logo.png"
            alt="Logp"
            className="h-9 w-12"
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            PixelPoint
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-4 mr-5">
          <div className="group relative">
            <input
              type="text"
              className="w-32 lg:w-40 group-hover:w-60 lg:group-hover:w-75 transition-all duration-300 rounded-full border-2 border-gray-500 focus:outline-none focus:border-orange-300 px-5 py-1 mr-3"
              placeholder="Search"
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for movies"
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 -translate-y-1/2 right-8 text-gray-500 cursor-pointer hover:text-orange-500"
              aria-label="Submit search"
            >
              <Search size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="font-bold text-lg space-x-4 flex flex-row">
            <NavLink
              className={navLinkClass}
              to="/"
              aria-label="Go to home page"
            >
              Home
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/favourite"
              aria-label="Go to favourites page"
            >
              Favourite
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/movies"
              aria-label="Go to movies page"
            >
              Movies
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/about-us"
              aria-label="Go to about us page"
            >
              About Us
            </NavLink>
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-orange-300 transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-orange-300 px-4 pb-4"
          role="menu"
        >
          <div className="relative my-3" role="search">
            <input
              id="mobile-search"
              type="text"
              className="w-full rounded-full border-2 border-gray-500 focus:outline-none focus:border-orange-300 px-5 py-2 pr-12"
              placeholder="Search movies..."
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for movies"
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 cursor-pointer hover:text-orange-500"
              aria-label="Submit search"
            >
              <Search size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="font-bold text-lg space-y-2">
            <NavLink
              className={navLinkClass}
              to="/"
              onClick={() => setIsMenuOpen(false)}
              role="navlink"
            >
              Home
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/favourite"
              onClick={() => setIsMenuOpen(false)}
              role="navlink"
            >
              Favourite
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              role="navlink"
            >
              Movies
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/about-us"
              onClick={() => setIsMenuOpen(false)}
              role="navlink"
            >
              About Us
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

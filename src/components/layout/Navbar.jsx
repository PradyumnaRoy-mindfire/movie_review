import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import movieLogo from '../../assets/movie_logo.png';
import { showEmptySearchQueryToast } from '../../utils/toastNotifications';
import ROUTES from '../../constants/route';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (isSearching) return;
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      showEmptySearchQueryToast();
      return;
    }
    setIsSearching(true);
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery('');
    setIsMenuOpen(false);
    setTimeout(() => setIsSearching(false), 800);
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:bg-orange-500 focus:text-white focus:p-3 focus:z-50"
      >
        Skip to main content
      </a>
      <div className="flex items-center justify-between p-4">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={movieLogo} alt="Movie logo" className="h-9 w-12" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            PixelPoint
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-4 mr-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="group relative"
          >
            <label htmlFor="searchInput" className="sr-only">
              Search for movies
            </label>
            <input
              id="searchInput"
              type="text"
              className="w-32 lg:w-40 group-hover:w-60 lg:group-hover:w-75 transition-all duration-300 rounded-full border-2 border-gray-500 focus:outline-none focus:border-orange-300 px-5 py-1 mr-3"
              placeholder="Search"
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for movies"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute top-1/2 -translate-y-1/2 right-8 text-gray-500 cursor-pointer hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit search"
            >
              <Search size={20} aria-hidden="true" />
            </button>
          </form>
          <div className="font-bold text-lg space-x-4 flex flex-row">
            <NavLink
              className={navLinkClass}
              to={ROUTES.HOME}
              aria-label="Go to home page"
            >
              Home
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.FAVOURITE}
              aria-label="Go to favourites page"
            >
              Favourite
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.MOVIES}
              aria-label="Go to movies page"
            >
              Movies
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.ABOUTUS}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="relative my-3"
          >
            <label htmlFor="mobile-search" className="sr-only">
              Search for movies
            </label>
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
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 cursor-pointer hover:text-orange-500"
              aria-label="Submit search"
            >
              <Search size={20} aria-hidden="true" />
            </button>
          </form>
          <div className="font-bold text-lg space-y-2">
            <NavLink
              className={navLinkClass}
              to={ROUTES.HOME}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.FAVOURITE}
              onClick={() => setIsMenuOpen(false)}
            >
              Favourite
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.MOVIES}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </NavLink>
            <NavLink
              className={navLinkClass}
              to={ROUTES.ABOUTUS}
              onClick={() => setIsMenuOpen(false)}
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

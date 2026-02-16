import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-200 to-pink-200 shadow-md  text-gray-700">
        <div className="flex items-center">
          <img
            src="/src/assets/movie_logo.png"
            alt="Logo"
            className="h-9 w-12"
          />
          <h1 className="text-3xl font-bold ">PixelPoint</h1>
        </div>

        <div className="flex items-center space-x-4 mr-5">
          <div className="group relative">
            <input
              type="text"
              placeholder="Search"
              className="w-25 sm:w-37.5 group-hover:w-75 transition-all duration-300 rounded-full border-2 border-gray-500 focus:outline-none focus:border-2 focus:border-orange-300 px-5 py-1 mr-3"
            />
            <Search
              size={20}
              className="absolute top-1/2 -translate-y-1/2 right-8 text-gray-500"
            />
          </div>
          <div className="font-bold text-lg space-x-4">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : ''}`
              }
              to="/favourite"
            >
              Favourite
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : ''}`
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

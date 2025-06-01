import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-200 to-blue-300 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        <Link to="/">
          <h1 className="font-extrabold text-lg sm:text-2xl tracking-wide flex flex-wrap">
            <span className="text-blue-700">Marvel</span>
            <span className="text-blue-900">Estate</span>
          </h1>
        </Link>

        <form className="bg-white px-3 py-2 rounded-full shadow-sm flex items-center gap-2 w-40 sm:w-96">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 w-full"
          />
          <FaSearch className="text-blue-700" />
        </form>

        <ul className="flex gap-4 text-sm sm:text-base font-medium">
          <Link to="/">
            <li className="hidden sm:inline text-blue-900 hover:text-blue-700 transition">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blue-900 hover:text-blue-700 transition">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="text-blue-900 hover:text-blue-700 transition cursor-pointer">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

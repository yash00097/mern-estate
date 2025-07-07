import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle"; 
import BlurText from "../Reactbits/BlurText/BlurText.jsx";
import ShinyText from "../Reactbits/ShinyText/ShinyText.jsx";
import GradientText from "../Reactbits/GradientText/GradientText.jsx";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-blue-200 to-blue-300 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-b-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3">
        <Link to="/">
          <h1 className="font-extrabold text-lg sm:text-2xl tracking-wide flex flex-wrap">
            <BlurText
              text="Marvel"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-blue-700 dark:text-blue-300"
            />
            <BlurText
              text="Estate"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-blue-900 dark:text-blue-100"
            />
          </h1>
        </Link>
        {currentUser && currentUser.role === "admin" && <Link to="/pending-listings">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={14}
            showBorder={false}
            className="custom-class"
          >
            Pending Listings
          </GradientText>
        </Link>}

        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm flex items-center gap-2 w-40 sm:w-96">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-100 w-full placeholder:text-gray-400 dark:placeholder:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-700 dark:text-blue-300" />
          </button>
        </form>

        <ul className="flex gap-4 text-sm sm:text-base font-medium items-center">
          <Link to="/">
            <li className="hidden sm:inline text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 transition">
              <ShinyText text="Home" disabled={false} speed={5} className='custom-class' baseColor="#00008B"/>
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 transition">
              <ShinyText text="About" disabled={false} speed={5} className='custom-class' baseColor="#00008B"/>
            </li>
          </Link>
          <ThemeToggle />
          <Link to="/profile">
            {currentUser ? (
              <img
                className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full object-cover ring-2 ring-blue-500 dark:ring-blue-300"
                src={currentUser.avatar}
                alt="user"
              />
            ) : (
              <li className="text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 transition cursor-pointer">
                <ShinyText text="Sign In" disabled={false} speed={5} className='custom-class' baseColor="#00008B" />
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

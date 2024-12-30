import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-600">Vuppal</span>
                    <span className="text-blue-800">Estate</span>
                </h1>
            </Link>
            <form className="bg-blue-100 p-3 rounded-lg flex items-center">
                <input 
                    type="text" 
                    placeholder="Search.." 
                    className="bg-transparent focus:outline-none w-32 sm:w-96"
                />
                <FaSearch className="text-blue-600"></FaSearch>
            </form>
            <ul className="flex gap-4">
                <Link to="/">
                    <li className="hidden sm:inline text-blue-800 hover:underline ">Home</li>
                </Link>
                <Link to="/about">
                     <li className="hidden sm:inline text-blue-800 hover:underline">About</li>
                </Link>
                <Link to="/sign-in">
                    <li className=" text-blue-800 hover:underline cursor-pointer">Sign in</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
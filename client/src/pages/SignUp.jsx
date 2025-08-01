import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-gray-900 dark:text-gray-100">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 dark:bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 text-gray-800 dark:text-gray-300">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 dark:text-blue-400 hover:underline">Sign in</span>
        </Link>
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 mt-5">{error}</p>
      )}
    </div>

  
  );
}
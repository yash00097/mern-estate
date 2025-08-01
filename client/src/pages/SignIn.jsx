
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
 
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-gray-900 dark:text-gray-100">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 text-gray-800 dark:text-gray-300">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 dark:text-blue-400 hover:underline">Sign up</span>
        </Link>
      </div>

      <div className="flex gap-2 mt-5 text-gray-800 dark:text-gray-300">
        <p>Forgot your password?</p>
        <Link to="/forgot-password">
          <span className="text-blue-700 dark:text-blue-400 hover:underline">Change password</span>
        </Link>
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 mt-5">{error}</p>
      )}
    </div>

  );
}
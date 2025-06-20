import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/request-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.message) {
                setMessage(data.message);
                setTimeout(() => navigate('/verify-otp', { state: { email } }), 2000);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7 text-gray-900 dark:text-gray-100">
                Change Password
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <button
                type="submit"
                className="bg-slate-700 dark:bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 transition"
                >
                Request OTP
                </button>
            </form>

            {message && (
                <p className="text-green-600 dark:text-green-400 mt-5">{message}</p>
            )}

            {error && (
                <p className="text-red-600 dark:text-red-400 mt-5">{error}</p>
            )}
        </div>

    );
}
import {GoogleAuthProvider , getAuth , signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('Error during Google OAuth:', error);
        }
    }
    return ( 
    <button 
      className="bg-red-700 dark:bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-90"
      type="button"
      onClick={handleGoogleClick}
      >
        Continue with Google
    </button> 
);
}

export default OAuth;
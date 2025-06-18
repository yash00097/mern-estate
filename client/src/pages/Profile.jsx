import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });
  
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserFailure(null));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
    if (error || updateSuccess) {
      dispatch(updateUserFailure(null));
      setUpdateSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(updateUserFailure(data.error));
        setFormData({
          username: currentUser.username,
          email: currentUser.email,
          password: ''
        });
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        password: ''
      });
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-bold text-center my-8 text-blue-800">
        {currentUser.username}
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} className='hidden' accept='image/*' />
        <img 
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar} 
          alt="profile"          
          className="w-24 h-24 rounded-full self-center object-cover cursor-pointer" 
        />
        <input 
          type="text" 
          placeholder='username' 
          id='username' 
          value={formData.username}  
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          value={formData.email}  
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          value={formData.password} 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error || ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User updated successfully!' : ''}
      </p>
    </div>
  );
};

export default Profile;
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import MarvelCharacterInput from '../components/MarvelCharacterInput'; 

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  const marvelPublicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const marvelPrivateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
    username: currentUser.username,
    email: currentUser.email,
    user_character: currentUser.user_character || '',
  });

  useEffect(() => {
    dispatch(updateUserFailure(null));
  }, [dispatch]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 2 * 1024 * 1024) { 
      setFileUploadError('File size must be less than 2MB');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setFileUploadError('Please select an image file');
      return;
    }

    setFileUploadError(false);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', cloudinaryUploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed. Please try again.');
      }

      const data = await response.json();
      setFormData({ ...formData, avatar: data.secure_url });
    } catch (error) {
      setFileUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (error || updateSuccess) {
      dispatch(updateUserFailure(null));
      setUpdateSuccess(false);
    }
  };

  const handleCharacterChange = (value) => {
    setFormData((prev) => ({ ...prev, user_character: value }));
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
          avatar: currentUser.avatar,
          username: currentUser.username,
          email: currentUser.email,
          user_character: currentUser.user_character,
        });
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFormData((prev) => ({ ...prev }));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setFormData({
        avatar: currentUser.avatar,
        username: currentUser.username,
        email: currentUser.email,
        user_character: currentUser.user_character || '',
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.error));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      deleteUserFailure(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.error));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch  {
      setShowListingsError(true);
    }
  };
  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.error);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-8 text-blue-800 dark:text-blue-300">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
        />
        <div className="relative self-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full self-center object-cover cursor-pointer ring-2 ring-blue-500 dark:ring-blue-300"
          />

          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">
                Uploading...
              </span>
            </div>
          )}
        </div>

        {fileUploadError && (
          <p className="text-red-700 dark:text-red-400 text-center text-sm">
            {fileUploadError}
          </p>
        )}

        <div className="flex items-center mb-4">
          <label htmlFor="username" className="w-24 font-medium text-gray-800 dark:text-gray-100">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg flex-1"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="email" className="w-24 font-medium text-gray-800 dark:text-gray-100">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg flex-1"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-24 font-medium text-gray-800 dark:text-gray-100">
            Alias:
          </label>
          <div className="flex-1">
            <MarvelCharacterInput
              value={formData.user_character}
              onChange={handleCharacterChange}
              publicKey={marvelPublicKey}
              privateKey={marvelPrivateKey}
            />
          </div>
        </div>

        <button
          disabled={loading || isUploading}
          className="bg-slate-700 dark:bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 transition"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to="/create-listing" className="bg-blue-700 dark:bg-blue-300 text-white dark:text-black rounded-lg p-3 uppercase hover:opacity-95 transition text-center">
          Create a Marvel listing
        </Link>
      </form>


      <div className="flex justify-between mt-5 text-sm sm:text-base">
        <span onClick={handleDeleteUser} className="text-red-700 dark:text-red-400 cursor-pointer">
          Delete account
        </span>
        <Link to="/forgot-password">
          <span className="text-red-700 dark:text-red-400 cursor-pointer">
            Change password
          </span>
        </Link>
        <span onClick={handleSignOut} className="text-red-700 dark:text-red-400 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-red-700 dark:text-red-400 mt-5">{error || ''}</p>
      <p className="text-green-700 dark:text-green-400 mt-5">
        {updateSuccess ? 'User updated successfully!' : ''}
      </p>
      
      <button onClick={handleShowListings} className='text-green-700 dark:text-green-400 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 dark:text-slate-100 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
  
              <div className='flex flex-col item-center'>
                <button 
                  onClick={() => handleDeleteListing(listing._id)} 
                  className='text-red-700 dark:text-red-400 uppercase'
                  >
                    Delete
                </button>
                <button className='text-green-700 dark:text-green-400 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>}      
    </div>
  );
};

export default Profile;

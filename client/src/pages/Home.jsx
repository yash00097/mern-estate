import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListingItem from '../components/ListingItem';
import GradientText from "../Reactbits/GradientText/GradientText.jsx";
import Footer from '../components/Footer.jsx';

const Home = () => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(location.state?.showAlert || false);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className='min-h-screen '>
      {showAlert && (
        <Alert
          variant='outlined'
          severity='success'
          className='dark:text-green-500 dark:border-green-500 dark:bg-gray-800'
          action={
            <IconButton
              aria-label='close'  
              color='inherit'
              size='small'
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Your listing is in verification process. You can check the listing status in your profile.
        </Alert>
      )}

      {/* Hero Section */}
      <div className='relative w-full h-96 mb-10'>
        <img
          src='https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Doctor-Strange-Sanctum-Santorum.jpg'
          alt='Marvel Estate Hero Image'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center p-4'>
          <h1 className='text-white dark:text-gray-200 font-bold text-4xl lg:text-6xl mb-4'>
            Assemble Your Dream Home
            <br />
            with <span className='text-blue-300 dark:text-blue-400 italic'>Marvel</span> <i>Estate</i>
          </h1>
          <Link
            to='/search'
            className='mt-2'
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={10}
              showBorder={false}
              className="custom-class"
            >
              Let&apos;s Get Started
            </GradientText>
          </Link>
        </div>
      </div>

      {/* Listings Section */}
      <div className='max-w-6xl mx-auto px-3 flex flex-col gap-12 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-semibold text-slate-700 dark:text-slate-200'>
                Recent Offers
              </h2>
              <Link
                className='text-sm text-blue-800 dark:text-blue-400 hover:underline'
                to='/search?offer=true'
              >
                Show More Offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-semibold text-slate-700 dark:text-slate-200'>
                Recent Places for Rent
              </h2>
              <Link
                className='text-sm text-blue-800 dark:text-blue-400 hover:underline'
                to='/search?type=rent'
              >
                Show More Places for Rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-semibold text-slate-700 dark:text-slate-200'>
                Recent Places for Sale
              </h2>
              <Link
                className='text-sm text-blue-800 dark:text-blue-400 hover:underline'
                to='/search?type=sale'
              >
                Show More Places for Sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>

  );
};

export default Home;

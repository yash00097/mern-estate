import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 
import { motion } from "framer-motion";

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateListing = lazy(() => import('./pages/CreateListing'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'));
const UpdateListing = lazy(() => import('./pages/UpdateListing'));
const PendingListings = lazy(() => import('./pages/PendingListings'));
const Listing = lazy(() => import('./pages/Listing'));
const Search = lazy(() => import('./pages/Search'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  const DotLoader = () => (
  <div className="flex justify-center items-center h-screen space-x-2">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="w-3 h-3 bg-blue-500 rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
  );
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<DotLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-otp' element={<VerifyOTP />} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route path='/search' element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
            <Route path='/pending-listings' element={<PendingListings />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
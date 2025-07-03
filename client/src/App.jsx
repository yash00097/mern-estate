import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import PrivateRoute from './components/PrivateRoute'
import UpdateListing from './pages/UpdateListing'
import PendingListings from './pages/PendingListings'
function App() {
  return (

    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/forgot-password' element={<ForgotPassword />} /> 
      <Route path='/verify-otp' element={<VerifyOTP />} /> 
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
        <Route path='/pending-listings' element={<PendingListings/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App

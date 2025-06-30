import express from 'express';
import { signup, signin, googleAuth,signout, requestOTP, resetPassword } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google', googleAuth);
router.get('/signout',verifyToken,signout);
router.post('/request-otp', requestOTP); 
router.post('/reset-password', resetPassword);

export default router;
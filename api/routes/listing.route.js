import express from 'express';
import { createListing,
         deleteListing ,
         updateListing, 
         getListing, 
         getPendingListings, 
         approveListing, 
         rejectListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.post('/update/:id', verifyToken, updateListing); 
router.get('/get/:id', getListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.get('/pending', verifyToken, verifyAdmin, getPendingListings);
router.put('/approve/:id', verifyToken, verifyAdmin, approveListing);
router.put('/reject/:id', verifyToken, verifyAdmin, rejectListing);

export default router;
import  Listing  from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create({
            ...req.body,
            user: req.user.id,
        });
        res.status(201).json({
            message: 'Listing created successfully',
            listing,
        });
        
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'));
    }
    if (listing.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(errorHandler(401, 'You can only update your own listing'));
    }
    try {
        if (req.user.role !== 'admin') {
            delete req.body.status;
        }
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: 'Listing updated successfully',
            updatedListing,
        });
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
try {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  res.status(200).json(listing);
} catch (error) {
  next(error);
}

}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing not found'));
    }
    if(listing.user.toString() !== req.user.id){
        return next(errorHandler(401, 'You can only delete your own listing'));
    }
    try {
        await listing.deleteOne();
        res.status(200).json({
            message: 'Listing deleted successfully',
        });
        
    } catch (error) {
        next(error);
    }

}

export const getPendingListings = async (req, res, next) => {
    try {
        const pendingListings = await Listing.find({ status: 'pending' }).populate('user', 'username avatar');
        res.status(200).json(pendingListings);
    } catch (error) {
        next(error);
    }
};

export const approveListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        listing.status = 'approved';
        await listing.save();
        res.status(200).json({ message: 'Listing approved successfully', listing });
    } catch (error) {
        next(error);
    }
};

export const rejectListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        listing.status = 'rejected';
        await listing.save();
        res.status(200).json({ message: 'Listing rejected successfully', listing });
    } catch (error) {
        next(error);
    }
};
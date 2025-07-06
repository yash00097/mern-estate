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

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
      status: 'approved',
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
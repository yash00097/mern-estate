import  Listing  from '../models/listing.model.js';
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
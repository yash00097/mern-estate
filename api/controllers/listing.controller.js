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
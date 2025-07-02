import {errorHandler} from "../utils/error.js";
import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        message: 'User route is working!'
    });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }
    
    try {
        // Clone the request body to avoid mutation
        const updateData = { ...req.body };
        
        // Handle password update
        if (updateData.password) {
            updateData.password = bcrypt.hashSync(updateData.password, 10);
        }

        // Handle avatar upload if new image is provided
        if (updateData.avatar && updateData.avatar.startsWith('data:image')) {
            try {
                // Upload to Cloudinary
                const uploadedResponse = await cloudinary.uploader.upload(
                    updateData.avatar, 
                    {
                        folder: 'marvel-avatars',
                        transformation: [
                            { width: 200, height: 200, crop: 'fill' },
                            { quality: 'auto' }
                        ]
                    }
                );
                
                // Replace base64 with Cloudinary URL
                updateData.avatar = uploadedResponse.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return next(errorHandler(500, 'Avatar upload failed'));
            }
        }

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: updateData.username,
                    email: updateData.email,
                    password: updateData.password,
                    avatar: updateData.avatar,
                    user_character: updateData.user_character
                }
            },
            { new: true }
        );

        // Remove password from response
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(res, 401, 'you can only delete your own account!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json('User has been deleted successfully!');
        
    } catch (error) {
        next(error);
    }
}

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({ user: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(res, 401, 'you can only get your own listings!'));
    }

}
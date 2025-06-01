import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    
    await newUser.save();

    try{
        res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
    }catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }

};
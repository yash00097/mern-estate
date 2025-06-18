import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/emailService.js";


export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try{
        await newUser.save();
        res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
    }catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET
        );
        const { password: pass , ...userWithoutPassword } = validUser._doc;
        res
         .cookie('access_token',token , { httpOnly:true })
         .status(200)
         .json(userWithoutPassword);

    } catch (error) {
        next(error);
    }
}

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
        
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      
    }
  } catch (error) {
    next(error)
  }
}

export const signout = (req, res,next) => {
    try {
        res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json("User has been signed out successfully!");
    } catch (error) {
        next(error);
    }
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const requestOTP = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}. It expires in 10 minutes.`);
        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return next(errorHandler(400, "Invalid or expired OTP"));
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined; // Clear expiration
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        next(error);
    }
};
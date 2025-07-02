import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import marvelRouter from './routes/marvel.route.js';
import listingRoutes from './routes/listing.route.js';
import cookieParser from "cookie-parser";


 

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/marvel', marvelRouter);
app.use('/api/listing',listingRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    return res.status(statusCode).json({ 
        success: false, 
        statusCode,
        error: message 
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
    connectDB();
});

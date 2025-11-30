import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import listingRoutes from './routes/listing.route.js';
import cookieParser from "cookie-parser";
import path from 'path';


 

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing',listingRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    return res.status(statusCode).json({ 
        success: false, 
        statusCode,
        error: message 
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
});

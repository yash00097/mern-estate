import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.route.js';


dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/user', userRoutes);


app.listen(3000, () => {
    console.log('Server started on port 3000');
    connectDB();
});

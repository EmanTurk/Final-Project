import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import connectDB from './config/db.js';
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json())
app.use('/api', userRoutes);

const PORT = process.env.PORT || 6000; // Use the PORT environment variable provided by Render, or 6000 if it's not set

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

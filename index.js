import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', userRoutes);


const PORT = process.env.PORT || 6000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

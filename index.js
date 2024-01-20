import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import connectDB from './config/db.js';
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json())
app.use('/api', userRoutes);


connectDB().then(()=>{
    app.listen('6000', ()=>{
        console.log('listening on port 6000')
    })
})

app.use('/api', userRoutes);




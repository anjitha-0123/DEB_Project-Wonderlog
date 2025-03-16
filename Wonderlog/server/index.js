import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// import cron from 'node-cron';
// import { AddLog } from './models/logModel.js';  // Adjust the path if needed
// import { sendNotification } from './utils/notify.js'; // Utility function for notifications

// import nodemailer from "nodemailer";

import { userauth } from './Routes/userauth.js';
import { adminauth } from './Routes/adminauth.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" })); // Increase JSON size limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded data size limit
app.use(express.raw({ limit: "10mb" })); // Handle raw data if necessary
app.use(express.text({ limit: "10mb" })); // Handle text data if necessary


// Use CORS before defining routes
app.use(cors({
    origin: 'http://127.0.0.1:3000',        
    credentials: true
}));

// Start Server
app.listen(process.env.PORT, function () {
    console.log(`Server is listening at ${process.env.PORT}`);
});


//  Connect to MongoDB
mongoose.connect("mongodb://mongodb:27017/BucketList").then(() => {
    console.log("MONGODB Connected Successfully to BucketList Application");
}).catch((error) => {
    console.error("MongoDB connection failed", error);
});



//  Define Routes
app.use(express.json())
app.use('/', userauth);
app.use('/', adminauth);






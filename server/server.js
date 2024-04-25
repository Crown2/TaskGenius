
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/', taskRouter);
app.use('/api/', userRouter);

const runServer = async () => {
  try {
    mongoose.connect(process.env.ATLAS_URI);

    app.listen(PORT, () => {
      console.log(`TaskGenius is running, server listening to ${PORT}`);
    });
  } catch (err) {
    console.log("Error message: ", err);
  }
};
runServer();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { userRouter } from './routes/users.js';
import { opportunitiesRouter } from './routes/opportunities.js';

const app = express();
app.use(express.json());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/Front-End/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/Front-End/dist/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use(cors());

app.use('/auth', userRouter);

app.use('/opportunities', opportunitiesRouter);
/*
app.listen(5000, () => console.log('Server t7al'));
*/
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

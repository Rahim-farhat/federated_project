import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { userRouter } from './routes/users.js';
import { opportunitiesRouter } from './routes/opportunities.js';

const app = express();

// Enable CORS middleware
app.use(cors());

// Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; img-src 'self' data:;"
  );
  next();
});

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use('/auth', userRouter);
app.use('/opportunities', opportunitiesRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/Front-End/dist')));

// Handle all other routes with a wildcard (*) to serve the frontend application
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/Front-End/dist/index.html'))
);

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

/*
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { userRouter } from './routes/users.js';
import { opportunitiesRouter } from './routes/opportunities.js';

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use(cors());

app.use('/auth', userRouter);

app.use('/opportunities', opportunitiesRouter);

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
*/

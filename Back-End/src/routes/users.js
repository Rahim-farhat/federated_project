import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log(' the /register work');
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'User already fma' });
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedpassword });
  await newUser.save();

  res.json({ message: 'User Registered with success' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'User doesnt exist' });
  }
  const Passwordvalid = await bcrypt.compare(password, user.password);

  if (!Passwordvalid) {
    return res.status(400).json({ message: 'usename or password incorrect' });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

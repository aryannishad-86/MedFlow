import bcrypt from 'bcryptjs';

const { genSalt, hash, compare } = bcrypt;

import jwt from 'jsonwebtoken';
const { sign } = jwt;

import User from '../models/user';
const user = await User.findOne({ email: req.body.email });


export async function registerUser(userData) {
  const { email, password } = userData;

  // Check if user exists
  const existingUser = await findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await genSalt(10);
  userData.password = await hash(password, salt);

  const newUser = new User(userData);
  await newUser.save();
  return newUser;
}

export async function loginUser(email, password) {
  const user = await findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
}

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async (request, response) => {
  try {
    const password = request.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: request.body.email,
      passwordHash: hash,
      fullName: request.body.fullName,
      avatarUrl: request.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret88',
      { expiresIn: '30d' } //token valid 30 days
    );

    const { passwordHash, ...userData } = user._doc; //get info without passwordHash

    response.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to register!',
    });
  }
};

export const login = async (request, response) => {
  try {
    const user = await UserModel.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).json({
        message: 'User is not found!',
      });
    }

    const isValidPass = await bcrypt.compare(
      request.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return response.status(404).json({
        message: 'Wrong login or password!',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret88',
      { expiresIn: '30d' } //token valid 30 days
    );

    const { passwordHash, ...userData } = user._doc; //get info without passwordHash

    response.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to login!',
    });
  }
};

export const getUser = async (request, response) => {
  try {
    const user = await UserModel.findById(request.userId);
    if (!user) {
      return response.status(404).json({
        message: 'User does not exist!',
      });
    }

    const { passwordHash, ...userData } = user._doc; //get info without passwordHash

    response.json({ ...userData });
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: '!!!No access!!!',
    });
  }
};

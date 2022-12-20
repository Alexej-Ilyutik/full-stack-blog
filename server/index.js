import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://Alexej:ASD_Lut_88@cluster0.lt4akvh.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

// app.get('/', (request, response) => {
//   response.send('fth888fljkh');
// });

app.post('/auth/register', registerValidation, async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json(errors.array());
    }

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
});

app.listen(3008, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

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
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json(errors.array());
  }

  const password = request.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: request.body.email,
    passwordHash,
    fullName: request.body.fullName,
    avatarUrl: request.body.avatarUrl,
  });

  const user = await doc.save();

  response.json(user);
  // console.log(request.body);
  // const token = jwt.sign(
  //   {
  //     email: request.body.email,
  //     fullName: 'Alexej Ilyutik',
  //   },
  //   'secret8448'
  // );
  // response.json({ success: true, token });
});

app.listen(3008, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

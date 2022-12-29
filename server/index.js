import express from 'express';
import mongoose from 'mongoose';

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from './validations/validations.js';
import { register, login, getUser } from './controllers/UserController.js';
import {
  getAllPosts,
  getPost,
  createPost,
} from './controllers/PostController.js';
import checkAuth from './utils/checkAuth.js';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://Alexej:ASD_Lut_88@cluster0.lt4akvh.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

app.get('/auth/user', checkAuth, getUser);

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/posts', getAllPosts);
app.get('/posts/:id', getPost);
app.post('/posts', checkAuth, postCreateValidation, createPost);
// app.delete('/posts', removePost);
// app.patch('/posts', updatePost);

app.listen(3008, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

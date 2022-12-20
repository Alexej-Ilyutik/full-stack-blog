import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://Alexej:ASD_Lut_88@cluster0.lt4akvh.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('fth888fljkh');
});

app.post('/auth/login', (request, response) => {
  console.log(request.body);

  const token = jwt.sign(
    {
      email: request.body.email,
      fullName: 'Alexej Ilyutik',
    },
    'secret8448'
  );

  response.json({ success: true, token });
});

app.listen(3008, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

import express from 'express';
import jwt from 'jsonwebtoken';

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

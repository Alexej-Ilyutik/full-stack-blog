import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid mail format!').isEmail(),
  body('password', 'Password must be at least 5 characters!').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be at least 5 characters!').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid avatar link!').optional().isURL(),
];

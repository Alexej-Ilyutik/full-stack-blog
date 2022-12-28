import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret88');
      req.userId = decoded._id;
      next();
    } catch (e) {
      const status = e.status || 403;
      res.status(status).json({
        message: 'No access!!!',
      });
    }
  } else {
    return res.status(403).json({ message: 'No access!' });
  }
};

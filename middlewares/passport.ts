import passport = require('passport');
import { Request, Response, NextFunction } from 'express';

const jwtAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (!user || error || !user.token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default jwtAuthenticate;

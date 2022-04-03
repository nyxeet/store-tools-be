import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getOne, updateById } from '../../services/user';

declare let process: {
  env: {
    SECRET_KEY: string;
  };
};
const { SECRET_KEY } = process.env;

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;
  try {
    const user = await getOne({ login });
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email or password',
      });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await updateById(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default login;

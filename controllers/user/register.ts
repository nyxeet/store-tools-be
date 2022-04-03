import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

import { getOne, add, updateById } from '../../services/user';

declare let process: {
  env: {
    SECRET_KEY: string;
  };
};
const { SECRET_KEY } = process.env;

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await getOne({ email });
    console.log(result);

    if (result) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Login in use',
      });
    }

    const newUser = await add({ firstName, lastName, email, password });

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await updateById(newUser._id, { token });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default register;

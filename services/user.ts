import User from '../models/user';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const add = ({ firstName, lastName, email, password }: User) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
  });
  newUser.setPassword(password);
  return newUser.save();
};

export const getOne = (filter: object) => {
  return User.findOne(filter);
};

export const getById = (id: string) => {
  return User.findById(id);
};

export const updateById = (id: string, updateInfo: object) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

import User from '../models/user';

interface User {
  name: string;
  login: string;
  password: string;
}
export const add = ({ name, login, password }: User) => {
  const newUser = new User({
    name,
    login,
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

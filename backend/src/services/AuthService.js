const UserModel = require('../models/UserModel');
const { getUserByEmail } = require('./UserService');

const createUser = async (data) => {
  try {
    const user = new UserModel({
      name: data?.name,
      email: data?.email,
      password: data?.password,
    });

    const dbResponse = await user.save();
    return dbResponse;
  } catch (error) {
    return error;
  }
};

const loginService = async (email, password) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return null;
    }
    const dbResponse = await user.comparePassword(password);

    if (!dbResponse) {
      return null;
    }
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { createUser, loginService };

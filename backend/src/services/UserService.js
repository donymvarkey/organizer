const UserModel = require('../models/UserModel');

const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id).select(['-password']);
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { getUserByEmail, getUserById };

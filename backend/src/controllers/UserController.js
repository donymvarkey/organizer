const { getUserById } = require('../services/UserService');
const httpResponse = require('../utils/httpResponse');

const getUserProfile = async (req, res, next) => {
  try {
    const dbRes = await getUserById(req.user.id);

    if (!dbRes) {
      return httpResponse(req, res, 404, 'User not found', {});
    }

    return httpResponse(
      req,
      res,
      200,
      'User profile retrieved successfully',
      dbRes,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile };

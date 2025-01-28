const jwt = require('jsonwebtoken');
const httpResponse = require('../utils/httpResponse');

module.exports = {
  allowCrossDomain: function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, x-auth-token, X-Requested-With, Content-Type',
    );

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      //res.sendStatus(200);
      next();
    } else {
      next();
    }
  },

  isAuthorized: function (req, res, next) {
    const verificationHeader = req.headers['authorization'];

    // Check if the Authorization header is missing or empty
    if (!verificationHeader) {
      return httpResponse(req, res, 401, 'Unauthorized User', null);
    }

    const accessToken = verificationHeader?.split(' ')[1];

    // Verify the JWT token
    jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        return httpResponse(req, res, 401, 'Invalid or expired token', null);
      }

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Proceed to the next middleware
      next();
    });
  },

  isAdmin: function (req, res, next) {
    const verificationHeader = req.headers['x-auth-token'];

    try {
      const verify = jwt.verify(verificationHeader, process.env.SECRET);
      if (verify.role !== 'admin') {
        return res.status(401).json({
          status: false,
          msg: 'Access denied!',
        });
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};

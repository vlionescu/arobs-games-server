const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const db = require('../database');

module.exports = (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ auth: false, error: 'No token provided.' });
    }

    // verifies secret and checks exp
    // HARDCODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // eslint-disable-next-line consistent-return
    jwt.verify(token, 'config.secret', async (err, decoded) => {
      if (err) {
        return res.status(500).json({ auth: false, error: 'Failed to authenticate token.' });
      }

      // if everything is good, save to request for use in other routes
      const user = await db.get('SELECT * FROM users where users.id = $id', {
        $id: decoded.id,
      });
      if (!user) {
        return res.status(404).json({ error: 'No user found.' });
      }
      req.userId = decoded.id;
      next();
    });

    // return because of ESLint error.
    return req;
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong/login' });
  }
};

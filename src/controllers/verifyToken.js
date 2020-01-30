var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const db = require('../database');

module.exports = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // verifies secret and checks exp
  // HARDCODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jwt.verify(token, 'config.secret', async function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
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
};

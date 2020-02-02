const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const ms = require('ms');
const db = require('../database');

exports.login = async (req, res) => {
  try {
    if (!req.body.name || !req.body.password) {
      return res.status(400).send('Bad request/Login');
    }

    const user = await db.get('SELECT * FROM users where users.name = $username', {
      $username: req.body.name,
    });
    if (!user) {
      return res.status(404).json({ error: 'Wrong password or username' });
    }
    if (user.password !== req.body.password || user.name !== req.body.name) {
      return res.status(401).json({ error: 'Wrong password or username' });
    }
    // if user is found and password is valid
    // create a token
    // HARDCODE !!
    const token = jwt.sign({ id: user.id }, 'config.secret', {
      expiresIn: ms('3 hrs'), // expires in 3 hours
    });
    // return the information including token as JSON
    return res.status(200).json({ auth: true, token, username: user.name });
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong/login' });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ auth: false, token: null, username: '' });
};

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const db = require('../database');
const ms = require('ms');

exports.login = async (req, res) => {
  try {
    const user = await db.get('SELECT * FROM users where users.name = $username', {
      $username: req.body.name,
    });
    if (!user) return res.status(404).send('No user found.');
    if (user.password !== req.body.password || user.name !== req.body.name)
      return res.status(401).send('Wrong password or username');
    // if user is found and password is valid
    // create a token
    // HARDCODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var token = jwt.sign({ id: user.id }, 'config.secret', {
      expiresIn: ms('3 hrs'), // expires in 3 hours
    });
    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  } catch (e) {
    return res.status(500).send('Something went wrong/login');
  }
};

exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

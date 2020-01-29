const db = require('../database');

// GET All users
exports.get = async (_, res) => {
  try {
    const users = await db.all('SELECT name, email FROM users');
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllUsers');
  }
};

// GET User by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db.get(
      'SELECT users.name as username, users.email, games.name as gamename, scores.points FROM users, games, scores where scores.userId = $id and scores.gameId = games.id',
      { $id: id },
    );

    if (!users) return res.status(400).send('Bad request');

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send('Something went wrong/GetUserById');
  }
};

// POST Add user
exports.post = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send('Bad request/AddUser');

    const id = await db.run(
      `INSERT INTO users(name, email, password) VALUES ($name, $email, $password)`,
      {
        $name: name,
        $email: email,
        $password: password,
      },
    );
    return res.status(200).json({ id, name, email, password });
  } catch (e) {
    return res.status(500).send('Something went wrong/addUser');
  }
};
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) return res.status(400).send('Bad request/login');

    const user = await db.get(`select * from  users where name = $name`, {
      $name: name,
    });
    if (user.password === password) return res.status(200).json(user);
    return res.status(500).send('invalid name or password/login');
  } catch (e) {
    return res.status(500).send('Something went wrong/login');
  }
};

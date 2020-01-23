// TODO - games:
//     - Add games
//     - Get all games
//     - Get games by id ( top 10 scores order desc )

const db = require('../database');

exports.get = async (_, res) => {
  try {
    const games = await db.all('SELECT name,id,imageUrl,description FROM games');
    return res.status(200).json(games);
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllGames');
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const games = await db.get('SELECT * FROM games WHERE id = $id', { $id: id });

    if (!games) return res.status(400).send('Bad request/getGameById');

    return res.status(200).json(games);
  } catch (e) {
    return res.status(500).send('Something went wrong/getGamesById');
  }
};

exports.post = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) return res.status(400).send('Bad request/AddGame');

    const id = await db.run(`INSERT INTO games(name, imageUrl) VALUES ($name, $imageUrl)`, {
      $name: name,
      $imageUrl: imageUrl,
    });
    return res.status(200).json({ id, name });
  } catch (e) {
    return res.status(500).send('Something went wrong/addGame');
  }
};

const db = require('../database');

// GET All games (name, icons)
exports.get = async (_, res) => {
  try {
    const games = await db.all('SELECT * FROM games');
    return res.status(200).json(games);
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllGames');
  }
};

// GET Game by ID
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

// POST Add game
exports.post = async (req, res) => {
  try {
    const { name, imageUrl, description } = req.body;

    if (!name || !imageUrl || !description) return res.status(400).send('Bad request/AddGame');

    const id = await db.run(
      `INSERT INTO games(name, imageUrl, description) VALUES ($name, $imageUrl, $description)`,
      {
        $name: name,
        $imageUrl: imageUrl,
        $description: description,
      },
    );
    return res.status(200).json({ id, name, imageUrl, description });
  } catch (e) {
    return res.status(500).send('Something went wrong/addGame');
  }
};

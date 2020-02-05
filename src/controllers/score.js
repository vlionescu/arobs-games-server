const db = require('../database');

// GET Score By Game ID, pageable, 10/page default.
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { skip = 0, take = 10 } = req.query;

    const scores = await db.all(
      'SELECT points AS Points, users.name AS Username FROM scores JOIN users ON scores.userId = users.id WHERE scores.gameId = $id ORDER BY points DESC LIMIT $skip, $take ',
      {
        $id: id,
        $skip: skip,
        $take: take,
      },
    );

    if (!scores) return res.status(400).send('Bad request');

    return res.status(200).json(scores);
  } catch (e) {
    return res.status(500).send('Something went wrong/GetScoreById');
  }
};

// POST Add score.
exports.post = async (req, res) => {
  try {
    const { userId, gameId, points } = req.body;
    if (!userId || !gameId || points == null) return res.status(400).send('Bad request/AddScore');
    const id = await db.run(
      `INSERT INTO scores(userId, gameId, points) VALUES ($userId, $gameId, $points)`,
      {
        $userId: userId,
        $gameId: gameId,
        $points: points,
      },
    );
    return res.status(200).json({ id, userId, gameId, points });
  } catch (e) {
    return res.status(500).send('Something went wrong/addScore');
  }
};

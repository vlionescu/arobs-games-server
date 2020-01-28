const gameController = require('../controllers/game');
const userController = require('../controllers/user');
const scoreController = require('../controllers/score');

module.exports = (app) => {
  app.get('/games', gameController.get);
  app.get('/users', userController.get);
  app.get('/games/:id', gameController.getById);
  app.get('/users/:id', userController.getById);
  app.get('/scores/:id', scoreController.getById);

  app.post('/users', userController.post);
  app.post('/games', gameController.post);
  app.post('/scores', scoreController.post);
};

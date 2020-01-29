const gameController = require('../controllers/game');
const userController = require('../controllers/user');
const scoreController = require('../controllers/score');
const authController = require('../controllers/authController');
// const verifyToken = require('../controllers/verifyToken');

module.exports = (app) => {
  app.get('/games', gameController.get);
  app.get('/users', userController.get);
  app.get('/games/:id', gameController.getById);
  app.get('/users/:id', userController.getById);
  app.get('/scores/:id', scoreController.getById);
  app.get('/logout', authController.logout);

  // if you want to check, user is logged in then write like this:
  // app.get('/games/:id', verifyToken, gameController.getById);

  app.post('/users', userController.post);
  app.post('/games', gameController.post);
  app.post('/scores', scoreController.post);
  app.post('/login', authController.login);
};

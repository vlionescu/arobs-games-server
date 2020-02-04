const gameController = require('../controllers/game');
const userController = require('../controllers/user');
const scoreController = require('../controllers/score');
const authController = require('../controllers/authController');
const verifyToken = require('../controllers/verifyToken');

module.exports = (app) => {
  app.get('/games', gameController.get);
  app.get('/users', userController.get);
  app.get('/games/:id', verifyToken, gameController.getById);
  app.get('/users/:id', userController.getById);
  app.get('/scores/:id', scoreController.getById);
  app.get('/logout', authController.logout);

  // if registration is successful, then redirect to authentication
  app.post('/users', userController.post, authController.login);
  app.post('/games', gameController.post);
  app.post('/scores', scoreController.post);
  app.post('/login', authController.login);
};

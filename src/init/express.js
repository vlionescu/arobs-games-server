const express = require('express');
const config = require('../config');
const makeLogger = require('../middlewares/makeLogger');

module.exports = (app) => {
  app.set('PORT', config.PORT);
  app.use(express.static('public'));
  app.use(express.static('/'));
  app.use(express.json());
  app.use(express.text());
  app.use(makeLogger());
};

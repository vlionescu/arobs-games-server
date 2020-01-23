const express = require('express');

const app = express();
require('./init/express')(app);
require('./init/route')(app);

module.exports = app;

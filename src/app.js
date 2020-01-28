const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
require('./init/express')(app);
require('./init/route')(app);

module.exports = app;

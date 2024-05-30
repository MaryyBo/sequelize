const express = require('express')
const router = require('./routes/index')
const { errorHandler } = require('./errorHandler')
const { STATIC_PATH } = require('./config/path.config');

const app = express();

const bodyParser = express.json();
app.use(bodyParser);

// або скорочено = app.use(express.json());

app.use(express.static(STATIC_PATH));

app.use('/api', router);

app.use(errorHandler);

module.exports = app;



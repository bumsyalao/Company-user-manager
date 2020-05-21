const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const routes = require('./server/routes');

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();

app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Require our routes into the application.

// routes(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;

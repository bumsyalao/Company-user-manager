import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Require our routes into the application.
routes(app);

const compiler = webpack(config);
const env = 'development';

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
});

app.listen(port, () => {
  console.log(`App started on port ${port}!`);
});


module.exports = app;
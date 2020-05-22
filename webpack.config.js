'use strict';
const ENVIRONMENT = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins() {
      return [
        autoprefixer({
          browsers: ['last 3 versions']
        })
      ];
    }
  }
};

const config = {
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true
  },
  entry: {
    bundle: [`${__dirname}/client/Index.jsx`]
  },
  output: {
    libraryTarget: 'var',
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: `/`,
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx'],
    alias: {
      img: path.resolve(__dirname, './img')
    }
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          postCSSLoader,
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, './node_modules/compass-mixins/lib')],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ['css-loader']
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?limit=100000'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
}

module.exports = config;
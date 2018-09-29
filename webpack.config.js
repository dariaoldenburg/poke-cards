/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const exclude = /node_modules/;

const watchOptions = {
  poll: 1000,
  aggregateTimeout: 1000,
};

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './app/app.js',
  ],
  watchOptions,
  output: {
    filename: 'app.js',
    path: '/dist',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `html-loader!./index.html`,
      inject: true,
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules')
    ]
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'app'),
        ],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
          quiet: true,
        }
      },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'app'),
        ],
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-function-bind',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        exclude,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        exclude,
      },
    ],
  },
  devServer: {
    contentBase: [
      './app',
      './app/styles',
    ],
    historyApiFallback: true,
    inline: true,
    port: 5000,
    watchOptions,
  },
};

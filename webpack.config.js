const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin')
const merge = require('webpack-merge')
const validate = require('webpack-validator')

const parts = require('./libs/parts')

// /* Might not be necessary to have absolute path */
// const PATHS = {
//   app: path.join(__dirname, 'app'),
//   build: path.join(__dirname, 'build')
// };

const common = {
  entry: {
    app: './app'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    }),
    new DotenvPlugin({
      path: './.env'
    })
  ],
  devtool: 'source-map'
}

var config;
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(
      common,
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = config //validate(config);

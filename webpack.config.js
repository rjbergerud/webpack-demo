const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin')
const merge = require('webpack-merge')
const validate = require('webpack-validator')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const parts = require('./libs/parts')
const pkg = require('./package.json')

/* Might not be necessary to have absolute path */
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  vendorStyles: path.join(__dirname, 'node_modules', 'purecss')
};

const common = {
  entry: {
    app:  PATHS.app,
    vendor:  Object.keys(pkg.dependencies),
    vendorStyles: PATHS.vendorStyles
  },
  module: {
    loaders: [
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
    config = merge(
      common,
      {
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js'
        }
      },
      {devtool: 'source-map'},
      parts.minify(),
      parts.extractCSS(PATHS.app),
      parts.extractCSS(PATHS.vendorStyles)
    );
    break;
  default:
    config = merge(
      common,
      {
        output: {
          path: PATHS.build,
          filename: '[name].js'
        }
      },
      {
        module: {
          loaders: [
            {
              test: /\.css$/,
              loader: 'style!css'
            }
          ]
        }
      },
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);

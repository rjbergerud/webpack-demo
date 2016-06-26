const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// /* Might not be necessary to have absolute path */
// const PATHS = {
//   app: path.join(__dirname, 'app'),
//   build: path.join(__dirname, 'build')
// };

module.exports = {
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
    })
  ],
  devtool: 'source-map'
}

const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './assets/index.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};

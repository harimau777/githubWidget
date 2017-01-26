var webpack = require('webpack');

var config = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: __dirname + '/build',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: __dirname,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;

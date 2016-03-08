'use strict';

const join = require('path').join;

module.exports = {
  entry: './source/client/index.js',

  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'public'),
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015&presets[]=react!svg-react',
      },
    ]
  }
};

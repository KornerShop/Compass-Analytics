
/* eslint-disable no-console */

const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=__webpack_hmr&timeout=2000',
    './client/index.jsx',
  ],
  output: {
    path: join(__dirname, '../dist'),
    filename: 'bundle.js',
    pathinfo: false,
    publicPath: '/dist',
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.es'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  modules: false,
                },
              ],
              'react',
              'stage-2',
            ],
            plugins: [
              'react-hot-loader/babel',
              'transform-es2015-modules-commonjs',
              'babel-plugin-transform-async-to-generator',
              'recharts',
            ],
          },
        },
        include: join(__dirname, '../client'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};

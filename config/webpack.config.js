/* eslint-disable no-console */

const { join, resolve } = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const config = {
  entry: ['babel-polyfill', 'whatwg-fetch', resolve(__dirname, '../client/index.jsx')],
  output: {
    path: join(__dirname, '../dist'),
    filename: 'bundle.js',
    pathinfo: dev,
    publicPath: '/dist',
  },
  devtool: dev ? 'eval' : false,
  resolve: {
    extensions: ['.js', '.jsx'],
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
              'transform-es2015-modules-commonjs',
              'transform-async-to-generator',
              'recharts',
            ],
          },
        },
        include: [join(__dirname, '../client')],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
};

if (!dev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
      },
      output: {
        beautify: false,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  )
} else {
  config.entry.splice(
    2,
    0,
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=__webpack_hmr&timeout=2000'
  );
  config.module.rules[0].use.options.plugins.unshift(
    'react-hot-loader/babel'
  );
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

console.log(`\n${dev ? 'DEVELOPMENT' : 'PRODUCTION'} 🏗️\n`);

console.log(`\nconfig: ${JSON.stringify(config, null, 2)}\n`);

module.exports = config;

/* eslint-disable no-console */

import { join } from 'path';
import webpack, {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  DefinePlugin,
  LoaderOptionsPlugin
} from 'webpack';

export default env => {
  const prod = env === 'prod';
  const config = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
      path: join(__dirname, '../dist'),
      filename: 'bundle.js',
      pathinfo: !prod,
    },
    devtool: prod ? false : 'eval',
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
                'babel-plugin-transform-async-to-generator',
                'recharts',
              ],
            },
          },
          include: join(__dirname, '../src'),
        },
      ],
    },
  };

  if (prod) {
    config.output.publicPath = '/dist';
    config.plugins = [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        comments: false,
      }),
    ];
  } else {
    config.devServer = {
      historyApiFallback: true,
      compress: true,
      hot: true,
    };
    config.entry.splice(1, 0, 'react-hot-loader/patch');
    config.module.rules[0].use.options.plugins.splice(
      0,
      0,
      'react-hot-loader/babel',
    );
    config.plugins = [
      new HotModuleReplacementPlugin(),
      new NamedModulesPlugin(),
    ];
  }

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

  console.log(`\ndev: ${!prod}`);

  return config;
};

/* eslint-disable no-console */

import {resolve, join} from 'path'
import webpack, {HotModuleReplacementPlugin, NamedModulesPlugin} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default env => {
  const prod = env === 'prod'
  const config = {
    entry: ['babel-polyfill', './src/index'],
    output: {
      path: join(__dirname, '../dist'),
      filename: 'bundle.js',
      pathinfo: !prod,
    },
    devtool: prod ? false : 'eval',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: 'last 2 versions',
                    },
                    loose: true,
                    modules: false,
                  },
                ],
                'react',
                'stage-2',
              ],
              plugins: ['babel-plugin-transform-async-to-generator'],
            },
          },
          include: join(__dirname, '../src'),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../src/index.html'),
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          minifyCSS: true,
          quoteCharacter: '',
          removeComments: true,
          useShortDoctype: true,
        },
      }),
    ],
  }

  if (prod) {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
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
    )
  } else {
    config.devServer = {
      historyApiFallback: true,
      compress: true,
      hot: true,
    }
    config.entry.splice(1, 0, 'react-hot-loader/patch')
    config.module.rules[0].use.options.plugins.splice(
      0,
      0,
      'react-hot-loader/babel',
    )
    config.plugins.push(
      new HotModuleReplacementPlugin(),
      new NamedModulesPlugin(),
    )
  }

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())

  console.log(`\ndev: ${!prod}`)

  return config
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true, 
    },
    resolve: {
      extensions: ['.ts', '.js'], 
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'assets'),
            to: 'assets',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/, 
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: env.mode === 'development' ? 'source-map' : false, 
    devServer: {
      port: 5500,
      open: true,
      static: path.resolve(__dirname, 'dist'),
      hot: true,
    },
  };
};

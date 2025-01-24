const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
	return {
		mode: env.mode || 'development',
		entry: path.resolve(__dirname, 'src', 'index.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			new webpack.ProgressPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		devServer: {
			port: 5500,
			open: true,
			static: path.resolve(__dirname, 'dist'),
		},
	};
};
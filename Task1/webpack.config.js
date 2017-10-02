const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',

	context: path.join(__dirname, 'src'),

	entry: [
		'webpack/hot/only-dev-server',
		'./index.jsx'
	],

	output: {
		path: path.join(__dirname, "built"),
		filename: '[name].js'
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ["transform-react-jsx"],
						presets: ['env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
						}
					}, {
						loader: 'typed-css-modules-loader',
						options: {
							camelCase: true,
							outDir: './built/css-modules'
						}
					}
				]
			},
			{
				test: /\.(ttf|eot|svg|woff|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader",
				options: {
					name: '[path][name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'Netflix Roulette Search',
			hash: true,
			template: './index.html'
		})
	]
};
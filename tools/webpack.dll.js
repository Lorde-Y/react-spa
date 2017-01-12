const webpack = require('webpack');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

const library = [
	'react',
	'react-dom'
];

const config = {
	entry: {
		library: library
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: "[name].dll.js",
		chunkFilename: "[name].[chunkhash]ooi.js",
		publicPath: 'http://localhost:7000',
		library: '[name]_[hash]'
	},
	plugins: [
		// https://github.com/cssmagic/blog/issues/58 Loader options & minimize
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.DllPlugin({
			path: path.resolve(__dirname, '../build/[name]-mainfest.json'),
			name: "[name]_[hash]",
			context: __dirname
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}

module.exports = config
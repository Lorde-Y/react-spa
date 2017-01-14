const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = process.argv.indexOf('--release') === -1 ? true : false;

const srcPath = path.resolve(__dirname, '../src');

// http://caniuse.com/  可以查询在中国使用的浏览器类型及版本
const BROWSER_AUTOPREFIXER = [
	"Android >= 4",
	"and_chr >= 51", 
	"Chrome >= 20",
	"bb >= 8", 
	"Opera >= 20",
	"Edge >= 6", 
	"firefox >= 20",
	"Explorer >= 9", 
	"ie_mob >= 10", 
	"ios_saf > 8", 
	"safari >= 6",
	"and_uc >= 5",
	"Samsung >= 4"
];

const config = {
	devtool: 'cheap-source-map',
	context: path.resolve(__dirname, "../"),
	entry: {
		// https://webpack.js.org/guides/hmr-react/
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:7000',
			'webpack/hot/only-dev-server',
			'./src/app'
		]
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: DEBUG ? "[name].js?[hash]" : "[name].[hash].js",
		chunkFilename: "[name].js?[hash]-[chunkhash]",
		publicPath: DEBUG ? 'http://localhost:7000/' : 'http://cdn.com'
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				use:[
					{ loader: "babel-loader" }
				],
				exclude: [
					path.resolve(__dirname, "../node_modules")
				],
				include: [
					srcPath
				]
			},
			// https://webpack.js.org/guides/migrating/ #Chaining loaders & https://github.com/postcss/postcss-loader 
			{
				test: /\.less$/,
				// use: [
				// 	{ loader: "style-loader" },
				// 	{ loader: "css-loader?modules" },
				// 	{ loader: 'postcss-loader' },
				// 	{ loader: "less-loader" },
				// ],
				// DEBUG
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader'
				],
				//Production
				// loader: ExtractTextPlugin.extract({
				// 	fallbackLoader: "style-loader",
				// 	loader: ["css-loader", "postcss-loader", "less-loader"]
				// }),
				exclude: [
					path.resolve(__dirname, "../node_modules")
				],
				include: [
					srcPath
				]
			}
		]
	},
	// https://github.com/webpack/webpack/issues/3486
	performance: {
		hints: DEBUG ? false : "warning"
	},
	resolve: {
		modules: [srcPath, "node_modules"],
		extensions: ['.js', '.jsx'],
		alias: {
			component: path.resolve(srcPath, './component'),
			container: path.resolve(srcPath, './container')
		}
	},
	cache: DEBUG,
	stats: {

	},
	plugins: [
		// https://github.com/cssmagic/blog/issues/58 Loader options & minimize
		new webpack.LoaderOptionsPlugin({
			minimize: DEBUG ? false : true,
			options: {
				// https://github.com/postcss/postcss-loader/issues/128
				postcss: [
					// these options will send to postcss-loader
					require('autoprefixer')({
						browsers: BROWSER_AUTOPREFIXER
					})
				]
			}
		}),
		new webpack.DefinePlugin({
			"__dev__" : DEBUG
		}),
		// only when production
		// new ExtractTextPlugin({
		// 	filename: "style.css",
		// 	disable: false,
		// 	allChunks: true
		// }),
		new HtmlWebpackPlugin({
			title: 'My App',
			filename: 'create.html',
			template: 'src/content/index.html',
			minify: DEBUG ? false : {
				removeComments: true,
				collapseWhitespace: true
			},
			chunks: ['app'],
			cache: DEBUG ? false : true,
			hash: DEBUG ? false : true
		}),
		new webpack.DllReferencePlugin({
			context: ".",
			manifest: require( '../build/library-mainfest.json')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	devServer: {
		port: 7000,
		contentBase: '../build', //定义静态服务器的基路径 
		hot: true,
		// inline: true,
		historyApiFallback: true,
		//publicPath is same with output.publicPath, or HMR doesn't work
		publicPath: DEBUG ? 'http://localhost:7000/' : 'http://cdn.com', 
		stats: { colors: true }
	}
};

module.exports = config


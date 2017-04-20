var webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	path = require('path'),
	pkg = require('./package'),
	ip = require('ip'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	TransferWebpackPlugin = require('transfer-webpack-plugin'),
  ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'src/index.js');

var config = [
	{
		name: 'index',
		entry: {
			main: ['webpack-hot-middleware/client?name=index', APP_PATH]
		},
		module: {
			loaders: [{
				test: /\.less$/,
				loader: 'style!css!postcss!less'
			}, {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}, {
				test: /\.(jpe?g|gif|png|ico|svg)$/,
				loader: 'url?limit=8192&name=build/[name].[hash:4].[ext]'
			}, {
				test: /\.(woff2?|otf|eot|ttf)$/i,
				loader: 'url?name=fonts/[name].[hash:4].[ext]'
			}, {
				test: /\.json$/,
				loader: 'json'
			}]
	  },
		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				inject: 'body',
				template: "src/index.tpl.html"
			}),
			new TransferWebpackPlugin([
				{ from: 'assets/lib', to: 'build'}
			], path.join(__dirname, 'src')),
			new ExtractTextPlugin('build/app.[hash:4].css'),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.AggressiveMergingPlugin({
				minSizeReduce: 1.5,
				moveToParents: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				'process.env.ISMORK': JSON.stringify(process.env.ISMORK)
			})
		],
		devtool: 'source-map'
	},
	{
		name: 'editor',
		entry: {
			main: ['webpack-hot-middleware/client?name=editor', path.resolve(ROOT_PATH, 'src/editor.js')]
		},
		output: {
			path: path.join(__dirname, '/build/'),
			filename: 'build/[name].[hash:4].js',
			chunkFilename: 'build/chunk.[id].[hash:4].js',
			publicPath: '/'
		},
		module: {
			loaders: [{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?-minimize!' + 'autoprefixer-loader!' + 'less'
				)
			}, {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}, {
				test: /\.(jpe?g|gif|png|ico|svg)$/,
				loader: 'url?limit=8192&name=build/[name].[hash:4].[ext]'
			}, {
				test: /\.(woff2?|otf|eot|ttf)$/i,
				loader: 'url?name=fonts/[name].[hash:4].[ext]'
			}, {
				test: /\.json$/,
				loader: 'json'
			},{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss')
			}]
		},
		resolve: {
			modulesDirectories: [
				'src',
				'node_modules',
				'src/assets'
			],
			extensions: ['', '.js', '.png']
		},
		postcss: function() {
			return [
				require('autoprefixer'),
				require('precss')
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: "editor.html",
				inject: 'body',
				template: "src/editor.tpl.html"
			}),
			new TransferWebpackPlugin([
				{ from: 'assets/lib', to: 'build'}
			], path.join(__dirname, 'src')),
			new ExtractTextPlugin('build/app.css'),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.AggressiveMergingPlugin({
				minSizeReduce: 1.5,
				moveToParents: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				'process.env.ISMORK': JSON.stringify(process.env.ISMORK)
			})
		],
		devtool: 'source-map'
	}
]

config.forEach(function(item){
	item.output =  {
		path: path.join(__dirname, '/build/'),
		filename: 'build/[name].[hash:4].js',
		chunkFilename: 'build/chunk.[id].[hash:4].js',
		publicPath: '/'
	}
	item.resolve = {
		modulesDirectories: [
			'src',
			'node_modules',
			'src/assets'
		],
			extensions: ['', '.js', '.png']
	}
	item.postcss = function() {
		return [
			require('autoprefixer'),
			require('precss')
		]
	}
})

module.exports = config;
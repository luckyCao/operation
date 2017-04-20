var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var publicPath = './';
var config = [
	{
		cache: true,
		entry: {
			index: path.resolve(__dirname, 'src/index.js'),
			shared: [
				'babel-polyfill',
				'react',
				'reqwest',
			]
		},
		output: {
			path: path.join(__dirname, 'src/public/web/'),
			filename: 'index.js',
			chunkFilename: 'chunk.[id].[hash:4].js',
			publicPath:publicPath
		},
		resolve: {
			modulesDirectories: [
				'src',
				'node_modules',
				'src/assets'
			],
			extensions: ['', '.json', '.js', '.png']
		},
		module: {
			loaders: [{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?-minimize!' + 'autoprefixer-loader!' + 'less'
				)
			}, {
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}, {
				test: /\.json?$/,
				loader: 'json'
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss')
			}, {
				test: /\.(jp?g|gif|png|woff|ico)$/,
				loaders: ['url-loader?limit=8192&name=[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
			}]
		},
		imagemin: {
			gifsicle: {
				interlaced: false
			},
			jpegtran: {
				progressive: true,
				arithmetic: false
			},
			optipng: {
				optimizationLevel: 5
			},
			pngquant: {
				floyd: 0.5,
				speed: 2
			},
			svgo: {
				plugins: [{
					removeTitle: true
				}, {
					convertPathData: false
				}]
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/public/tpl/index.tpl.html',
				inject: 'body',
				filename: 'index.html'
			}),
			new TransferWebpackPlugin([
				{ from: 'assets/lib', to: './'}
			], path.join(__dirname, 'src')),
			new StatsPlugin('webpack.stats.json', {
				source: false,
				modules: true
			}),
			new ExtractTextPlugin('index.css'),
			new webpack.optimize.CommonsChunkPlugin('shared', 'indexShared.js'),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				cache: false,
				compressor: {
					warnings: false,
					screw_ie8: false
				},
				output: {
					comments: false
				}
			}),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin({
				minSizeReduce: 1.5,
				moveToParents: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}),
		],
		postcss: [
			require('autoprefixer')
		]
	},
	{
		cache: true,
		entry: {
			editor: path.resolve(__dirname, 'src/editor.js'),
			shared: [
				'babel-polyfill',
				'react',
				'react-redux',
				'redux',
				'actions',
				'reqwest',
			]
		},
		output: {
			path: path.join(__dirname, 'src/public/web/'),
			filename: 'editor.js',
			chunkFilename: 'chunk.[id].[hash:4].js',
			publicPath:publicPath
		},
		resolve: {
			modulesDirectories: [
				'src',
				'node_modules',
				'src/assets'
			],
			extensions: ['', '.json', '.js', '.png']
		},
		module: {
			loaders: [{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?-minimize!' + 'autoprefixer-loader!' + 'less'
				)
			}, {
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}, {
				test: /\.json?$/,
				loader: 'json'
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss')
			}, {
				test: /\.(jp?g|gif|png|woff|ico)$/,
				loaders: ['url-loader?limit=8192&name=[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
			}]
		},
		imagemin: {
			gifsicle: {
				interlaced: false
			},
			jpegtran: {
				progressive: true,
				arithmetic: false
			},
			optipng: {
				optimizationLevel: 5
			},
			pngquant: {
				floyd: 0.5,
				speed: 2
			},
			svgo: {
				plugins: [{
					removeTitle: true
				}, {
					convertPathData: false
				}]
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/public/tpl/editor.tpl.html',
				inject: 'body',
				filename: 'editor.html'
			}),
			new TransferWebpackPlugin([
				{ from: 'assets/lib', to: './'}
			], path.join(__dirname, 'src')),
			new StatsPlugin('webpack.stats.json', {
				source: false,
				modules: true
			}),
			new ExtractTextPlugin('editor.css'),
			new webpack.optimize.CommonsChunkPlugin('shared', 'editorShared.js'),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				cache: false,
				compressor: {
					warnings: false,
					screw_ie8: false
				},
				output: {
					comments: false
				}
			}),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin({
				minSizeReduce: 1.5,
				moveToParents: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}),
		],
		postcss: [
			require('autoprefixer')
		]
	}
]
module.exports = config;

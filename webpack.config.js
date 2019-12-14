require('dotenv').config()
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'public/dist');
const APP_DIR = path.resolve(__dirname, 'src/app');
const PROD = process.argv.indexOf('-p') !== -1;
const WATCH = process.argv.indexOf('--watchit') !== -1;
const STATIC = process.argv.indexOf('--static') !== -1;

const plugins = [
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// all options are optional
		filename: 'bundle.css',
	})
]
const {
	WPK_PROXY = ''
} = process.env

console.log('PROXY: ' + WPK_PROXY)

const config = {
	watch: WATCH,
	mode: PROD ? 'production' : 'development',
	entry: APP_DIR + '/main.jsx',
	devtool: PROD ? '' : 'eval-source-map',
	resolve: {
		alias: {
			Helpers: path.resolve(__dirname, 'src/helpers/'),
			Locale: path.resolve(__dirname, 'src/locale/'),
			App: path.resolve(__dirname, 'src/app/'),
			Styles:  path.resolve(__dirname, 'src/styles/')
		}
	},
	devServer: {
		contentBase: __dirname,
		port: 9191,
		proxy: {
			'/api': {
				target: WPK_PROXY,
				changeOrigin: true,
				pathRewrite: {'^/api' : ''}
			}
		}
	},
	output: {
		path: BUILD_DIR,
		publicPath: 'public/',
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.map'
	},
	module: {
		rules: [{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: ['babel-loader']//, 'eslint-loader']
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../',
						hmr: !PROD,
						reloadAll: true
					}
				}, {
					loader: 'css-loader',
					options: {
						modules: 'global'
					}
				}, {
					loader: 'postcss-loader'
				}, {
					loader:'sass-loader',
					options: {
						implementation: require('sass')
					}
				}]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: plugins
};

module.exports = config

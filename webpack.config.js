var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname,

	entry: [
		'webpack-dev-server/client?http://localhost:3000',
      	'webpack/hot/only-dev-server',
		'./assets/js/index'
	],

	output: {
		path: path.resolve('./assets/bundles'),
		filename: '[name].js',
		publicPath: 'http://localhost:3000/assets/bundles/',
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx']
	}

}

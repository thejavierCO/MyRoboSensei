const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const HtmlWebpackPlugin  = require("html-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias:{
			svelte:path.resolve('node_modules','svelte')
		},
		extensions: ["*" ,'.mjs' , '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
				]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
			},
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
			},
			{
				test: /\.(gif|png|jpg|ttf|svg)$/,
				use: ['file-loader']
			},
			{
				test:/\.(ts|txt)$/,
                exclude: /node_modules/,
				use:{
					loader:"raw-loader"
				}
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: "./src/index.html",
            filename: "index.html"
		}),
		new MonacoWebpackPlugin()
	],
	devtool: prod ? false: 'source-map'
};
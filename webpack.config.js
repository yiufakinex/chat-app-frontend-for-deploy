const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Chat App',
            template: './public/templates/index.html',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './public/templates/login.html',
            filename: 'login.html',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: './public/templates/newUser.html',
            filename: 'newUser.html',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: './public/templates/error.html',
            filename: 'error.html',
            chunks: []
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "net": false,
            "fs": false,
            "tls": false,
            "child_process": false,
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    stats: {
        errorDetails: true,
        children: true,
    },
};

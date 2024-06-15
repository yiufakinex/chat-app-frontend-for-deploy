const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    cache: true,
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Chat App',
            template: './public/templates/index.html',
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
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
    externals: [
        nodeExternals(),
        function ({ context, request }, callback) {
            if (/^stompjs/.test(request)) {
                return callback(null, `commonjs ${request}`);
            }
            callback();
        },
    ],
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    cache: true,
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'New User Page',
            filename: 'newUser.html',
            template: './public/templates/newUser.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Error Page',
            filename: 'error.html',
            template: './public/templates/error.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Login Page',
            filename: 'login.html',
            template: './public/templates/login.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: './public/templates/index.html',
        }),

],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            net: false
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].[contenthash].js', 
        clean: true, 
        publicPath: '/', 
      },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    }
};
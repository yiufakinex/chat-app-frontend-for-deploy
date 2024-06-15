const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    cache: true,
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Caching',
        template: `./public/templates/index.html`,
        publicPath: '/', 
    })

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
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src','app'),
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            repo: '',
            inject: false
        }),
        new webpack.DefinePlugin({
            REPO: JSON.stringify('')
        })
    ],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        host: 'localhost',
        open: true,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader:'babel-loader'
        }]
    }
}

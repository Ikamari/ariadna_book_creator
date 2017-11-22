var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/index.js',
    watch: true,
    output: {
        path: __dirname + '/public/scripts',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ]
    }
};
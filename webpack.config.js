const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.ts',
    context: __dirname,
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
            crypto: false,
            path: false,
            stream: false,
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            process: require.resolve('process/browser'),
        }
    },
    externals: {
        jszip: 'jszip',
        buffer: 'buffer'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                APP_ENV: JSON.stringify(process.env.APP_ENV || 'browser')
            },
        }),
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.min.js',
        library: {
            name: 'AnkiGenerator', // ignore in node
            type: 'umd'
        },
        globalObject: 'this',
    },
    target: 'web',
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
}

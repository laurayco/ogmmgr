const { resolve } = require('path');
const mode = process.env.NODE_ENV || "development";

module.exports = {
    mode,
    entry: {
        app: resolve("src/client.tsx")
    },
    output: {
        filename: '[name]-bundle.js',
        path: resolve("www/static/js"),
        library: '[name]',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx.',
            '.js'
        ]
    }
};
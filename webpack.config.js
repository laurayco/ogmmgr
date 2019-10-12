const { resolve } = require('path');
const mode = process.env.NODE_ENV || "development";
const is_dev = mode==="development";

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
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    mode: is_dev ? "development" : "production",
    optimization: {
        usedExports: !is_dev
    }
};
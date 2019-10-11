const { resolve } = require('path');
const mode = process.env.NODE_ENV || "development";

module.exports = {
    mode,
    entry: {
        app: resolve("bin/client.js")
    },
    output: {
        filename: '[name]-bundle.js',
        path: resolve("www/static/js"),
        library: '[name]',
        libraryTarget: 'var'
    }
};
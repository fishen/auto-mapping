const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    externals: [nodeExternals()],
    devtool: "source-map",
    module: {
        rules: [{ test: /\.ts(x?)$/, loader: "ts-loader", }]
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'auto-mapping',
            main: 'dts/src/index.d.ts',
            out: "~/index.d.ts",
        })
    ],
    resolve: {
        extensions: ['.ts']
    },
    optimization: {
        minimize: false
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
        libraryTarget: 'commonjs'
    }
};
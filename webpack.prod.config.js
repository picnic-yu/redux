const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        Rxue: ['./src/components/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/dist/",
        libraryTarget: 'umd',
        library: 'Rxue'
    },
    externals: {
        'react': 'react',//因为引入的肯定是react项目，所以不需要再将react打包进npm包
        'react-dom': 'react-dom'
    },
    plugins:[
        new CleanWebpackPlugin(['dist'])
    ]
}

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const base = require('./webpack.base');
let other; 
if (process.env.NODE_ENV == 'production') {
    other = require('./webpack.prod.config');
}else{
    other = require('./webpack.dev.config');
}
module.exports = merge(base,other);
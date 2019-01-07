const path = require('path');
const HappyPack = require('happypack');
const webpack = require('webpack');
// 多核cpu压缩文件
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    resolve: {
        modules: ['node_modules', './lib']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: 'happypack/loader?id=babel',
                // use:[
                //     {
                //         loader:'babel-loader',
                //         options:{
                //             presets:['env','stage-0','react']//映射 es6  7  react
                //         }
                //     }
                // ],
                include: path.resolve('./src'),
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                include: path.resolve('./src'),
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: 'happypack/loader?id=css',
                include: path.resolve('./src'),
                exclude: /node_modules/

            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port:7000,
        host:'localhost'
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
        // 定义环境变量
        new webpack.DefinePlugin({
            __development__:JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader']
        }),
        new WebpackParallelUglifyPlugin({
            workrcount: 3, //开启几个进程并发执行压缩
            uglifyJs: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, //在uglifyjs删除没有用到的代码但是不输出警告
                    drop_console: true, //删除所有的console语句 兼容ie
                    collapse_vars: true, //内嵌定义了但是只用到一次的变量
                    reduce_vars: true //提取出出现多次但没有定义成变量去引用的静态值
                }
            }
        })
    ]

}
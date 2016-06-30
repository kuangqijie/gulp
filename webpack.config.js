//var path = require('path');
var webpack = require('webpack');
//独立出css 通过link引入
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { //入口文件
        index : './src/js/main/index.js',
        detail : './src/js/main/detail.js'
    },
    output: { //输出配置
        path: './src',
        //publicPath:'http://localhost:63342/myFED/build/web/', //发布路径
        filename: 'js/bundle/[name].js'
        //filename: '[name].[hash].js'
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({
        //    compressor: {
        //        warnings: false
        //    }
        //}),
        //new ExtractTextPlugin("css2/[name].css")
    ],
    module: {
        loaders: [
            //{test: /\.css$/, loaders: ['style', 'css']},
            //{test: /\.scss$/, loaders: ['style', 'css', 'sass']}
            //{test: /\.scss$/, loader: ExtractTextPlugin.extract(['css','sass'])}
            //{test: /\.(jpg|png|gif)$/, loader: "url?limit=8192name=../images/[name].[ext]"}
        ]
    },
    resolve: {
        //自动扩展文件后缀名，require模块可以省略不写后缀名
        extensions: ['', '.js', '.css', '.scss']
    },
    watch:true //开启监听 js文件改变自动执行构建
};
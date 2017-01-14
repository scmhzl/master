/**
 * Created by scmhzl on 2017/1/3.
 */
var webpack = require("webpack");
module.exports = {
    devtool: false,
    entry:'./views/index.js',
    output: {
        path:'',
        filename: './public/build.js',
    },
    devServer: {
        inline: true,
        port: 7777
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    /*plugins:[
        //环境变量
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        //压缩指令
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
    ]*/

}


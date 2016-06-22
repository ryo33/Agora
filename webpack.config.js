var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: ["babel-polyfill", "./web/static/js/app.js", "./web/static/css/app.css"],
    output: {
        path: "./priv/static",
        filename: "js/app.js"
    },
    module: {
      //        preLoaders: [{
      //            test: /\.js$/,
      //            exclude: /node_modules/,
      //            loader: "eslint"
      //        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("css")
        }, { 
            test: /\.svg$/, 
            loader: 'svg-inline'
        }]
    },
    resolve: {
        extensions: [
            "", ".js"
        ],
        modulesDirectories: [
            "web/static/js",
            "node_modules",
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/app.css"),
        new CopyWebpackPlugin([
            { from: "./web/static/assets" },
            { from: "./node_modules/material-design-icons/iconfont", to: "iconfont" }
        ])
    ]
};

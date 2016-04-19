var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["./web/static/js/app.js", "./web/static/css/app.css"],
    output: {
        path: "./priv/static",
        filename: "js/app.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                plugins: ["transform-object-rest-spread"],
                presets: ["es2015", "react"]
            }
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
            "node_modules",
            __dirname + "/web/static/js",
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

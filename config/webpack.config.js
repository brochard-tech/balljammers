const webpack   = require("webpack"),
    path        = require("path");


module.exports = {
    output: {
        filename: "balljammers.js"
    },
    entry: path.join(__dirname, "../src/index.js"),

    resolve: {
        extensions: [".js", ".json"],
        modules: ["node_modules"]
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "stage-2"]
                }
            }
        ]
    },

    devServer: {
        compress    : true,
        port        : 3332,
    }
};

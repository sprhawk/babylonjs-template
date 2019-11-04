const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = (env, argv) => {
    var mode = "development";
    common_config = common(mode);
    common_config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    return merge(common_config, {
        devServer: {
            contentBase: "dist",
            host: "localhost",
            port: 8000,
            compress: true,
            allowedHosts: ["localhost"],
            disableHostCheck: true,
            publicPath: "/",
            // proxy: {
            //     "/": "http://localhost:8000/"
            // }
        },
    });
};

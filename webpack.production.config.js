const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = (env, argv) => {
    var mode = "production";
    return merge(common(mode), {});
};

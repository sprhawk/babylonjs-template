const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dist_path = path.resolve(__dirname, "dist");

module.exports = function(mode) {
    return {
        mode: mode,
        devtool: "source-map",
        output: {
            path: dist_path,
            filename: mode == "development" ? "[name].js" : "[name].[hash].js",
            chunkFilename: mode == "development" ? "[name].chunk.js" : "[name].[hash].chunk.js",
        },
        entry: {
            earth: "./src/earth.ts",
            stars: "./src/stars.ts",
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        /*		    {
			                        loader: 'babel-loader',
		                            },
                        */ // babel-loader didn't support let a = b as TypeA operator,
                        // so combine ts-loader and babel-loader togather
                        // https://github.com/TypeStrong/ts-loader/tree/4354cf834441126edb1588725625cf44a6aad96f/examples/react-babel-karma-gulp
                        {
                            loader: "ts-loader",
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "vue-style-loader"
                        },
                        {
                            // loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            // loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                implementation: require("sass")
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpeg|jpg|gif|png|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                publicPath: '/dist',
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                publicPath: '/dist',
                            }
                        }
                    ]
                },      
                {
                    test: /\.(json)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                publicPath: '/dist',
                            }
                        }
                    ]
                },      
            ]
        },
        resolve: {
            extensions: [".js", ".ts", ".json"],
            modules: ["node_modules"],
            alias: {
                scss: path.resolve(__dirname, 'scss'),
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: mode == "development" ? "[name].css" : "[name].[hash].css",
                chunkFilename: mode == "development" ? "[id].css" : "[id].[hash].css",
            }),
            // new CopyWebpackPlugin([
            //     { from: "index.html", to: "dist/index.html" },
            // ]),
            new HtmlWebpackPlugin({
                filename: "earth.html",
                chunks: ["earth"],
                inject: "body",
                template: "index.html"
            }),
            new HtmlWebpackPlugin({
                filename: "stars.html",
                chunks: ["stars"],
                inject: "body",
                template: "index.html"
            }),
         ],
        optimization: {
            // minimizer: [
            //   new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true
            //   }),
            //   new OptimizeCssAssetsPlugin({})
            // ],
            splitChunks: {
                chunks: 'all',
                name: true,
                minSize: 0,
            }
        },
        watchOptions: {
            ignored: /node_modules/
        },
        target: "web",
    }
};

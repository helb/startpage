const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function getPlugins() {
    const plugins = [new webpack.NoEmitOnErrorsPlugin(), new HtmlWebpackPlugin()];

    plugins.push(new ExtractTextPlugin({filename: "style.[hash].css"}));

    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": process.env.NODE_ENV
        }
    }));

    if (process.env.NODE_ENV === "production") {
        plugins.push(new webpack.optimize.UglifyJsPlugin({"sourceMap": true}));
        // plugins.push(new webpack.optimize.CommonsChunkPlugin({"name": "vendor", "filename": "vendor.[hash].js"}));
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
}

module.exports = {
    entry: {
        app: "./index",
        // vendor: ["fs", "xml2js", "rss-parser"]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./"
    },
    context: path.resolve(__dirname, "src"),
    performance: {
        hints: process.env.NODE_ENV === "production" ? "warning" : false
    },
    devtool: "source-map",
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        historyApiFallback: true,
        open: true
    },
    plugins: getPlugins()
};

var webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require("./webpack.config.common"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?minimize!postcss!sass") // extract css and create file
            },

            {
                test: /\.html$/,
                loader: 'html',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [

        // UGLIFY JS
        // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            mangle: false
        })
    ]
});

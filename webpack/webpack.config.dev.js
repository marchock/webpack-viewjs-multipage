var merge = require('webpack-merge'),
    common = require("./webpack.config.common"),
    stylelint = require('stylelint'),
    stylelintConfig = require('../stylelint.config.js'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss") // extract css and create file
            },
            {
                test: /\.html$/,
                loader: 'html!htmlhint',
                exclude: /node_modules/
            }
        ]
    },

    htmlhint: {
        configFile: '../.htmlhintrc'
    }

    // NOTE: style lint is breaking post css plugin postcss-rg

    // postcss: function () {

    //     return [
    //         stylelint(stylelintConfig) // http://stylelint.io/user-guide/
    //     ]
    // }
});
var merge = require('webpack-merge'),
    common = require("./webpack.config.common"),
    stylelint = require('stylelint'),
    stylelintConfig = require('../stylelint.config.js'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {

    module: {
        loaders: [
            {// SASS -- note: sass-loader 3.2.0 not working
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss!sass?sourceMap") // extract css and create file
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
    },

    postcss: function () {

        return [
            stylelint(stylelintConfig) // http://stylelint.io/user-guide/
        ]
    }
});
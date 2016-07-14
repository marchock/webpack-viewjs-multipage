var webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    reporter = require("postcss-reporter"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
    ModernizrConfig = require('../modernizr-config.js'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    SvgStore = require('webpack-svgstore-plugin'),
    postcssDiscardDuplicates = require('postcss-discard-duplicates'),
    postcssMergeRules = require('postcss-merge-rules');


module.exports = {
    entry: {
        vendor: ["jquery", "vue", "slick-carousel"],
        results: "./src/module/pages/page-results/page-results.js",
        home: './src/module/pages/page-home/page-home.js'
    },

    output: {
        path: "./dist/static",
        filename: "js/[name].js",
        publicPath: "/static/"
    },
    module: {
        loaders: [

            {// VUE
                test: /\.vue$/,
                loader: 'vue'
            },

            {// BABEL
                test: /\.js$/,
                exclude: /(node_modules|bower_components|slick-carousel)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },

            {// FONTS
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              exclude: /(img)/,
              loader: 'file?name=fonts/[name].[ext]'
            },

            {// IMAGE
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /(fonts)/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/[name].[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },

    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
    },

    postcss: function () {

        return [
            reporter({ clearMessages: true }),
            mqpacker,
            autoprefixer,
            postcssMergeRules,
            postcssDiscardDuplicates
        ]; //https://github.com/postcss/postcss
    },


    plugins: [

        new ExtractTextPlugin('css/[name].css'),

        new ModernizrWebpackPlugin(ModernizrConfig),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new webpack.ProvidePlugin({'slick-carousel': 'slick-carousel/slick/slick'}),

        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.bundle.js"),

        //new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a home.html
          filename: '../home.html',
          //https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
          // to use layout template this is required "!!layout!html!"
          template: "!!layout!html!./src/module/pages/page-home/page-home.html",
          excludeChunks: ['results']
        }),

        new HtmlWebpackPlugin({  // Also generate a results.html
          filename: '../results.html',
          // to use layout template this is required "!!layout!html!"
          template: '!!layout!html!src/module/pages/page-results/page-results.html',
          excludeChunks: ['home']
        }),

        //https://github.com/mrsum/webpack-svgstore-plugin
        new SvgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true },
                    { removeUselessStrokeAndFill: true }
                ]
            }
        }),

        new CopyWebpackPlugin([
            { from: 'src/icons', to: 'icons' }
        ])
    ]
};
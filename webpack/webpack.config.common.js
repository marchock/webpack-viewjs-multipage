var webpack = require('webpack'),

    // postCss plugins
    atImport = require("postcss-import"),
    rg = require('../plugins/postcss-rg'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    reporter = require("postcss-reporter"),
    // postcssDiscardDuplicates = require('postcss-discard-duplicates'),
    // postcssMergeRules = require('postcss-merge-rules'),
    cssvariables = require('postcss-css-variables'),
    postcssNested = require('postcss-nested'),



    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
    ModernizrConfig = require('../modernizr-config.js'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    SvgStore = require('webpack-svgstore-plugin');


module.exports = {
    entry: {
        vendor: ["jquery", "vue", "slick-carousel"],
        results: "./src/components/pages/page-results/page-results.js",
        home: './src/components/pages/page-home/page-home.js'
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
            //reporter({ clearMessages: true }),
            atImport,
            rg,
            cssvariables({
                variables: {
                     '--color-hero': '#41b883',
                     '--color-white': '#fff',
                     '--color-header': '#35495e'
                }
            }),
            postcssNested
            // mqpacker,
            // autoprefixer,
            // postcssMergeRules,
            // postcssDiscardDuplicates,
        ]; //https://github.com/postcss/postcss
    },


    plugins: [

        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.bundle.js"),
        
        new ExtractTextPlugin('css/[name].css'),

        new ModernizrWebpackPlugin(ModernizrConfig),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new webpack.ProvidePlugin({'slick-carousel': 'slick-carousel/slick/slick'}),

        

        //new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a home.html
          filename: '../home.html',
          //https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
          // to use layout template this is required "!!layout!html!"
          template: "!!layout!html!./src/components/pages/page-home/page-home.html",
          excludeChunks: ['results']
        }),

        new HtmlWebpackPlugin({  // Also generate a results.html
          filename: '../results.html',
          // to use layout template this is required "!!layout!html!"
          template: '!!layout!html!src/components/pages/page-results/page-results.html',
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
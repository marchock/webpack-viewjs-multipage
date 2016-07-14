var dev = require("./webpack/webpack.config.dev"),

    watch = require("./webpack/webpack.config.watch"),

    build = require("./webpack/webpack.config.build"),

    BUILD_TARGET = process.env.npm_lifecycle_event || "dev";



if(BUILD_TARGET === 'dev') {

    module.exports = dev;

} else if (BUILD_TARGET === 'watch') {

    module.exports = watch;

} else if (BUILD_TARGET === 'build') {

    module.exports = build;

}
const wp = require("@cypress/webpack-preprocessor");
const nuxt = require("nuxt");

function cypressNuxt(opts) {
    return nuxt.getWebpackConfig()
                .then((nuxtWebpackConfig) => {
                    if (opts && opts.transform) {
                        return opts.transform(nuxtWebpackConfig);
                    }
                    return nuxtWebpackConfig
                })
               .then((transformedConfig) => {
                   /**
                    * It appears that chunking breaks cypress unit tests:
                    * https://github.com/cypress-io/cypress-webpack-preprocessor/issues/31
                    */
                    // todo: research other chunking options
                    delete transformedConfig.optimization.runtimeChunk
                    delete transformedConfig.optimization.splitChunks
                    /**
                     * https://github.com/cypress-io/cypress-webpack-preprocessor#webpackoptions
                     * Source maps are always enabled unless explicitly disabled by specifying devtool: false
                     * - since our nuxt config could be production mode (most likely?) let's force it to true here
                     */
                    transformedConfig.devtool = true;
                    return wp({
                        webpackOptions: transformedConfig /*{
                            devtool: true,
                            module: {
                            rules: transformedConfig.module.rules
                            },
                            plugins: transformedConfig.plugins,
                            resolve: transformedConfig.resolve,
                            resolveLoader: transformedConfig.resolveLoader,
                            entry: transformedConfig.entry
                        }*/
                    });
               })
}

module.exports.plugin = cypressNuxt;
const wp = require('@cypress/webpack-preprocessor');
const nuxt = require('nuxt');

function cypressNuxt(opts) {
  return nuxt
    .getWebpackConfig('client', opts ? opts.loadOptions : undefined)
    .then((nuxtWebpackConfig) => {
      if (opts && opts.transform) {
        return opts.transform(nuxtWebpackConfig);
      }
      return nuxtWebpackConfig;
    })
    .then((transformedConfig) => {
      /**
       * It appears that chunking breaks cypress unit tests:
       * https://github.com/cypress-io/cypress-webpack-preprocessor/issues/31
       */
      delete transformedConfig.optimization.runtimeChunk;
      delete transformedConfig.optimization.splitChunks;
      /**
       * https://github.com/cypress-io/cypress-webpack-preprocessor#webpackoptions
       * Source maps are always enabled unless explicitly disabled by specifying devtool: false
       * - since our nuxt config could be production mode (most likely?) let's force it to true here
       */
      transformedConfig.devtool = true;
      /**
       * We don't really care about the HTML templates. We mostly just care about the resolve rules, modules
       * and other plugins. Remove them from the plugins to avoid errors with not being defined if the .nuxt folder isn't present
       */
      transformedConfig.plugins = transformedConfig.plugins.filter(
        (v) => !(v.constructor && v.constructor.name === 'HtmlWebpackPlugin'),
      );

      /**
       * We don't really care about the entry either, this seems to make webpack build a bit more
       * so remove it to try to speed things up more
       */
      delete transformedConfig.entry.app;

      return wp({
        webpackOptions: transformedConfig,
      });
    });
}

module.exports.plugin = cypressNuxt;

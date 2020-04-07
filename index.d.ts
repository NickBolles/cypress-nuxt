import {CypressWebpackPreProcessor} from '@cypress/webpack-preprocessor';
/**
 * Options for Cypress-nuxt
 */
interface Options {
    /**
     * A hook to transform the webpack config
     * 
     * @param webpackConfig The original configuration that nuxt returned
     * @returns actual webpack config to use
     */
    transform(webpackConfig: CypressWebpackPreProcessor.Options): Promise<CypressWebpackPreProcessor.Options> | CypressWebpackPreProcessor.Options;
}

/**
 * Cypress plugin that will return a file preprocessor for nuxt.
 * This allows one liner nuxt configuration for Cypress in order to unit test components.
 * 
 * @param opts Options for the plugin
 * @returns - Promise that resolves in a file pre-processor (from `@cypress/webpack-preprocessor`) that can be used in `on("file:preprocessor")` calls
 */
export function plugin(opts?: Options): Promise<CypressWebpackPreProcessor.FilePreprocessor>;
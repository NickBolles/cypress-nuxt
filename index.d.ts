import {CypressWebpackPreProcessor} from '@cypress/webpack-preprocessor';

// todo: use Nuxt's actual load Options Type when there is one
// initial options from feature PR: https://github.com/nuxt/nuxt.js/pull/6868
interface LoadOptions {
    rootDir: string;
    for: NuxtTarget;
}
// source: https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/load.js#L4
type NuxtTarget = "dry" | "dev" | "build" | "start"

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
    transform(webpackConfig: import("webpack").Configuration): Promise<import("webpack").Configuration> | import("webpack").Configuration;
    loadOptions: LoadOptions
}

/**
 * Cypress plugin that will return a file preprocessor for nuxt.
 * This allows one liner nuxt configuration for Cypress in order to unit test components.
 * 
 * @param opts Options for the plugin
 * @returns - Promise that resolves in a file pre-processor (from `@cypress/webpack-preprocessor`) that can be used in `on("file:preprocessor")` calls
 */
export function plugin(opts?: Options): Promise<CypressWebpackPreProcessor.FilePreprocessor>;
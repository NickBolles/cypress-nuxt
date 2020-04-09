
// todo: use Nuxt's actual load Options Type when there is one
interface LoadOptions {
    rootDir: string;
    for: NuxtTarget;
}
// source: https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/load.js#L4
type NuxtTarget = "dry" | "dev" | "build" | "start"
interface Options {
    transform(webpackConfig: any): Promise<any> | any;
    loadOptions: LoadOptions
}

export function plugin(opts?: Options): Promise<any>;
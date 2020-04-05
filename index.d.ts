interface Options {
    transform(webpackConfig: any): Promise<any> | any;
}

export function plugin(opts?: Options): Promise<any>;
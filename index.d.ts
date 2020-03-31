interface Options {
    transform(webpackConfig: any): Promise<any> | any;
}

declare function cypressNuxt(opts?: Options): Promise<any>;

export = cypressNuxt;
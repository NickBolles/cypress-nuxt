/**
 Using: 
 ```
   /* For @nuxt/typescript-runtime configs *\/
  require("ts-node").register({
    compilerOptions: {
      target: "es5",
      module: "commonjs" // node expects commonjs format
    }
  });
  return require("cypress-nuxt")({
    transform: (webpackConfig) => {
      console.log("loaded webpack config: \r\n",webpackConfig)
      return webpackConfig;
    }
  })
  ```

  will print the following webpack config 
 */

const config =  {
  name: 'client',
  mode: 'production',
  devtool: false,
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [ [TerserPlugin] ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: [Object]
    }
  },
  output: {
    path: 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\.nuxt\\dist\\client',
    filename: '[contenthash].js',
    futureEmitAssets: true,
    chunkFilename: '[contenthash].js',
    publicPath: '/_nuxt/'
  },
  performance: { maxEntrypointSize: 1024000, hints: 'warning' },
  module: {
    rules: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  plugins: [
    VueLoaderPlugin {},
    WarningIgnorePlugin { filter: [Function] },
    WebpackBarPlugin {
      profile: false,
      handler: [Function],
      modulesCount: 500,
      showEntries: false,
      showModules: true,
      showActiveModules: true,
      options: [Object],
      reporters: [Array]
    },
    HtmlWebpackPlugin { options: [Object] },
    HtmlWebpackPlugin { options: [Object] },
    VueSSRClientPlugin { options: [Object] },
    DefinePlugin { definitions: [Object] },
    ForkTsCheckerWebpackPlugin {
      tslint: undefined,
      eslint: false,
      eslintOptions: {},
      tslintAutoFix: false,
      tsconfigPath: undefined,
      tslintPath: undefined,
      watchPaths: [],
      compiler: undefined,
      started: undefined,
      elapsed: undefined,
      cancellationToken: undefined,
      isWatching: false,
      checkDone: false,
      compilationDone: false,
      diagnostics: [],
      lints: [],
      eslintVersion: undefined,
      startAt: 0,
      nodeArgs: [],
      options: [Object],
      watch: [],
      ignoreDiagnostics: [],
      ignoreLints: [],
      ignoreLintWarnings: false,
      reportFiles: [],
      logger: [Consola],
      silent: false,
      async: true,
      checkSyntacticErrors: false,
      resolveModuleNameModule: undefined,
      resolveTypeReferenceDirectiveModule: undefined,
      workersNumber: 1,
      memoryLimit: 2048,
      useColors: true,
      colors: [Chalk],
      formatter: [Function: codeframeFormatter],
      emitCallback: [Function: noopEmitCallback],
      doneCallback: [Function: doneCallback],
      typescript: [Object],
      typescriptPath: 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\node_modules\\typescript\\lib\\typescript.js',
      typescriptVersion: '3.8.3',
      tsconfig: 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\tsconfig.json',
      compilerOptions: {},
      tslintVersion: undefined,
      vue: [Object],
      useTypescriptIncrementalApi: false,
      measureTime: false
    }
  ],
  resolve: {
    extensions: [
      '.wasm',    '.mjs',
      '.js',      '.json',
      '.vue',     '.jsx',
      '.ts',      '.tsx',
      '.graphql', '.gql'
    ],
    alias: {
      '~~': 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client',
      '@@': 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client',
      '~': 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client',
      '@': 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client',
      assets: 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\assets',
      static: 'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\static',
      'vue-meta': 'C:\\Users\\nickb\\Resilio Sync\\Development\\OpenSource\\cypress-nuxt\\node_modules\\vue-meta\\dist\\vue-meta.esm.browser.js'
    },
    modules: [
      'node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\plugins\\child\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\plugins\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\node_modules',
      'C:\\Users\\nickb\\AppData\\node_modules',
      'C:\\Users\\nickb\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules',
      'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\plugins\\child\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\plugins\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\lib\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\server\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\packages\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\app\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\resources\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\Cypress\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\4.2.0\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\Cache\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\Cypress\\node_modules',
      'C:\\Users\\nickb\\AppData\\Local\\node_modules',
      'C:\\Users\\nickb\\AppData\\node_modules',
      'C:\\Users\\nickb\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules',
      'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\node_modules'
    ]
  },
  entry: {
    app: [
      'C:\\Users\\nickb\\Resilio Sync\\Projects\\goalsapp\\project\\packages\\client\\.nuxt\\client.js'
    ]
  }

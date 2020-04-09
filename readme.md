# Cypress-nuxt
Use Cypress for all of your component unit tests.

### Why though?
First off, cypress is awesome. Second, there's a bit of wiring up needed when using nuxt. Although this was made way easier with Nuxt [exposing the webpack config](https://github.com/nuxt/nuxt.js/pull/7029), we still need to tweak the config a tiny bit to get it to work with cypress. 

There also might be other utilities needed in the future to make cypress even easier to use with nuxt, so I thought a NPM package would be good. Maybe exposing the nuxt config to cypress, or automatically setting the base URL? Have Ideas? submit some enhancement requests!

# Getting started

## Nuxt version
First, this requires Nuxt >2.12. This module doesn't rely on nuxt itself so you need to install it (although it's a nuxt app... if you don't have it installed what are you doing?). If you're not on > 2.12 [upgrade nuxt](https://nuxtjs.org/guide/upgrading)

## Install
`npm install -D cypress-nuxt cypress-vue-unit-test`
or with yarn
`yarn add -D cypress-nuxt cypress-vue-unit-test`


## Add the cypress plugin

#### With Async/Await
You might want to check that your node.js version [supports async await](https://node.green/#ES2017-features-async-functions). If it doesn't... well first upgrade. :p but if not use promises below.

`cypress/plugins/index.js`
```javascript
const cypressNuxt = require("cypress-nuxt");

module.exports = async (on, config) => { // make sure to include "async"!
  on("file:preprocessor", await cypressNuxt.plugin()); // make sure to include "await"!

  // other plugins...
  return config;
};
```

#### With Promises

`cypress/plugins/index.js`
```javascript
const cypressNuxt = require("cypress-nuxt");

module.exports = function (on, config) {
  return cypressNuxt.plugin().then(function (webpackPreProcessor) {
    on("file:preprocessor", webpackPreProcessor);

    // other plugins...
    return config;
  })
  
};
```


### @nuxt/typescript-runtime

in your `cypress/plugins/index.js` add a ts-node register call before getting the webpack config.
```javascript
require("ts-node").register({
    compilerOptions: {
        // force to compile to what node.js expects
        target: "es5",
        module: "commonjs" // node expects commonjs format
    }
});

cypressNuxt.plugin({})
  .then((webpackConfig) => {
      console.log(webpackConfig)
  })

```

#### With Async/Await
I like to pull it out to a function so it's easy to `await`
`cypress/plugins/index.js`
```javascript
const cypressNuxt = require("cypress-nuxt");

module.exports = async (on, config) => { // make sure to include "async"!
  on("file:preprocessor", await filePreprocessor()); // make sure to include "await"!

  // other plugins...
  return config;
};

function filePreprocessor() {
  require("ts-node").register({
    compilerOptions: {
      target: "es5",
      module: "commonjs" // node expects commonjs format
    }
  });
  // return the promise to return the webpack config
  return cypressNuxt.plugin({})
}
```

## Options
the plugin function takes an options object. See the type definitions for [LoadOptions](index.d.ts#L3) for valid options. 

### rootDir
Set the root dir to search for the nuxt.config.[js|ts] This is useful if you don't run cypress from the directory that contains your nuxt config file.

to resolve `app/client/nuxt.config.js` from `app/e2e/cypress/plugin.js`
```js
  return cypressNuxt.plugin({
    loadOptions: {
      rootDir: path.join(__dirname, "../../client")
    }
  })
```

### "for"
This option tells nuxt what version of the webpack config you want. Leaving this undefined seems to work fine.

## Write a test
### Javascript

`~/components/Logo.spec.js`
```javascript
import { createWrapper } from "@vue/test-utils";
import mountVue from "cypress-vue-unit-test";
import Logo from "~/components/Logo.vue";

describe("Logo", () => {
  beforeEach(mountVue(Logo));

  it("should initialize", () => {
    cy.wrap(Cypress.vue)
      .should("not.be.undefined")
      .get(".Triangle")
      .should("have.length", 4);

    cy.wrap(createWrapper(Cypress.vue)).should(cmp => cmp.isVueInstance());
  });
});

```

### Typescript Tests (if you have [@nuxt/typescript-build](https://typescript.nuxtjs.org/guide/setup.html) enabled)
Just rename your spec file to `.ts`: `~/components/Logo.spec.ts`



## Test organization
### Component Tests
There's currently a work in progress "component tests" feature. [Pull Request](https://github.com/cypress-io/cypress/pull/5923). This will make organizing E2E vs component tests much more intuitive.

### For now
There are two potential methods, which essentially ignore `**/*/e2e/**/*` (`ignoreTestFiles=**/*/e2e/**/*`) for unit tests, and for e2e ignore anything outside of `**/*/e2e/**/*` (`ignoreTestFiles=!**/*/e2e/**/*`)

##### Directory structure
```
/
  /cypress/
    plugins/
       index.js
    fixtures/
    support/
    e2e/
      testFile.e2e-spec.ts
  /components
    Logo.vue
    Logo.spec.ts
  /pages
    index.vue
  package.json
  cypress.json  
```

### Different config files
You could also use two different cypress [config files](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)


#### `packages.json`
```json
{
  "scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "cy:run:e2e": "cypress run --config-file cypress.e2e.json",
    "cy:run:unit": "cypress run --config-file cypress.unit.json"
  }
}
```
#### `cypress.e2e.json`
```json
{
  "$schema": "https://raw.githubusercontent.com/cypress-io/cypress/develop/cli/schema/cypress.schema.json",
  "integrationFolder": "./cypress/e2e",
  "testFiles": "**/*.*spec.*",
}
```
#### `cypress.unit.json`
```json
{
  "$schema": "https://raw.githubusercontent.com/cypress-io/cypress/develop/cli/schema/cypress.schema.json",
  "integrationFolder": "./components",
  "testFiles": "**/*.*spec.*",
}
```

### Scripts with Ignore patterns

#### `packages.json`
```json
{
  "scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "cy:run:e2e": "cypress run --config ignoreTestFiles=!**/*/e2e/**/*",
    "cy:run:unit": "cypress run -c ignoreTestFiles=**/*/e2e/**/*"
  }
}
```
#### `cypress.json`
```json
{
  "$schema": "https://raw.githubusercontent.com/cypress-io/cypress/develop/cli/schema/cypress.schema.json",
  "integrationFolder": "./",
  "testFiles": "**/*.*spec.*",
}
```
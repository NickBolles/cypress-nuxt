

### With Async/Await

`cypress/plugins/index.js`
```javascript
const cypressNuxt = require("cypress-nuxt");

module.exports = async (on, config) => { // make sure to include "async"!
  on("file:preprocessor", await cypressNuxt.plugin()); // make sure to include "await"!

  // other plugins...
  return config;
};
```

### With Promises

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


# @nuxt/typescript-runtime

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

### With Async/Await
Full example. I like to pull it out to a function so it's easy to `await`
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

### With Promises
`cypress/plugins/index.js`
```javascript
const cypressNuxt = require("cypress-nuxt");

module.exports = function (on, config) {
  return filePreprocessor().then(function (webpackPreProcessor) {
    on("file:preprocessor", webpackPreProcessor);
    // other plugins...
    return config;
  })
  
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








# Note: this is only necessary for `cypress-vue-unit-test`<v2, if you're using a version >v2 then checkout the [readme](./readme.md)


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

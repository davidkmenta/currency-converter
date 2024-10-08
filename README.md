# Awesome ReactJS Currency Converter

This is a test project to demonstrate the abilities of React, TypeScript, tailwindCSS + Styled Components and TenStack Query (formerly React Query).

The app can be accessed on https://davids-currency-converter.netlify.app/.

## How to use it locally
To be able to install and run this app you'll need latest **node** and **NPM**.

```shell
$ npm install
$ npm run start
```

Once the local server starts up, you'll see the URL address(es) where the app can be accessed. In most cases it'll be http://127.0.0.1:8000/.

## Development
You can build the app by running:

```shell
$ npm run build
```

... or for continuous build:

```shell
$ npm run watch
```

At this time both these commands build the app for production environment.

## Q&A
To run unit test suite just run

```shell
$ npm run test:unit
```

... and for the end to end tests run

```shell
$ npm run test:e2e
```

## Known issues & additional information
* Because of the Czech National Bank's API is not accessible outside of the origin (due to badly configured CORS) the app is using a proxy to get the exchange rates.
It's a 3rd party proxy and it may become unavailable anytime.
It'd be better to create a script/lambda that'd download the data, save it and serve it because it can be used as a backup in a case the CNB API becomes unavailable.
* Exchange rates are downloaded every hour even though the exchange rates are updated by the Czech National Bank once a day. This could be optimized.
* The app intentionally uses Czech National Bank old API but it'd be better to use the CNB JSON API: https://api.cnb.cz/cnbapi/swagger-ui.html.

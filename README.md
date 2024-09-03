# Awesome ReactJS Currency Converter

This is a test project to demonstrate the abilities of React, TypeScript, tailwindCSS and TenStack Query (formerly React Query).

The app can be accessed on https://davids-currency-converter.netlify.app/.

## How to use it locally
To be able to install and run this app you'll need latest **node** and **NPM**.

```shell
$ npm install
$ npm run start
```

Once the local server starts up, you'll see the URL address(es) where the app can be accessed. In most cases it'll be http://127.0.0.1:8000/.

## Development
You can build the up by running:

```shell
$ npm run build
```

... or for continuous build:

```shell
$ npm run watch
```

At this time both these commands build the app for production environment.

## Known issues
* Because of the Czech National Bank's API is not accessible outside of the origin (due to badly configured CORS) the app is using a proxy to get the exchange rates. It's a 3rd party proxy and it may become unavailable anytime.
* Exchange rates are downloaded every hour even though the exchange rates are updated by the Czech National Bank once a day. Optimization is coming!
* Tests and static analysis are on the way!

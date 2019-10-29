# @mightyplow/loadable-ssr

This is a helper library to enable server side rendering when using [@loadable/component](https://www.npmjs.com/package/@loadable/component)
for [React](https://www.npmjs.com/package/react) and building with [webpack](https://www.npmjs.com/package/webpack).

This package contains two helpers:
- a loader for transforming dynamic imports into require statements
- a mock for @loadable/component which returns the imported module without being wrapped into a promise

I successfully tested this with [babel-loader](https://www.npmjs.com/package/babel-loader) and 
[ts-loader](https://www.npmjs.com/package/ts-loader).

## Installation
```
npm i @mightyplow/loadable-ssr -D
```

## Configuring webpack
Add these changes in the webpack config for your server application:
```.js
module.exports = {
    ...
    // You probably have externals defined to prevent webpack from building node_modules into
    // your server application. Mostly webpack-node-externals is being used for this. You have
    // to whitelist @loadable/component because otherwise the alias below won't work.
    externals: [
        require('webpack-node-externals')({
            whitelist: [
                '@loadable/component'
            ]
        })
    ],
    ...
    resolve: {
        alias: {
            // replace @loadable/component with the mock
            '@loadable/component': '@mightyplow/loadable-ssr/loadable-mock
        }
    },
    ...
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loaders: [
                    'babel-loader',
                    
                    // should be the last item in order to be executed first
                    '@mightyplow/loadable-ssr/transform-dynamic-import-loader'
                ]
            }
        ]
    }
    ...
}
```


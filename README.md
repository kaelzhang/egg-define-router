[![Build Status](https://travis-ci.org/kaelzhang/egg-define-router.svg?branch=master)](https://travis-ci.org/kaelzhang/egg-define-router)
[![Coverage](https://codecov.io/gh/kaelzhang/egg-define-router/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/egg-define-router)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/egg-define-router?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/egg-define-router)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/egg-define-router.svg)](http://badge.fury.io/js/egg-define-router)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/egg-define-router.svg)](https://www.npmjs.org/package/egg-define-router)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/egg-define-router.svg)](https://david-dm.org/kaelzhang/egg-define-router)
-->

# egg-define-router

Painless router definition for [eggjs](https://eggjs.org).

## Install

```sh
$ npm i egg-define-router
```

## Usage

`egg-define-router` is used to define eggjs routers.

If we have an egg project with the following classic directory structure:

```
egg-project
|-- app
|   |-- router.js
|   |-- controller
|   |   |-- foo.js
|   |-- middleware
|   |   |-- custom
|   |   |   |-- clean.js
|   |-- ...
|-- ...
```

And in router.js:

```js
const defineRouter = require('egg-define-router')
const path = require('path')

module.exports = defineRouter({
  routes: {
    // Equivalent to `'GET /foo/bar': 'foo.bar'`
    // -> app.router.get('/foo/bar', app.controller.foo.bar)
    '/foo/bar': 'foo.bar',
    'POST /foo/bar': 'foo.bar',
    'PUT /foo/baz': ['clean', 'foo.baz']
  },
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})
```

#### Config a basic router of GET method

If we have the following `routes` definition:

```js
routes: {
  // If there is no method specified,
  // the method type defaults to `GET`
  '/foo/bar': 'foo.bar',
  'POST /foo/bar': 'foo.bar'
}
```

which is equivalent to:

```js
app.router.get('/foo/bar', app.controller.foo.bar)
app.router.post('/foo/bar', app.controller.foo.bar)
```

#### With custom middlewares

```js
routes: {
  'PUT /foo/baz': [
    // `clean` is the middleware name
    'clean',
    'foo.baz'
  ]
}
```

Which is equivalent to:

```js
app.router.put(
  '/foo/baz',
  require(`${middlewareRoot}/clean`),
  app.controller.foo.baz
)
```

#### Middleware

## defineRouter({routes, middlewareRoot})
## defineRouter({routes, middlewareRoot}, factory)

- **routes** `Routes`
- **middlewareRoot** `path` The search path for middleware name.
- **factory** `?Function(app, applyRoutes)` helps to determine when and where to apply the routes. It is usefull to do extra things more than `routes`
  - **applyRoutes** `Function(app)`

Creates the router function which accept one argument `app`.

The default `factory` is equivalent to:

```js
(app, applyRoutes) => {
  // You can do something ahead of `applyRoutes(app)`
  applyRoutes(app)
  // Then do something else
}
```

### `routes`

The complete definition of `routes` lists below.

```ts
type KoaFunc = (ctx: KoaContext, next?: KoaNext) => any
type ControllerName = string
type MiddlewareName = string

type Controller = ControllerName | KoaFunc
type Middleware = MiddlewareName | KoaFunc

type RouteDefinition = Controller
  | [...Array<Middleware>, Controller]

interface Routes {
  [methodAndPathname: string]: RouteDefinition
}
```

Here is an example for better understanding:

```js
routes: {
  'pathname': controllerFunction,
  'METHOD pathname': 'controllerName',
  'GET pathname': [
    'middlewarename',
    middlewareFunction,
    ...,
    'controllerName'
  ],
  'DELETE pathname': [
    'middlewarename',
    middlewareFunction,
    ...,
    controllerFunction
  ],
}
```

## License

MIT

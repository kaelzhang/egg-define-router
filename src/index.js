const path = require('path')
const access = require('object-access')
const forEach = require('lodash.foreach')

const error = require('./error')

const getController = (eggController, name) => {
  if (typeof name === 'function') {
    return name
  }

  const controller = access(eggController, name)
  if (!controller) {
    throw error('CONTROLLER_NOT_FOUND', name)
  }

  return controller
}

const DELIMITER_MIDDLEWARE_PATH = '/'

const getMiddleware = (name, root) => {
  if (typeof name === 'function') {
    return name
  }

  const filepath = path.join(root, ...name.split(DELIMITER_MIDDLEWARE_PATH))

  try {
    return require(filepath)
  } catch (err) {
    throw error('MIDDLEWARE_NOT_FOUND', name, err)
  }
}

module.exports = ({
  routes,
  middlewareRoot
} = {}, fn) => {
  if (typeof middlewareRoot !== 'string') {
    throw error('INVALID_MIDDLEWARE_ROOT')
  }

  if (Object(routes) !== routes) {
    throw error('INVALID_ROUTES')
  }

  const apply = ({
    router,
    controller: eggController
  }) => {
    const getMW = name => getMiddleware(name, middlewareRoot)

    forEach(routes, (
      route,
      // 'DELETE /foo'
      // 'GET /foo'
      // '/foo'
      key
    ) => {
      const splitted = key.split(/\s+/)
      const [method, p] = splitted.length === 1
        ? ['GET', key]
        : splitted

      if (typeof route === 'string') {
        route = {controller: route}
      } else if (Array.isArray(route)) {
        const sliced = route.slice()
        const controller = sliced.pop()
        const middlewares = sliced
        route = {
          middlewares,
          controller
        }
      }

      const {
        middlewares = [],
        controller
      } = route

      router[method.toLowerCase()](
        p,
        ...middlewares.map(getMW),
        getController(eggController, controller)
      )
    })
  }

  return app => {
    if (typeof fn !== 'function') {
      apply(app)
      return
    }

    fn(app, apply)
  }
}

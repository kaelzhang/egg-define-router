const path = require('path')
const access = require('object-access')
const {isArray, isFunction, isString} = require('core-util-is')

const error = require('./error')

const getController = (eggController, name) => {
  if (isFunction(name)) {
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
  if (isFunction(name)) {
    return name
  }

  if (!isString(root)) {
    throw error('INVALID_MIDDLEWARE_ROOT', root)
  }

  const filepath = path.join(root, ...name.split(DELIMITER_MIDDLEWARE_PATH))

  try {
    return require(filepath)
  } catch (err) {
    throw error('MIDDLEWARE_NOT_FOUND', name, err)
  }
}

module.exports = (routes = {}, {
  middlewareRoot
} = {}) => {
  if (Object(routes) !== routes) {
    throw error('INVALID_ROUTES', routes)
  }

  return ({
    router,
    controller: eggController
  }) => {
    const getMW = name => getMiddleware(name, middlewareRoot)

    for (const [
      // 'DELETE /foo'
      // 'GET /foo'
      // '/foo'
      key,
      route
    ] of Object.entries(routes)) {
      const splitted = key.split(/\s+/)
      const [method, p] = splitted.length === 1
        ? ['GET', key]
        : splitted

      let r

      if (isString(route) || isFunction(route)) {
        r = {controller: route}
      } else if (isArray(route)) {
        const sliced = route.slice()
        const controller = sliced.pop()
        const middlewares = sliced
        r = {
          middlewares,
          controller
        }
      } else {
        throw error('INVALID_ROUTE', route)
      }

      const {
        middlewares = [],
        controller
      } = r

      router[method.toLowerCase()](
        p,
        ...middlewares.map(getMW),
        getController(eggController, controller)
      )
    }
  }
}

const util = require('util')
const {Errors} = require('err-object')

const {E, TE, error} = new Errors()

TE('INVALID_MIDDLEWARE_ROOT', 'middlewareRoot must be a path string')

TE('INVALID_ROUTES', 'routes must be an object')

TE('INVALID_ROUTE', 'route must be one of function, string or array')

E('CONTROLLER_NOT_FOUND', 'controller "%s" not found')

E('MIDDLEWARE_NOT_FOUND', {
  message: 'middleware "%s" not found or errored. reason: %s'
}, ({
  code,
  preset: {
    message
  },
  args: [name, err]
}) => {
  err.code = code
  err.message = util.format(message, name, err.message)

  return err
})

module.exports = error

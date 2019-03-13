const util = require('util')
const {Errors} = require('err-object')

const {E, error} = new Errors()

E('INVALID_MIDDLEWARE_ROOT', {
  ctor: TypeError,
  message: 'middlewareRoot must be a path string'
})

E('INVALID_ROUTES', {
  ctor: TypeError,
  message: 'routes must be an object'
})

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

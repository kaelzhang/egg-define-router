const path = require('path')

const defineRouter = require('../../../..')

module.exports = defineRouter({
  routes: {
    'GET /foo': 'foo.baz'
  },
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})

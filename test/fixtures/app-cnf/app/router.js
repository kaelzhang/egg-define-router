const path = require('path')

const defineRouter = require('../../../..')

module.exports = defineRouter({
  'GET /foo': 'foo.baz'
}, {
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})

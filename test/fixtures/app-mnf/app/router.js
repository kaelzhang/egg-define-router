const path = require('path')

const defineRouter = require('../../../..')

module.exports = defineRouter({
  'GET /foo': ['not-exists', 'foo.bar']
}, {
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})

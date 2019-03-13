const path = require('path')

const defineRouter = require('../../../..')
const wrapBody = require('./middleware/custom/wrap-body')

module.exports = defineRouter({
  routes: {
    'GET /foo': 'foo.foo',
    '/bar': 'foo.bar',
    'POST /baz': ['wrap-body', 'foo.bar'],
    'PUT /baz2': [wrapBody, 'foo.bar'],
    'GET /baz3': [
      wrapBody,
      function wrapBodyInline (ctx) {
        ctx.body = 'bar'
      }
    ]
  },
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})

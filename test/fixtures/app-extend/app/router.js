const path = require('path')

const defineRouter = require('../../../..')
const wrapBody = require('./middleware/custom/wrap-body')

const apply = defineRouter({
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
}, {
  middlewareRoot: path.join(__dirname, 'middleware', 'custom')
})

module.exports = app => {
  app.router.get('/quux', ctx => {
    ctx.body = 'quux'
  })

  apply(app)

  app.router.use(ctx => {
    if (!ctx.body) {
      ctx.body = 'not 404'
    }
  })
}

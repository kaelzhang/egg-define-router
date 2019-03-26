const test = require('ava')
const defineRouter = require('..')

const NOOP = () => {}
const createMockEggApp = () => ({
  controller: {
    foo: {
      bar: NOOP
    }
  },
  router: {
    get: NOOP
  }
})

test('invalid middleware root', t => {
  const app = createMockEggApp()
  t.throws(() => {
    defineRouter({
      'GET /bar': ['middleware', 'foo.bar']
    }, {
      middlewareRoot: undefined
    })(app)
  }, 'middlewareRoot must be a path string')
})


test('invalid routes', t => {
  const app = createMockEggApp()
  t.throws(() => {
    defineRouter('abc', {
      middlewareRoot: '/path/to'
    })(app)
  }, 'routes must be an object')
})

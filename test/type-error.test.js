const test = require('ava')
const defineRouter = require('..')

test('invalid middleware root', async t => {
  t.throws(() => {
    defineRouter({
      routes: {},
      middlewareRoot: undefined
    })
  }, 'middlewareRoot must be a path string')
})


test('invalid routes', async t => {
  t.throws(() => {
    defineRouter({
      routes: 'abc',
      middlewareRoot: '/path/to'
    })
  }, 'routes must be an object')
})

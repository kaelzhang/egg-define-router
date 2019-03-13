const test = require('ava')
// const log = require('util').debuglog('egg-define-router')
const mm = require('egg-mock')
const request = require('supertest')

const CASES = [
  ['get', '/foo', 200, 'foo'],
  ['get', '/bar', 200, 'bar'],
  ['post', '/baz', 200, {
    code: 200,
    body: 'bar'
  }],
  ['put', '/baz2', 200, {
    code: 200,
    body: 'bar'
  }],
  ['get', '/baz3', 200, {
    code: 200,
    body: 'bar'
  }],
]

let app

test.before(async () => {
  app = mm.app({
    baseDir: 'app'
  })

  await app.ready()
})

test.after(() => app.close())
test.afterEach(mm.restore)

CASES.forEach(([method, pathname, code, body]) => {
  test(`${method} ${pathname}`, async t => {
    await request(app.callback())[method](pathname)
    .expect(code)
    .expect(body)

    t.pass()
  })
})

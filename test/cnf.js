// Controller not found

const test = require('ava')
// const log = require('util').debuglog('egg-define-router')
const mm = require('egg-mock')

test('controller not found', async t => {
  await t.throwsAsync(async () => {
    const app = mm.app({
      baseDir: 'app-cnf'
    })

    await app.ready()
  }, 'controller "foo.baz" not found')
})

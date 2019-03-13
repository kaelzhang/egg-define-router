// Middleware not found

const test = require('ava')
// const log = require('util').debuglog('egg-define-router')
const mm = require('egg-mock')

test('controller not found', async t => {
  await t.throwsAsync(async () => {
    const app = mm.app({
      baseDir: 'app-mnf'
    })

    await app.ready()
  }, /^middleware "not-exists" not found or errored. reason: Cannot find module/)
})

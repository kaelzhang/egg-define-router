const {Controller} = require('egg')

module.exports = class FooController extends Controller {
  foo () {
    this.ctx.body = 'foo'
  }

  bar () {
    this.ctx.body = 'bar'
  }
}

module.exports = async function wrapBody (ctx, next) {
  await next()
  const {body} = ctx
  ctx.body = {
    code: 200,
    body
  }
}

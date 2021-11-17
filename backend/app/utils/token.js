const getToken = ctx => ctx.headers.authorization
const getTokenData = ctx => ctx.app.jwt.decode(getToken(ctx).slice(7))

exports.getToken = getToken
exports.getTokenData = getTokenData
exports.isTokenExpires = ctx => ctx.app.jwt.verify(getToken(ctx).slice(7), ctx.app.config.jwt.secret)

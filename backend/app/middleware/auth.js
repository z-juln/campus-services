"use strict";

const { createResponseData } = require("../utils");

const isPassAuth = path => ![
  "/login",
].includes(path)

module.exports = options => {
  return async function auth(ctx, next) {
    // if (!isPassAuth(ctx.path)) {
    //   ctx.res.statusCode = 401
    //   ctx.body = createResponseData({
    //     success: true,
    //     data: {},
    //     msg: ''
    //   })
    // } else {
    //   await next();
    // }
    await next();
  }
}

'use strict';

const Controller = require('egg').Controller;

const { createResponseData } = require('../utils/responseData')

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.query
    const userInfo = await ctx.service.user.find(username, password)
    if(userInfo?.id) {
      const token = app.jwt.sign({
        username,
        password,
      }, app.config.jwt.secret);
      ctx.body = createResponseData({
        success: true,
        data: {
          uid: userInfo.uid,
          name: username,
          token,
          roles: userInfo.roles.split[',']
        },
        msg: ''
      })
    } else {
      ctx.status = 401
    }
  }

  async register() {}

  async logout() {}
}

module.exports = UserController;

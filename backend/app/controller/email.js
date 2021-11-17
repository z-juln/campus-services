'use strict';

const Controller = require('egg').Controller;
const { createResponseData } = require('../utils')

class EmailController extends Controller {
  // TODO
  async send() {
    const { ctx, app } = this
    const { service, cookies } = ctx
    const { config, jwt } = app
    const { email, content } = ctx.request.body

    ctx.body = createResponseData({
      msg: '发布成功'
    })
  }

  // TODO
  async sendCaptcha() {
    const { ctx } = this;
    ctx.redirect('/public/index.html')
  }
}

module.exports = EmailController;

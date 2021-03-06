'use strict';

const Controller = require('egg').Controller;
const { createResponseData, lackDataResponse, getTokenData, createCaptha } = require('../utils')

class EmailController extends Controller {
  async send() {
    const { ctx } = this
    const { service } = ctx
    const { email: to, content } = ctx.request.body
    if(!to || !content) {
      ctx.body = lackDataResponse
      return
    }
    const { user } = getTokenData(ctx)
    if(!user.email) {
      ctx.status = 500
      return
    }
    const from = user.email
    try {
      service.email.send(from, to, content)
    } catch (error) {
      ctx.status = 500
      return
    }
    ctx.body = createResponseData({
      msg: '发布成功'
    })
  }

  async sendCaptcha() {
    const { ctx } = this
    const { service } = ctx
    const { email } = ctx.request.body
    if(!email) {
      ctx.body = lackDataResponse
      return
    }
    try {
      const capctha = createCaptha()
      ctx.session = {
        ...ctx.session,
        capctha
      }
      service.email.sendCaptcha(email, capctha)
    } catch (error) {
      ctx.status = 500
      return
    }
    ctx.body = createResponseData({
      msg: '验证码已发送'
    })
  }
}

module.exports = EmailController;

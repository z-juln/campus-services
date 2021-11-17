'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const {
  createResponseData,
  lackDataResponse,
  getToken,
  getTokenData,
  getHashFilename,
  saveFile,
} = require('../utils')

const DEFAULT_IMAGE = '/images/logo.png'

class UserController extends Controller {
  async login() {
    const { ctx, app } = this
    const { service, cookies } = ctx
    const { config, jwt } = app
    const { email, password, captcha } = ctx.request.body
    // 密码登录
    if(email && password) {
      const user = await service.user.findWithPwd(email, password)
      if(user) {
        const token = "Bearer " + jwt.sign(
          { user },
          config.jwt.secret
        )
        ctx.body = createResponseData({
          data: {
            ...user,
            token,
          },
          msg: "登录成功"
        })
        return
      }
      ctx.body = createResponseData({
        success: false,
        msg: "邮箱错误或密码错误"
      })
      return
    }
    // 验证码登录
    else if(email && captcha) {
      const validEmial = cookies.get('email') === email
      const validCaptcha = cookies.get('captcha') === captcha
      if(validEmial && validCaptcha) {
        const user = await service.user.find(email)
        const token = "Bearer " + jwt.sign(
          { user },
          config.jwt.secret
        )
        ctx.body = createResponseData({
          data: {
            ...user,
            token,
          },
          msg: "登录成功"
        })
        return
      }
      let errMsg = ''
      if(!validEmial) errMsg = '邮箱错误'
      if(!validCaptcha) errMsg = '验证码错误'
      ctx.body = createResponseData({
        success: false,
        msg: errMsg
      })
      return
    }
    ctx.body = lackDataResponse
    return
  }

  async register() {
    const { ctx, app } = this
    const { service, cookies } = ctx
    const { config, jwt } = app
    const { email, password, captcha } = ctx.request.body
    if(email && password && captcha) {
      const user = await service.user.find(email)
      const validCaptcha = cookies.get('captcha') === captcha
      // 注册成功
      if(!user && validCaptcha) {
        const ok = await service.user.add({
          email,
          password,
          avatar: DEFAULT_IMAGE
        })
        if(!ok) {
          ctx.status = 500
          return
        }
        const token = "Bearer " + jwt.sign(
          { user },
          config.jwt.secret
        )
        ctx.body = createResponseData({
          data: {
            ...user,
            token,
          },
          msg: "登录成功"
        })
        return
      }
      // 邮箱已注册
      else if(user) {
        ctx.body = createResponseData({
          success: false,
          msg: "邮箱已注册, 请直接登录"
        })
        return
      }
      ctx.body = createResponseData({
        success: false,
        msg: "验证码错误"
      })
      return 
    }
    // 字段缺失
    ctx.body = lackDataResponse
    return
  }

  // async logout() {}

  async updatePassword() {
    const { ctx } = this
    const { service } = ctx
    const { password } = ctx.request.body
    const { user } = getTokenData(ctx)
    if(!password) {
      ctx.body = lackDataResponse
      return
    }
    const ok = service.user.update(user.email, 'password', password)
    if(!ok) {
      ctx.status = 500
      return
    }
    ctx.body = createResponseData({
      msg: '修改成功'
    })
    return
  }

  async updateAvatar() {
    const { ctx, app } = this
    const { service } = ctx
    const { config } = app

    const stream = await ctx.getFileStream()
    const filename = getHashFilename(stream.filename)
    const realFilename = path.join(config.assetsPath, filename)
    const writeStream = fs.createWriteStream(realFilename)
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream)
      ctx.status = 500
      return
    }

    const { user } = getTokenData(ctx)
    if(!user.email) {
      console.log('user.email is null')
      ctx.status = 500
      return
    }
    const ok = service.user.update(user.email, 'avatar', `/images/${filename}`)
    if(!ok) {
      ctx.status = 500
      return
    }
    ctx.body = createResponseData({
      msg: '修改成功'
    })
    return
  }
}

module.exports = UserController;

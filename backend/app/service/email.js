'use strict'

const { Service } = require('egg')
const { sendEmail } = require('../utils')

class EmailService extends Service {
  async send(from, to, content) {
    const mailInfo = {
      from: '"校园服务" <1850021148@qq.com>',
      to,
      subject: `校园服务 来自用户<${from}>的信息`,
      html: `
        <strong>校园服务: 来自用户<${from}>的信息</strong>
        <section>${content}</section>
      `,
    }
    let res
    try {
      res = await sendEmail(mailInfo)
    } catch (error) {
      console.log('error from email send: ', error)
      throw error
    }
    return res
  }

  
  async sendCaptcha(email, captcha) {
    const mailInfo = {
      from: '"校园服务" <1850021148@qq.com>',
      to: email,
      subject: `校园服务 验证码`,
      html: `
        <span>校园服务 验证码:</span>
        <strong><code>${captcha}</code></strong>
      `,
    }
    let res
    try {
      res = await sendEmail(mailInfo)
    } catch (error) {
      console.log('error from email send: ', error)
      res = error
    }
    return res
  }
}

module.exports = EmailService

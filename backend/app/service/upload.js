'use strict'

const { Service } = require('egg')
const fs = require('fs')
const path = require('path')
const pump = require('mz-modules/pump')

class UploadService extends Service {
  async uploadImg(filename) {
    // 添加用户信息
    const { ctx } = this
    const parts = ctx.multipart({ autoFields: true })
    const urls = []
    let stream
    while ((stream = await parts()) != null) {
      const target = path.join(this.config.assetsPath, 'app/public/temporary', filename)
      urls.push(`/public/temporary/${filename}`)
      const writeStream = fs.createWriteStream(target)
      await pump(stream, writeStream)
    }
    // console.log(urls)
    return urls
  }
}

module.exports = UploadService

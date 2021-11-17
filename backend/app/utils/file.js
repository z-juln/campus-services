const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

const getHashFilename = param => {
  const filename = param?.filename || param
  const ext = path.extname(filename).toLocaleLowerCase()
  const name = filename.replace(`.${ext}`, '')
  const hash = Date.now()
  return `${name}__${hash}.${ext}`
}

const saveFile = async (ctx, realFilePath) => {
  const stream = await ctx.getFileStream()
  const writeStream = fs.createWriteStream(realFilePath)
  try {
    await awaitWriteStream(stream.pipe(writeStream))
  } catch (error) {
    await sendToWormhole(stream)
    throw error
  }
}

exports.getHashFilename = getHashFilename
exports.saveFile = saveFile

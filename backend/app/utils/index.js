"use strcit";

const { createResponseData, lackDataResponse } = require("./responseData")
const { getToken, getTokenData } = require("./token")
const { getHashFilename, saveFile } = require('./file')
const { sendEmail } = require('./email')
const { createCaptha } = require('./capctha')
const { parseTimeTable } = require('./timeTable')

module.exports = {
  createResponseData,
  lackDataResponse,
  getToken,
  getTokenData,
  getHashFilename,
  saveFile,
  sendEmail,
  createCaptha,
  parseTimeTable,
}

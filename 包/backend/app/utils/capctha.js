const crypto = require('crypto')

const createCaptha = (len = 6) => {
  const content = String(Date.now())
  const hash = crypto.createHash('md5').update(content).digest("hex")
  return hash.slice(0, len)
}

module.exports.createCaptha = createCaptha

const test = () => {
  console.log('capctha from test: ', createCaptha())
}
// test()

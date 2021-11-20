const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: "1850021148@qq.com",
    pass: "pqmcnkovwfnoddic"
  }
})

const sendEmail = async mailInfo => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailInfo, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve('Message sent : ' + info.response);
      }
    });
  })
}

module.exports.sendEmail = sendEmail

const test = async () => {
  const email = '1850021148@qq.com'
  const content = 'test from 校园服务后端'
  const mailInfo = {
    from: '"校园服务" <1850021148@qq.com>',
    to: email,
    subject: `校园服务 来自用户<${email}>的信息`,
    html: `
      <strong>校园服务: 来自用户<${email}>的信息</strong>
      <section>${content}</section>
    `,
  }
  let res
  try {
    res = await sendEmail(mailInfo)
  } catch (error) {
    console.log('error from email send: ', error)
    res = error
  }
  console.log('res: ', res)
}
// test()

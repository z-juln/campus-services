/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636859864077_5942';

  config.jwt = {
    secret: "campus-services",
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'campus-services',
    },
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
//   config.cors = {
//     origin: '*',
//     allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
//   };

  // file
  // config.fileLimit = ''
  config.assetsPath = 'app/public/uploads/'

  config.multipart = {
    mode: 'stream',
    // 允许上传的图片格式
    whitelist: ['.png', '.jpg', '.jpeg'],
    // fileSize: '50mb',
    // defaultCharset: "utf-8",
    // fileExtensions: [
    //   '.xlsx',
    //   '.png',
    //   '.jpg',
    //   '.jpeg',
    //   '.svg',
    //   '.gif',
    // ],
  }

  // add your middleware config here
  config.middleware = [
    'auth',
  ];

  config.security = {
    csrf: {
      enable: false,
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

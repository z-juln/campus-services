'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.all('/', controller.home.index);

  // user
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  // router.all('/logout', jwt, controller.user.logout);
  router.post('/user/password/update', jwt, controller.user.updatePassword);
  router.post('/user/avatar/update', jwt, controller.user.updateAvatar); // formdata

  // email
  router.post('/email/send', jwt, controller.email.send);
  router.post('/email/send-captcha', controller.email.sendCaptcha);

  // auth
  router.all('/manager', jwt, controller.user.login);
};

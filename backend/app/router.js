'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.get('/', controller.home.index);

  // user
  router.all('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.all('/logout', controller.user.logout);

  // auth
  router.all('/manager', jwt, controller.user.login);
};

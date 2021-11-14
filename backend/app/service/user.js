'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(name, password) {
    const user = await this.app.mysql.query('select * from users', '');
    return { user };
  }
}

module.exports = UserService;

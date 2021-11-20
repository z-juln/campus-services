'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(email) {
    const users = await this.app.mysql.query(
      'select * from users where email = ?',
      [email]
    );
    const user = users[0]
    if(user) {
      return {
        email: user.email,
        avatar: user.avatar
      }
    }
    return null
  }

  async findWithPwd(email, password) {
    const users = await this.app.mysql.query(
      'select * from users where email = ? and password = ?',
      [email, password]
    );
    const user = users[0]
    if(user) {
      return {
        email: user.email,
        avatar: user.avatar
      }
    }
    return null
  }
  
  async add({ email, password, avatar }) {
    const res = await this.app.mysql.query(
      'insert into users (email, password, avatar) VALUES(?, ?, ?)',
      [email, password, avatar]
    )
    return !!res.affectedRows
  }

  async update(
    email,
    /** type = 'avatar' | 'password' */
    type,
    value,
  ) {
    if(type === 'avatar') {
      const avatar = value
      const res = await this.app.mysql.query('update users set avatar = ? where email = ?', [avatar, email])
      return !!res.affectedRows
    } else if(type === 'password') {
      const password = value
      const res = await this.app.mysql.query('update users set password = ? where email = ?', [password, email])
      return !!res.affectedRows
    }
    return false
  }
}

module.exports = UserService;

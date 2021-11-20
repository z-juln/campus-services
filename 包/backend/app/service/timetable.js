'use strict'

const { Service } = require('egg')

class TimeTableService extends Service {
  async add(formData) {
    const res = await this.app.mysql.insert('courses', formData)
    return !!res.affectedRows
  }
  
  async findAll() {
    const courses = await this.app.mysql.query('select * from courses')
    return courses
  }
}

module.exports = TimeTableService

'use strict';

const Controller = require('egg').Controller;
const { createResponseData, lackDataResponse, getTokenData, createCaptha, parseTimeTable } = require('../utils')

class TimeTableController extends Controller {
  async add() {
    const { ctx } = this
    const { service } = ctx
    const formData = ctx.request.body
    try {
      const {
        name,
        teacher,
        weeks,
        place,
        section,
        day,
      } = formData
      if(!name || !teacher || !weeks || !place || !section || !day) {
        throw new Error('字段缺失')
      }
      // 数据转换
      ['weeks', 'section'].forEach(key => {
        if(Array.isArray(formData[key])) {
          formData[key] = formData[key].join(',')
        } else {
          throw new Error('weeks,sections字段不匹配')
        }
      })
    } catch (error) {
      console.log('error: ', error)
      ctx.body = lackDataResponse
      return
    }
    const ok = await service.timetable.add(formData)
    if(!ok) {
      ctx.body = lackDataResponse
      return
    }
    ctx.body = createResponseData({
      msg: '上传成功'
    })
  }

  async findAll() {
    const { ctx } = this
    const { service } = ctx
    
    const courses = await service.timetable.findAll()
    try {
      const timeTable = parseTimeTable(courses)
      ctx.body = timeTable
      return
    } catch (error) {
      console.log('error from controller.timetable.findall: ', error)
      ctx.status = 500
    }
  }
}

module.exports = TimeTableController;

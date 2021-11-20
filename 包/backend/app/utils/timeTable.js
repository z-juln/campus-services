const parseTimeTable = courses => {
  // 初步处理,字符串转数组
  courses.forEach(course => {
    ['weeks', 'section'].forEach(key => {
      course[key] = course[key].split(',')
    })
  })
  /* 转成前端需要的格式
    当前数据
    [
      {
        "id": 1,
        "name": "物理",
        "teacher": "x先生",
        "weeks": [
            "1",
            "3",
            "5"
        ],
        "place": "x教室",
        "section": [
            "1",
            "2"
        ],
        "day": 1,
        "startDate": "2021-08-30",
        "endDate": "2021-11-18",
      }
    ]
    前端数据
    {
      startDate: '2021-08-30',
      endDate: '2022-01-16',
      courses: [
        {
          id: 1,
          course: '高等数学',
          teacher: '李明',
          place: '教2-101',
          weeks: [2, 18], //周区间
          day: 1, //周几
          section: [1, 2],
          type: 0, // type:0双周 type:1单周 type:2 单双周都上
        },
      ]
    }
  */
  if(!courses.length) return []
  const timeTable = {}
  // 设计有问题
  timeTable.startDate = courses[0].startDate
  timeTable.endDate = courses[0].endDate
  timeTable.courses = courses
  delete courses.startDate
  delete courses.endDate
  return timeTable
}

module.exports.parseTimeTable = parseTimeTable

import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)
dayjs.getWeek = function (start, now) {
	return dayjs(now, 'YYYY-MM-DD').week() - dayjs(start, 'YYYY-MM-DD').week() + 1
}
dayjs.getDates = function () {
    const dates = []
    for (let i = 1; i <= 7; i++) {
        dates[i-1] = dayjs().day(i).format('MM/DD')
    } 
    return dates
}
export default dayjs

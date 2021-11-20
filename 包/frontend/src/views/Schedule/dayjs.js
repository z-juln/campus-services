import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(weekOfYear)
dayjs.extend(relativeTime)
dayjs.getWeek = function (start, now) {
	return dayjs(now, 'YYYY-MM-DD').week() - dayjs(start, 'YYYY-MM-DD').week() + 1
}
dayjs.getDates = function (currentWeek, setWeek) {
	const dates = []
	setWeek = setWeek || currentWeek
	const differ = setWeek - currentWeek
	for (let i = 1; i <= 7; i++) {
		if (differ >= 0) {
			dates[i - 1] = dayjs().add(differ, 'week').day(i).format('MM/DD')
		} else {
			dates[i - 1] = dayjs().subtract(-differ, 'week').day(i).format('MM/DD')
		}
	}
	return dates
}
export default dayjs

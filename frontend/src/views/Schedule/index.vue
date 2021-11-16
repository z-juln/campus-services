<template>
	<div id="schedule">
		<div class="schedule_title">
			<span> 第{{ week }}周</span>
		</div>
		<div class="schedule_container">
			<div class="schedule_sections">
				<div class="schedule_setting">
					<van-icon name="setting-o" size="4vh" />
				</div>
				<div v-for="i in 12" :key="i">{{ i }}</div>
			</div>

			<div class="schedule_days">
				<div v-for="i in 7" :key="i">
					<div>
						{{ days[i - 1] }}
					</div>
					<div>
						{{ dates[i - 1] }}
					</div>
				</div>
			</div>
			<Course
				v-for="i in filterCourse"
				:key="i.id"
				:day="i.day"
				:course="i.course"
				:teacher="i.teacher"
				:place="i.place"
				:section="i.section"
				:type="i.type"
				:week="week"
			>
			</Course>
		</div>
	</div>
</template>

<script>
import dayjs from './dayjs'
import Course from './Course'
export default {
	name: 'Schedule',
	components: { Course },
	data() {
		return {
			days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
				{
					id: 2,
					course: '计算机组成原理',
					teacher: '王军',
					place: '教3-203',
					weeks: [1, 18],
					day: 2,
					section: [6, 7],
					type: 1,
				},
				{
					id: 3,
					course: 'xxx',
					teacher: 'xx',
					place: 'yyyyyy',
					weeks: [1, 18],
					day: 3,
					section: [10, 11],
					type: 2,
				},
			],
		}
	},
	computed: {
		filterCourse() {
			return this.courses.filter((item) => {
				if (this.week >= item.weeks[0] && this.week <= item.weeks[1]) {
					return true
				} else {
					return false
				}
			})
		},
		currentDate() {
			return dayjs().format('YYYY-MM-DD')
		},
		week() {
			return dayjs.getWeek(this.startDate, this.currentDate)
		},
		dates() {
			return dayjs.getDates()
		},
	},
	mounted() {
		console.log(this.dates)
	},
}
</script>

<style scoped>
/* block width:13.14vw height:6.77vh */
/* 字体单位后面改为rem */
.schedule_title {
	height: 4vh;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.schedule_container {
	position: relative;
	display: flex;
	overflow: scroll;
	height: 88vh;
}
.schedule_days {
	width: 92vw;
	height: 6.77vh;
	display: flex;
}
.schedule_days > div {
	width: 13.14vw;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	flex-wrap: wrap;
}
.schedule_days > div > div {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 13.14vw;
}
.schedule_sections {
	width: 8vw;
}
.schedule_sections > div {
	height: 6.77vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
}
</style>

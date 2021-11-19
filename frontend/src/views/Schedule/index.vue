<template>
	<div id="schedule">
		<div class="schedule_title">
			<span> 第{{ week }}周</span>
		</div>

		<transition name="option">
			<Option v-if="showSetting" :week="week" :setWeek="setWeek"></Option>
		</transition>

		<!-- 分割线 -->
		<div class="schedule_divider" ref="divider">
			<van-divider
				v-for="i in 12"
				:style="{
					borderColor: '#b4b4b4',
					height: '6.77vh',
					margin: '0 2vw 0 0',
				}"
				:key="i"
				dashed
			>
			</van-divider>
		</div>

		<div class="schedule_container">
			<div class="schedule_sections">
				<div>
					<van-icon name="setting-o" size="4vh" @click="settingClick" />
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
				:weeks="i.weeks"
				:color="i.color"
				:week="week"
			>
			</Course>
		</div>
		<Detail></Detail>
	</div>
</template>

<script>
import dayjs from './dayjs'
import axios from 'axios'
import Course from './Course'
import Option from './Option'
import Detail from './Detail'
export default {
	name: 'Schedule',
	components: { Course, Option, Detail },
	data() {
		return {
			showSetting: false,
			showDetail: false,
			week: 0,
			days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			startDate: '2021-08-30',
			endDate: '2022-01-16',
			courses: [
			// 	{
			// 		id: 1,
			// 		course: '高等数学',
			// 		teacher: '李明',
			// 		place: '教2-101',
			// 		weeks: [2, 18], //周区间
			// 		day: 1, //周几
			// 		section: [1, 2],
			// 		type: 0, // type:0双周 type:1单周 type:2 单双周都上
			// 	},
			// 	{
			// 		id: 2,
			// 		course: '计算机组成原理',
			// 		teacher: '王军',
			// 		place: '教3-203',
			// 		weeks: [1, 18],
			// 		day: 2,
			// 		section: [6, 7],
			// 		type: 1,
			// 	},
			// 	{
			// 		id: 3,
			// 		course: 'xxx',
			// 		teacher: 'xx',
			// 		place: 'yyyyyy',
			// 		weeks: [1, 18],
			// 		day: 3,
			// 		section: [10, 11],
			// 		type: 2,
			// 	},
			// 	{
			// 		id: 4,
			// 		course:
			// 			'信息论与编码信息论与编码信息论与编码信息论与编码信息论与编码',
			// 		teacher: '李明',
			// 		place: '教3-305',
			// 		weeks: [2, 18], //周区间
			// 		day: 2, //周几
			// 		section: [1, 2],
			// 		type: 2, // type:0双周 type:1单周 type:2 单双周都上
			// 	},
			// 	{
			// 		id: 5,
			// 		course: '有有有有有有有有有有有有有有有',
			// 		teacher: '李明',
			// 		place: '教3-305',
			// 		weeks: [2, 18], //周区间
			// 		day: 3, //周几
			// 		section: [4, 5],
			// 		type: 2, // type:0双周 type:1单周 type:2 单双周都上
			// 	},
			],
		}
	},
	methods: {
		settingClick() {
			this.showSetting = !this.showSetting
			if (this.showSetting) {
				this.$refs.divider.style.top = '17.5vh'
			} else {
				this.$refs.divider.style.top = '7.5vh'
			}
		},
		setWeek(val) {
			this.week = val
		},
		getCourseData() {
			axios
				.get(
					'https://mock.mengxuegu.com/mock/61971115d6a32821656502c5/timetable/findall'
				)
				.then((res) => {
					const data = res.data
					this.startDate = data.startDate
					this.endDate = data.endDate
					this.courses = data.courses
				})
		},
	},
	computed: {
		filterCourse() {
			let filter = this.courses.filter((item) => {
				if (this.week >= item.weeks[0] && this.week <= item.weeks[1]) {
					return true
				} else {
					return false
				}
			})
			return filter
		},
		currentDate() {
			return dayjs().format('YYYY-MM-DD')
		},
		dates() {
			return dayjs.getDates(
				dayjs.getWeek(this.startDate, this.currentDate),
				this.week
			)
		},
	},
	mounted() {
		this.week = dayjs.getWeek(this.startDate, this.currentDate)
		this.getCourseData()
	},
}
</script>

<style scoped>
/* block width:13.14vw height:6.77vh */
/* 字体单位后面改为rem */
.schedule_title {
	height: 4vh;
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.schedule_divider {
	position: absolute;
	width: 92vw;
	top: 7.5vh;
	left: 8vw;
}
.schedule_container {
	position: relative;
	display: flex;
	height: 96vh;
}
.schedule_days {
	width: 92vw;
	height: 6.77vh;
	display: flex;
	color: #353535;
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
	color: #8b8b8b;
}
.schedule_sections > div {
	height: 6.77vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
}
.schedule_sections > div:nth-child(1) {
	padding-left: 0.8vh;
}
</style>

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

		<div class="add-btn" ref="addBtn" @click="addClick">
			<van-icon name="plus" color="white"></van-icon>
		</div>
		<van-overlay :show="showAdd" @click="showAdd = false">
			<AddCourse :toggle="addClick"></AddCourse>
		</van-overlay>
	</div>
</template>

<script>
import dayjs from './dayjs'
import axios from 'axios'
import Course from './Course'
import Option from './Option'
import Detail from './Detail'
import AddCourse from './AddCourse'
import pubsub from 'pubsub-js'
export default {
	name: 'Schedule',
	components: { Course, Option, Detail, AddCourse },
	data() {
		return {
			showSetting: false,
			showDetail: false,
			showAdd: false,
			week: 0,
			days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			startDate: '2021-08-30',
			endDate: '2022-01-16',
			courses: [],
		}
	},
	methods: {
		settingClick() {
			this.showSetting = !this.showSetting
			if (this.showSetting) {
				this.$refs.divider.style.top = '17.5vh'
				this.$refs.addBtn.style.opacity = '1'
			} else {
				this.$refs.divider.style.top = '7.5vh'
				this.$refs.addBtn.style.opacity = '0'
			}
		},
		addClick() {
			this.showAdd = !this.showAdd
		},
		setWeek(val) {
			this.week = val
		},
		getCourseData() {
			axios.get('http://42.193.247.131:3000/timetable/findall').then((res) => {
				const data = res.data
				data.courses.forEach((item) => {
					let obj = {
						id: item.id,
						course: item.name,
						teacher: item.teacher,
						weeks: item.weeks,
						place: item.place,
						section: item.section,
						day: item.day,
						type: item.remark,
					}
					this.courses.push(obj)
				})
				console.log('res', data)
				console.log('courses', this.courses)
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
	beforeDestroy() {
		// 取消刷新颜色的注册事件
		pubsub.clearAllSubscriptions()
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
.add-btn {
	position: fixed;
	top: 80vh;
	left: 84vw;
	background-color: #6979c9;
	height: 6vh;
	width: 6vh;
	opacity: 0;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.add-btn:active {
	background-color: #414e8d;
}
</style>

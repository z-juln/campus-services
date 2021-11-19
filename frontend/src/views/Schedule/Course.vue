<template>
	<div class="schedule_course" ref="course" @click="toggleShow">
		<div class="schedule_course_name">{{ course }}</div>
		<div class="schedule_course_place">{{ place }}</div>
		<van-overlay :show="show" />
	</div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
	name: 'Course',
	props: [
		'day',
		'course',
		'teacher',
		'place',
		'section',
		'type',
		'weeks',
		'week',
	],
	data() {
		return {
			show: false,
			color: '',
			pubsubToken:'',
			colors: ['#F6B178', '#68cad6', '#f88568', '#efc065', '#85dcd3'],
			// colors:['#44cef6','#177cb0','#003472'],
		}
	},
	methods: {
		initLayout() {
			this.$refs.course.style.left = 8 + 13.14 * (this.day - 1) + 'vw'
			this.$refs.course.style.top = 6.77 * this.section[0] + 'vh'
			this.$refs.course.style.height =
				6.77 * (this.section[1] - this.section[0] + 1) + 'vh'
		},
		setColor(week) {
			if (this.type != 2 && week % 2 != this.type) {
				this.color = 'grey'
			} else {
				this.color = this.getRandomColor()
			}
			this.$refs.course.style.backgroundColor = this.color
		},
		toggleShow() {
			this.show = !this.show
			pubsub.publish('toggleDetail', {
				color: this.color,
				course: this.course,
				teacher: this.teacher,
				place: this.place,
				type: this.type,
				weeks: this.weeks,
			})
		},
		getRandomColor() {
			const index = Math.floor(Math.random() * this.colors.length)
			return this.colors[index]
		},
	},
	mounted() {
		this.initLayout()
		this.setColor(this.week)
		this.pubsubToken = pubsub.subscribe('refreshColor', (msg, week) => {
			this.setColor(week)
		})
	},
	beforeDestroy() {
		pubsub.unsubscribe(this.pubsubToken) //销毁前取消订阅
	}
}
</script>

<style scoped>
.schedule_course {
	width: 12.8vw;
	position: absolute;
	font-size: 13px;
	color: #fdf5ee;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	border-radius: 8px;
	border-bottom: 4px solid white;
	border-right: 2px solid white;
	box-sizing: border-box;
}
.schedule_course > div {
	padding: 0.8vw;
	width: 100%;
	text-align: center;
	flex-wrap: wrap;
}
.schedule_course > div:nth-child(1) {
	padding-top: 1vh;
	max-height: 6.4vh;
	overflow: hidden;
	/* 溢出显示省略号 */
	/* 行数太难适配，放弃 */
	/* display: -webkit-box;
	text-overflow: ellipsis;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical; */
}
</style>

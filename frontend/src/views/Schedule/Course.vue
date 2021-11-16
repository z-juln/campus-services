<template>
	<div class="schedule_course" ref="course">
		<div class="schedule_course_name">{{ course }}</div>
		<div class="schedule_course_place">{{ place }}</div>
		<!-- 点击查看详细信息 -->
	</div>
</template>

<script>
export default {
	name: 'Course',
	props: ['day', 'course', 'teacher', 'place', 'section', 'type', 'week'],
	data() {
		return {
			color: ['red', 'skyblue', 'green'],
		}
	},
	methods: {
		initCourse() {
			this.$refs.course.style.left = 8 + 13.14 * (this.day - 1) + 'vw'
			this.$refs.course.style.top = 6.77 * this.section[0]+'vh'
			console.log(this.$refs.course.style)
			this.$refs.course.style.height = 6.77 * (this.section[1]-this.section[0]+1) + 'vh'
		},
		randomColor() {
			const index = Math.floor(Math.random() * this.color.length)
			this.$refs.course.style.backgroundColor = this.color[index]
		},
		greyColor() {
			this.$refs.course.style.backgroundColor = 'grey'
		},
	},
	mounted() {
		this.initCourse()
		if (this.week % 2 != this.type&&this.type!=2) {
			//判断单双周
			this.greyColor()
		} else {
			this.randomColor()
		}
	},
}
</script>

<style scoped>
.schedule_course {
	width: 12.8vw;
	background-color: rgb(241, 74, 74);
	position: absolute;
	font-size: 12px;
	color: rgb(226, 225, 225);
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	border-radius: 6px;
}
.schedule_course > div {
	padding: 0.1vw;
	padding-top: 1vw;
	width: 100%;
	text-align: center;
	flex-wrap: wrap;
}
.schedule_course > div:nth-child(1) {
	max-height: 8vh;
	overflow: hidden;
}
</style>

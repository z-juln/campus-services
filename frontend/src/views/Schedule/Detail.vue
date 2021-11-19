<template>
	<div class="schedule_detail" v-show="isShow" ref="detail">
		<div class="schedule_detail_course">{{ course }}</div>
		<div class="schedule_detail_teacher">教师：{{ teacher }}</div>
		<div class="schedule_detail_place">教室：{{ place }}</div>
		<div class="schedule_detail_weeks">
			周数：第{{ weeks[0] }}-{{ weeks[1] }}周<span
				v-show="type == 0 || type == 1"
				>|{{ type == 0 ? '双周' : '单周' }}</span
			>
		</div>
	</div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
	name: 'Detail',
	data() {
		return {
			isShow: false,
			course: '',
			teacher: '',
			place: '',
			type: null,
			weeks: [0, 0],
		}
	},
	methods: {},
	mounted() {
		pubsub.subscribe('toggleDetail', (msg, data) => {
			this.isShow = !this.isShow
			this.$refs.detail.style.backgroundColor = data.color
			this.course = data.course
			this.teacher = data.teacher
			this.place = data.place
			this.type = data.type
			this.weeks = data.weeks
		})
	},
}
</script>

<style scoped>
.schedule_detail {
	z-index: 99;
	min-height: 30vh;
	width: 40vw;
	border-radius: 2vw;
	position: absolute;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
	padding: 8vw;
}
.schedule_detail_course {
	height: 14vh;
	font-size: 20px;
	color: rgb(255, 255, 255);
}
.schedule_detail_teacher,
.schedule_detail_place,
.schedule_detail_weeks {
	font-size: 16px;
    color: rgb(247, 247, 247);
}
</style>

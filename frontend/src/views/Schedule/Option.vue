<template>
	<div class="schedule_option">
		<div>更改周次</div>
		<div class="schedule_option_container" ref="container">
			<div class="content" ref="content">
				<div v-for="i in 20" :key="i" @click="clickWeek($event, i)">
					{{ i }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from '@better-scroll/core'
import pubsub from 'pubsub-js'
export default {
	name: 'Option',
	props: ['week', 'setWeek'],
	data() {
		return {
			bs: null,
		}
	},
	methods: {
		initScroll() {
			this.bs = new BScroll(this.$refs.container, {
				scrollX: true,
				bounce: false,
				click: true,
			})
		},
		scrollToWeek(week, time) {
			this.bs.scrollTo(
				-(
					window.innerHeight * 0.07 * (week - 1) -
					this.$refs.container.offsetWidth * 0.39
				),
				time
			)
		},
		activeWeek(week) {
			for (let i = 0; i < 20; i++) {
				this.$refs.content.children[i].classList.remove('activeWeek')
			}
			this.$refs.content.children[week - 1].classList.add('activeWeek')
		},
		clickWeek(e, val) {
			this.scrollToWeek(val)
			this.activeWeek(val)
			this.setWeek(val)
			pubsub.publish('refreshColor',val)
		},

	},
	mounted() {
		this.initScroll()
		this.scrollToWeek(this.week, 0)
		this.activeWeek(this.week)
	},
}
</script>

<style scoped>
.schedule_option {
	font-size: 16px;
	height: 10vh;
	overflow: hidden;
	display: flex;
}
.schedule_option > div:nth-child(1) {
	font-size: 14px;
	width: 5vh;
	height: 5vh;
	margin-top: 2.5vh;
	padding-left: 0.8vh;
}
.schedule_option_container {
	white-space: nowrap;
	display: inline-block;
	width: 90vw;
	height: 10vh;
	overflow: hidden;
	margin-right: 2.8vw;
}
.content {
	width: 140vh;
	color: #f8fdfa;
	font-size: 20px;
}
.schedule_option_container > div > div {
	display: inline-block;
	width: 5vh;
	height: 5vh;
	margin: 2.5vh 1vh 0;
	line-height: 5vh;
	text-align: center;
	background-color: #c6ccfc;
	border-radius: 50%;
}
.activeWeek {
	background-color: #5264c0 !important;
}
.option-enter-active,
.option-leave-active {
	transition: 0.2s;
}
.option-enter,
.option-leave-to {
	height: 0;
}
</style>

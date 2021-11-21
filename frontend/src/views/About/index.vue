<template>
	<div>
		<div class="borad">
			留 言 墙
		</div>
		<div class="content content_loading" ref="content">
			<div class="scrollBox">
				<div class="item" v-for="(item, index) in messages" :key="index">
					<div class="avatar" ref="avatar"><img :src="item.avatar"></div>
					<div class="itemContent">
						<div class="name">{{ item.name }}</div>
						<div class="text">{{ item.text }}</div>
						<div class="time">{{ timeFormater(item.time) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="skeleton" ref="skeleton">
			<div class="skeleton_container">
				<div class="skeleton_item" v-for="i in 5" :key="i">
					<div class="skeleton_avatar"></div>
					<div class="skeleton_name"></div>
					<div class="skeleton_text"></div>
				</div>
			</div>
		</div>
		<Record></Record>
	</div>
</template>

<script>

import supabase from "../../utils/supabase.js";
import BetterScroll from 'better-scroll';
import Record from './components/record.vue';
export default {
	data() {
		return {
			bs:null,
			messages: [
			
			],
		}
	},
	components: { Record },
	methods: {
		getData: async function() {
			const data = await supabase.from('message').select()
			this.messages = data.data.sort((a,b)=>{
			if(a.time > b.time){
				return -1
			}else{
				return 1
			}
      	})
	},
		timeFormater(value) {
			return value.split('-')[1] + '/' + value.split('-')[2].slice(0, 2)
		},
		scroll() {
			let warpper = document.querySelector('.content')
			this.bs = new BetterScroll(warpper, {
				mouseWheel: true,
				momentum: false,
				bounce: false,
				scrollbar: true,
			})
		},
		loaded() {
			this.$refs.skeleton.classList.add('skeleton_loaded')
			this.$refs.content.classList.remove('content_loading')
		},
	},
  created() {
    this.$bus.$on("getData",()=>{
      this.getData().then(()=>{
        this.bs.refresh()
        this.bs.scrollTo(0,0,300)
      })
    })
  },
  mounted() {
		this.getData()
			.then(this.scroll)
			.then(this.loaded)
	},
}
</script>

<style lang="less" scoped>
.borad {
	height: 80px;
	padding-top: 10px;
	text-align: center;
	font-size: 35px;
	width: 100%;
	color: #fff;
	border-bottom: 1px solid #DCDCDC;
	background-color: #6979c9;
	border-radius: 20px 20px 0 0;
}
.skeleton {
	position: absolute;
	width: 100%;
  	height: 58vh;
	background-color: #fff;
	top: 100px;
}
.skeleton_container {
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.skeleton_item {
	height: 20%;
	width: 100%;
	border-bottom: 1px solid rgb(168, 164, 164);
	position: relative;
}
.skeleton_avatar {
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: grey;
	position: relative;
	top: 10px;
	left: 4px;
	background-size: cover;
	animation: loading ease-in-out 1.6s infinite;
}
.skeleton_name {
	position: absolute;
	left: 56px;
	top: 20px;
	background-color: grey;
	width: 70px;
	height: 18px;
	animation: loading ease-in-out 1.6s infinite;
	border-radius: 12px;
}
.skeleton_text {
	position: absolute;
	left: 54px;
	top: 46px;
	height: 40px;
	width: 300px;
	background-color: grey;
	animation: loading ease-in-out 1.6s infinite;
	border-radius: 20px;
}
.skeleton_loaded {
	display: none;
}
.content {
	width: 100%;
	margin: 0 auto;
	height: 58vh;
	overflow: hidden;
	position: relative;
	background-color: #F7F8FA;
	z-index: 10;
}
.content_loading {
	/* display: none; */
	width: 80%;
	opacity: 0;
	
}

.item {
	// background-color: var(--item_color);
	// border-bottom: 1px solid var(--line_color);
	width: 90%;
	user-select: none;
	display: flex;
	margin: 5px auto;
	background-color: #fff;
	border: 1px solid #fff;
	border-radius: 25px;
}
/* .item:hover {
  background-color: var(--hover_color);
} */
.time {
	height: 10px;
	/* width: 64px; */
	font-size: 6px;
	bottom: 10%;
	left: 90%;
	position: absolute;
	font-size: 12px;
	color: var(--text_color);
	opacity: 0.7;
}
.itemContent {
	width: 100%;
	position: relative;
}
.name {
	margin-left: 4%;
	margin-top: 14px;
	font-size: 18px;
	font-weight: 500;
}
.text {
	width: 80%;
	margin-left: 10%;
	font-size: 17px;
	margin-top: 14px;
	margin-bottom: 14px;
	color: var(--text_color);
	/* 溢出换行 */
	table-layout: fixed;
	word-break: break-all;
	overflow: hidden;
	text-align: justify;
	opacity: 0.7;
}
.avatar {
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: rgb(163, 156, 151);
	position: relative;
	top: 10px;
	left: 6px;
}
.avatar img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
@media screen and (min-width: 1200px) {
  .skeleton_text {
	width: 400px;
}
}
</style>

<template>
	<div id="post">
		<textarea ref="message" @keydown.enter="postMessage"></textarea>
		<button @click="postMessage">
			<img src="../../../assets/image/发送.svg" width="30" height="30" />
		</button>
		<!-- <van-cell-group inset class="liuyan">
			<van-field
				ref="message"
				rows="2"
				autosize
				label="留言"
				type="textarea"
				maxlength="50"
				placeholder="请输入留言"
				show-word-limit
				@keydown.enter="postMessage"
		/>
		</van-cell-group> -->
		<!-- <van-field
			v-model="value1"
			label="文本"
			left-icon="smile-o"
			right-icon="warning-o"
			placeholder="显示图标"
  		/> -->
	</div>
</template>

<script>
import supabase from "../../../utils/supabase.js";
import { Toast } from 'vant';
export default {
	name: 'Post',
	data() {
		return {
			userName: '',
			avatarUrl: '',
			message: '',
		}
	},
	methods: {
    //加个loading动画
		postMessage: async function() {
			this.message = this.$refs.message.value
			this.$refs.message.value = ''
			this.$refs.message.blur()
			await supabase
				.from('message')
				.insert({
					name: this.userName,
					text: this.message,
					avatar: this.avatarUrl,
				})
      		this.$bus.$emit('getData')
      	},
	},
	created() {
		this.$bus.$on('userInfo', (userName, avatarUrl) => {
			this.userName = userName
			this.avatarUrl = avatarUrl
		})
	},
}
</script>

<style scoped>
#post {
	height: 150px;
	background-color:#6979c9;
	border-radius: 0 0 20px 20px;
	position: relative;
}
#post textarea {
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%, -50%);
	resize: none;
	outline: none;
	border: 1px solid #a5bcf5;
	height: 60px;
	width: 92%;
	font-size: 22px;
}
#post button {
	position: absolute;
	outline: none;
	border: 0px solid #a5bcf5;
	border-radius: 50%;
	margin: 0;
	padding: 0;
	background-color: var(--button_color);
	font-size: 26px;
	color: #88a9fc;
	cursor: pointer;
	left: 50%;
	top: 70%;
	transform: translate(-50%, -50%);
	height: 56px;
	width: 56px;
}
#post button img {
	opacity: 0.8;
}
#post button:active {
	background-color: var(--button_active_color);
}
</style>

<template>
	<div id="about">
		<h3>联系我们: 1850021148@qq.com</h3>
		<br />
		<br />
		<br />
		<br />
		<p v-if="isLogin">你已登录</p>
		<div v-else>
			<router-link :to="{name: 'login'}">
				<van-button
					size="small"
					:style="{padding: '0 40px'}"
					type="primary"
				>
					登录 / 注册
				</van-button>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLogin: this.$store.state.user?.token
		}
	}
}
</script>

<style lang="less" scoped>
#about {
	margin-top: 20vh;
	font-size: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>

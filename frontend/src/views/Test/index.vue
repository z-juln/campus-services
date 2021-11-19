<template>
    <div class="reg">
        <h1>注册</h1>
        <van-cell-group class="reg-from">
        <van-field v-model="userName" clearable border label="邮箱" placeholder="请输入邮箱" />
        <van-field v-model="password" clearable border type="password" label="密码" placeholder="请输入密码" />
        <van-field v-model="passwordRep" clearable border type="password" label="重复密码" placeholder="请再次输入密码"/>
        <van-cell>
          <van-row>
            <van-col span="24" class="btn">
              <van-button type="primary" size="small" >注册</van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
    
</template>
<script>

export default ({
    data() {
        return {
            userName: '',
            password: '',
            passwordRep: '',
            userNameErr: '',
            passwordErr: '',
            passwordRepErr: '',
            loading: false
    };
    },
})
</script>

<style scoped>
.reg {
    width: 100%;
    height: 100%;
    background: url('../../image/bgc.jpg');
    position: absolute;
}
</style>

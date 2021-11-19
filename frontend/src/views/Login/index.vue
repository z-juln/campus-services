<template >
   <transition name="slide">
    <div class="login">
      <div class="title">
        <h1>Login</h1>
      </div>
      <van-cell-group class="login-from">
        <van-field v-model="userName" clearable border label="邮箱" placeholder="请输入邮箱" :error-message="userNameErr" />
        <van-field v-model="password" clearable border type="password" label="密码" placeholder="请输入密码" :error-message="passwordErr" />
        <van-row class="middle-item">
            <van-col span="11" offset="1">
              <van-checkbox v-model = "checked">记住我</van-checkbox>
            </van-col>
            <van-col span="8" offset="4"><span @click="reset">忘记密码？</span></van-col>
        </van-row>
        <van-cell>
          <van-row>
            <van-col span="12" class="btn">
              <van-button type="primary" size="small" @click="login" :loading="loading">登陆</van-button>
            </van-col>
            <van-col span="12" class="btn">
              <van-button type="default" size="small" @click="reg">注册</van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
  </transition>
</template>

<script>
import MD5 from 'js-md5';
import { emailCheck, pwdCheck } from '../../utils/util.js';
import { login } from '../../apis/index.js';
import { Toast } from 'vant';
export default {
  data() {
    return {
      userName: 'test@qq.com',
      password: 'pwx980101',
      userNameErr: '',
      passwordErr: '',
      loading: false,
      redirect: this.$route.query.redirect,
      checked: 'false'
    }
  },
  mounted() {
    if (this.redirect) {
      Toast({
        position: 'bottom',
        message: '未登录或登陆过期，请重新登陆~'
      });
    }
  },

  methods: {
    login() {
      this.userNameErr = '';
      this.passwordErr = '';
      this.loading = true;
      if (!emailCheck(this.userName)) {
        this.userNameErr = '邮箱格式不正确';
        this.loading = false;
        return;
      }
      if (!pwdCheck(this.password)) {
        this.passwordErr = '密码格式不正确';
        this.loading = false;
        return;
      }
      login({ userName: this.userName, password: MD5(this.password).toString() })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            this.$router.push('/');
            //账号密码存储
            if (this.checked) {
              let password = MD5(this.password).toString()
              localStorage.setItem("password", password)
              localStorage.setItem("username", this.userName)
            } else {
              localStorage.removeItem("password");
              localStorage.removeItem("userName");
            }
          } else {
            this.loading = false;
            Toast.fail(res.msg);
          }
        })
        .catch(error => {
          Toast.fail(error);
          this.loading = false;
        });
    },
    reg() {
      this.$router.push('/reg');
    },
    reset() {
      this.$router.push('/reset');
    }
  }
};
</script>
<style lang ="less" scoped>
.login{
    width: 100%;
    height: 100%;
    text-align: center;
    background-image: url('../../image/bgc.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    position: absolute;
}
  

.title {
    width: 68%;
    // margin: 30% 0 20% -37%;
    font-size: 28px;
    margin: 24% 0px;
    font-weight: 300;
    color: #003366;
  }
    

.login-from{
    width: 80%;
    text-align: center;
    padding: 10px;
    margin: 0 auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19);
}
  

.btn {
    text-align: center;
    margin-top: 10px;
}
   

.slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
}
  

.slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.middle-item {
  margin-top: 20px;
  font-size: 14px;
}
 
</style>
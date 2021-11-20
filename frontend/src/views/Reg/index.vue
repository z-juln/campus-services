<template>
  <transition name="slide">
    <div class="reg">
      <div class="title">
        <h1>Register</h1>
      </div>
      <van-cell-group class="reg-from">
        <van-field v-model="userName" clearable border label-width="4.0em" label="邮箱" placeholder="请输入邮箱" :error-message="userNameErr" />
        <van-row>
            <van-col span="15">
              <van-field style="vertical-align: bottom" label-width="4.0em" label="验证码"  v-model="verificationCode" clearable border placeholder="请输入验证码" :error-message="verificationCodeErr" />
            </van-col>
            <van-col span="9">
              <van-button style="vertical-align: bottom"  @click="getCode()" type="primary" size="small" :loading="loading">{{codeContent}}</van-button>
            </van-col>
        </van-row>
        <van-field v-model="password" clearable border label-width="4.0em" type="password" label="密码" placeholder="请输入密码" :error-message="passwordErr" />
        <van-field v-model="passwordRep" clearable border label-width="4.0em" type="password" label="重复密码" placeholder="请再次输入密码" :error-message="passwordRepErr" />
        <van-row class="middle-item">
          <van-col span="10" style="font-size:14px;margin-top:10px;" @click="tologin"
            ><span>已有账号？去登陆</span></van-col
          >
        </van-row>
        <van-cell>
          <van-row>
            <van-col span="24" class="btn">
              <van-button type="primary" size="small" @click="reg" :loading="loading">注册</van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
  </transition>
</template>

<script>
import MD5 from 'js-md5';
import { emailCheck, pwdCheck } from '../../utils/util';
import { SEND_CAPTCHA } from '../../apis/index.js';
import { Toast } from 'vant';
export default {
  data() {
    return {
      clock: null,
      userName: '',
      password: '',
      passwordRep: '',
      userNameErr: '',
      passwordErr: '',
      passwordRepErr: '',
      verificationCodeErr: '',
      loading: false,
      verificationCode: '',
      codeContent: '获取验证码',
      totalTime: 60,
      canClick: true
    };
  },
  methods: {
    getCode() {
      if (!emailCheck(this.userName)) {
        this.userNameErr = '邮箱格式不正确';
        this.loading = false;
        return;
      }
      if (!this.canClick) return
      this.canClick = false
      this.codeContent = this.totalTime + 's后重新发送' //这里解决60秒不见了的问题
      SEND_CAPTCHA({email: this.userName})
        .then(res => {
          this.clock = setInterval(() => {
            this.totalTime--
            this.codeContent = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
              window.clearInterval(this.clock)
              this.codeContent = '重新发送验证码'
              this.totalTime = 60
              this.canClick = true
            }
          }, 1000)
        })
    },
    reg() {
      this.userNameErr = '';
      this.passwordErr = '';
      this.passwordRepErr = '';
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
      if (this.password !== this.passwordRep) {
        this.passwordRepErr = '两次密码不一致';
        this.loading = false;
        return;
      }
      if (!this.verificationCode) {
        Toast('请输入验证码')
        this.loading = false;
        return;
      }
      this.$store.dispatch('register', { email: this.userName, password: MD5(this.password).toString(), captcha: this.verificationCode })
        .then(user => {
            this.$router.push('/login');
        })
        .finally(() => this.loading = false)
    },
    tologin() {
      this.$router.push('/login');
    }
  },
  
};
</script>

<style lang="less" scoped>
.reg{
    width: 100%;
    height: 100%;
    text-align: center;
    background-image: url('../../image/bg.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    position: absolute;
}
.title {
    width: 65%;
    font-size: 28px;
    margin: 25% auto 11% ;
    font-weight: 300;
    color: #f6f7fc9a;
  }

.reg-from {
    width: 75%;
    text-align: center;
    padding: 10px;
    margin: 0 auto;
    border-radius: 1rem;
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


</style>

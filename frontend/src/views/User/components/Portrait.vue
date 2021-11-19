<template>
  <div>
    <van-uploader 
      :before-read="beforeRead" 
      :after-read="afterRead" 
    >
      <van-button 
        type="primary" 
        class="uploader" 
        ref="picture"
      ></van-button>
    </van-uploader>
    <div class="info">
      Here is a list of schedule.
    </div>
      
  </div>
</template>

<script>
import require from "../../../utils/request";
import store from "../../../store/index.js"

export default {
  data() {
    return {
      file: '',
    }
  },
  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
    afterRead(file) {
      
      // console.log(file.content);
      const res = require.post('/user/avatar/update formdata', file.content)
      console.log(res);
      this.$refs.picture.background = file
    },
  },
  created() {
    console.log(store.state.user);

    if(!store.state) {
      Toast('未登录, 获取头像失败')
      //todo 跳转登录
      return
    }
    const res = require.post('/user/avatar/update formdata')
    this.file = res
    this.$refs.picture.background = file
  }
}
</script>

<style lang="less" scoped>
.uploader {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 7px solid rgb(255, 255, 255);
  margin: 0 7vw 0 15vw;
  background: #FFF url(../../../assets/image/portrait.jpg) no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.5);
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #F6F7FC;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.info {
  height: 10vh;
  display: inline-block;
  font-size: 2.3vw;
  color: #F6F7FC;
  font-weight: bold;
  font-family:Arial,Verdana,Sans-serif;
}
</style>
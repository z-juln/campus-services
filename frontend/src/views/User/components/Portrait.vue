<template>
  <div>
    <van-uploader :before-read="beforeRead" :after-read="afterRead">
      <van-button type="primary" class="uploader" ref="picture"
        :style="avatar ? {backgroundImage: `url('${avatar}')`} : ''"
        @click="uploadAvatar"
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
import { Toast } from 'vant';
import { LOGIN, UPLOAD_AVATAR } from '../../../apis';

export default {
  data() {
    return {
      uploadedAvatar: null,
      file: '',
    }
  },
  computed: {
    avatar() {
      return this.uploadedAvatar || this.$store.state.user?.avatar
    }
  },
  methods: {
    beforeRead(file) {
      const enableImageTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']
      if (!enableImageTypes.includes(file.type)) {
        Toast('请上传图片');
        return false;
      }
      return true;
    },
    afterRead(file) {
      const formData = new FormData()
      formData.append('avatar', file.file)
      UPLOAD_AVATAR(formData)
        .then(res => {
          this.uploadedAvatar = res.result?.avatar || res?.avatar
          Toast('上传成功')
        })
    },
  },
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
<template>
  <div class="edit-list">

    <van-datetime-picker
      v-model="defaultTime"
      class="datetime-picker"
      type="datetime"
      title="添加代办"
      @cancel="handleClose"
      @confirm="handleConfirm"
      :formatter="formatter"
    >
    </van-datetime-picker>

    <van-cell-group style="padding-top: 18px; padding-bottom: 5px;">
      <van-field v-model="title" label="代办标题" placeholder="请输入代办标题" />
      <van-field v-model="content" label="代办内容" placeholder="请输入代办内容" />
    </van-cell-group>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { addTodo } from '../utils'

export default {
  data() {
    return {
      title: '',
      content: '',
      defaultTime: new Date(),
      savedTime: '',
      overlayShow: true
    };
  },
  props: {
    handleClose: Function,
  },
  methods: {
    saveTime() {
      console.log(1);
      this.savedTime = value
      this.overlayShow = false
      this.$emit('overlayChange', this.overlayShow)
    },
    handleConfirm() {
      if(!this.title && !this.content) {
        Toast('请输入代办内容和标题')
        return
      }
      addTodo({
        title: this.title,
        content: this.content,
        time: this.defaultTime,
      })
      this.$emit('addTodo')
      this.handleClose()
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      if (type === 'hour') {
        return val + '时';
      }
      if (type === 'minute') {
        return val + '分';
      }
      return val;
    },
  }
}
</script>

<style lang="less" scoped>
.edit-list {
  border-radius: 3vh;
  overflow: hidden;
}
</style>

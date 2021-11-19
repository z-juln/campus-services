<template>
  <div>
    <van-datetime-picker
      v-model="defaultTime"
      class="datetime-picker"
      type="time"
      title="选择时间"
      :min-hour="10"
      :max-hour="20"
    >
    </van-datetime-picker>

  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultTime: '12:30',
      savedTime: '',
      overlayShow: true
    };
  },
  methods: {
    saveTime() {
      console.log(1);
      this.savedTime = value
      this.overlayShow = false
      this.$emit('overlayChange', this.overlayShow)
    }
  }
}
</script>

<style lang="less" scoped>
.datetime-picker {
  border-radius: 3vh;
}
</style>
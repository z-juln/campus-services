<template>
  <div class="common-layout">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace :to="{name: 'Schedule'}" icon="search">课表</van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'User'}" icon="contact">我的</van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'About'}" icon="question-o">其它</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
}
</script>

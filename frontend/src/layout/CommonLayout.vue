<template>
  <div class="common-layout">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace :to="{name: 'User'}" icon="contact">我的</van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'About'}" icon="search">标签</van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'About'}" icon="setting-o">标签</van-tabbar-item>
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

<style>

</style>

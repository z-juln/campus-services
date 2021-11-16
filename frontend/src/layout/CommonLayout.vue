<template>
  <div class="common-layout">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace :to="{name: 'Home'}" badge="3">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'Schedule'}" icon="notes-o">Schedule</van-tabbar-item>
      <van-tabbar-item replace :to="{name: 'About'}" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
}
</script>

<style>

</style>

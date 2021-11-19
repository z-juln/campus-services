<template>
  <van-picker show-toolbar title="标题" :columns="columns" />

</template>

<script>
export default {
  data() {
    return {
      columns: [
        // 第一列
        {
          values: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          defaultIndex: 3,
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1,
        },
      ],
    };
  },
}
</script>

<style lang="less" scoped>

</style>
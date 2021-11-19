<template>
  <div>
    <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div 
            class="list-item" 
            v-for="(value,key,index) in list" 
            :key="index"
          >
            <van-icon name="label-o" size="4vw"/>
            <h5 style="font-size: 4vw; display: inline-block; margin: 0 0 1vw 4vw">{{value.time}}</h5>
            <p style="font-size: 3.5vw; margin: 1vw 0 2vw 4vw">{{value.title}}</p>
            <p style="font-size: 2vw; margin: 1vw 0 1vw 4vw; color: #909399; ">{{value.content}}</p>
          </div>
        </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listAmount: 0,
      list: [
        {
          date: 17,
          time: '07:00',
          title: 'Typography',
          content: 'Faculty of Art & Design Building'
        },
        {
          date: 18,
          time: '17:00',
          title: 'Geography',
          content: 'something todo...'
        },
        {
          date: 15,
          time: '12:00',
          title: 'Math',
          content: 'something todo...'
        },
        {
          date: 15,
          time: '12:00',
          title: 'Math',
          content: 'something todo...'
        },
      ],
      isEdit: false,
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  props: {
    listInfo: {
      time: '--:--',
      theme: '',
      content: '',
    }
  },
  methods: {
    editList() {
      isEdit = true
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 80%;
  margin: auto;

  .list-item {
    color: #606266;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding:3vh; 
    padding: 4vw;
    margin: 2vh 0;
    border-top: solid 0.133vw rgba(231, 231, 231, 0.801);
    border-radius: 1vw;
    background: #f1f2ff;
    
  }
}
</style>
<template>
  <div>
    <div class="frame">
      <div class="head-info">
        <transition name="slide-fade">
          <Portrait></Portrait>
        </transition>
      </div>

      <div class="body">
        <DatePicker></DatePicker>
              
        <!-- <van-skeleton title :row="3" :loading="loading" round> -->
          <TodoList></TodoList>
        <!-- </van-skeleton> -->

        
      </div>
      
    </div>
  </div>
</template>


<script>
import Portrait from '@/views/User/components/Portrait.vue'
import DatePicker from '@/views/User/components/DatePicker.vue'
import TodoList from '@/views/User/components/TodoList.vue'


export default {
  name: 'User',
  data() {
    return {
      userInfo: "",
      today: 0,
      // avatarURL: "https://www.jianshu.com/u/26a00a9d7e9b",
      loading: true,
      
    }
  },
  components: {
    Portrait,
    DatePicker,
    TodoList
  },
  methods: {
    
  }, 
  watch: {
    
    
  }
};
</script>

<style lang="less">
@headHeight: 30vh;
* {
  padding: 0;
  margin: 0;
}

.frame {
  width: 100%;
  // height: 100vh;
  background-color: #6979C9;

  .head-info {
    width: 100%;
    height: @headHeight;
    line-height: @headHeight;
  }

  .body {
    width: 94%;
    // height: 100vh - @headHeight;
    margin: auto;
    background-color: #ffffffef;
    border-top-left-radius: 6vh;
    border-top-right-radius: 6vh;
    box-shadow: 0px -5px 15px 4px rgba(0, 0, 0, 0.308);
    z-index: -99;
  }
}
// .slide-fade-enter-active { 
//   transition: all .3s ease; 
// }
// .slide-fade-leave-active { 
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// } 
// .slide-fade-enter, .slide-fade-leave-to {
//   transform: translateX(10px); opacity: 0; 
// }


</style>
<template>
  <div>
    <div class="add-btn" @click="addList" ref="addBtn">
      <van-icon name="plus" color="white"></van-icon>
    </div>

    <div class="frame">
      <div class="head-info">
        <transition name="slide-fade">
          <Portrait></Portrait>
        </transition>
      </div>

      <div class="body">
        <DatePicker @change="$event => pickDay = $event"></DatePicker>
        <TodoList :key="todoListKey + '-' + pickDay" :day="pickDay"></TodoList>

        <van-overlay
          :show="show"
          z-index="99"
          @click="show = false"
          lock-scroll
        >
          <div class="wrapper" @click.stop>
            <EditList v-show="show" class="EditList" @overlayChange="getChange"
              :handleClose="() => show = false"
              @addTodo="todoListKey += 1"
            >
            </EditList>
          </div>
        </van-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import Portrait from "@/views/User/components/Portrait.vue";
import DatePicker from "@/views/User/components/DatePicker.vue";
import TodoList from "@/views/User/components/TodoList.vue";
import EditList from "@/views/User/components/EditList.vue";

export default {
  name: "User",
  data() {
    return {
      pickDay: null,
      todoListKey: 0, // 用于刷新组件使用
      userInfo: "",
      today: 0,
      // avatarURL: "https://www.jianshu.com/u/26a00a9d7e9b",
      loading: true,
      show: false, //改为默认false
      // isEdit: true, //默认false
    };
  },
  components: {
    Portrait,
    DatePicker,
    TodoList,
    EditList,
  },
  methods: {
    // addBtnClick() {
    //   if (window.scrollY > 100) {
    //     this.$refs.addBtn.style.opacity = "1";
    //   } else {
    //     this.$refs.addBtn.style.opacity = "0";
    //   }
    // },
    addList() {
      //遮罩层
      this.show = true;
    },
    getChange() {
      this.show = false;
    },
  },
  // mounted() {
  //   window.addEventListener("scroll", this.addBtnClick);
  // },
  // destroyed() {
  //   window.removeEventListener("scroll", this.addBtnClick);
  // },
};
</script>

<style lang="less" scoped>
@headHeight: 30vh;
* {
  padding: 0;
  margin: 0;
}

.frame {
  width: 100%;
  min-height: calc( 100vh - 50px );
  background-color: #6979c9;

  .head-info {
    width: 100%;
    height: @headHeight;
    line-height: @headHeight;
  }

  .body {
    width: 94%;
    min-height: calc( 100vh - 50px - @headHeight );
    margin: auto;
    background-color: #ffffffef;
    border-top-left-radius: 6vh;
    border-top-right-radius: 6vh;
    box-shadow: 0px -5px 15px 4px rgba(0, 0, 0, 0.308);
    z-index: -99;

    .EditList {
      width: 80vw;
      // height: 80%;
      margin: 50vh auto;
      transform: translateY(-50%);
      border-radius: 3vh;
      z-index: 999;
      background-color: rgb(255, 255, 255);
    }
  }
}
.add-btn {
  position: fixed;
  top: 80vh;
  left: 84vw;
  z-index: 9;
  // opacity: 0;
  background-color: #6979c9;
  height: 6vh;
  width: 6vh;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-btn:active {
  background-color: #414e8d;
}
</style>

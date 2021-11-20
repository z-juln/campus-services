<template>
  <div class="datepicker">
    <div class="date-list">
      <!-- 星期 -->
      <ul class="weekdays">
        <li>S</li>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <template v-for="(day, index) in days">
          <li
            v-if="day.getMonth() + 1 === currentMonth"
            :key="index"
            :class="{
              'is-active': day.getTime() == new Date(selectedTime).getTime(),
            }"
            @click="pick(day)"
          >
            {{ day.getDate() }}
          </li>
        </template>
      </ul>
    </div>

    <!-- <div class="todo-list">
      <div class="list-item"
        v-for="(value,key,index) in list" 
        :key="index" >
        <van-skeleton title :row="3" :loading="loading" round>
          <TodoList></TodoList>
        </van-skeleton>

      </div>
    </div> -->

  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      selectedTime: "",
      days: [],
      pickerTime: new Date(),
    };
  },
  mounted() {
    this.action(this.time);
  },
  watch: {
    time() {
      this.selectedTime = this.formatDate(this.time);
      this.initData(this.selectedTime);
    },
  },
  computed: {
    selectedMonth() {
      return this.currentMonth < 10
        ? "0" + this.currentMonth
        : this.currentMonth;
    },
  },
  methods: {
    action(time) {
      this.selectedTime = this.formatDate(time);
      this.initData(this.selectedTime);
      this.pick(this.selectedTime);
    },

    // 选择日期
    pick(date) {
      let d = new Date(date);
      this.selectedTime = this.formatDate(d);
      // this.$emit("change", this.formatDate(d, "set"))
      const day = d.getDate()
      this.$emit("change", day);
    },

    // 初始化日期
    initData(cur) {
      let date = "";
      cur ? (date = new Date(cur)) : (date = new Date());
      this.currentDay = date.getDate();         
      this.currentYear = date.getFullYear();  // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0  // 星期几
      this.days.length = 0;
      let str = this.formatDate(date);
      // 获取本周日期，周日排第一个
      for (let i = this.currentWeek; i >= 0; i -= 1) {
        const d = new Date(str); // 当日之前的日期
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }
      for (let i = 1; i <= 6 - this.currentWeek; i += 1) {
        const d = new Date(str); // 当日之后的日期
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },

    // 格式化
    formatDate(t) {
      let time = this.initFormat(t);
      let date = new Date(time);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) m = `0${m}`;
      if (d < 10) d = `0${d}`;
      return `${y}/${m}/${d}`; // YYYY/MM/DD
    },

    // 初始化日期格式
    initFormat(time) {
      if (!time) return new Date();
      if (typeof time === "object") {
        return time;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.datepicker {
  width: 100%;
  height: auto;
  color: #606266;
  text-align: center;
  font-size: inherit;
  padding: 3vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.date-list {
  width: 80%;
  position: relative;
  font-size: 16px;
}
.weekdays {
  display: flex;
  justify-content: space-around;
}
.weekdays li {
  text-align: center;
  margin: 0.3rem;
  color: #909399;
}
.days {
  display: flex;
  justify-content: space-around;
  margin-top: 0.3rem;
}
.days li {
  // text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 19px;
  height: 19px;

}
.days li.is-active {
  background: #4b5ebdf5;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.308);
}
</style>

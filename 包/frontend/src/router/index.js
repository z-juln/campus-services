import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "../layout/CommonLayout.vue";
import Schedule from "../views/Schedule/index.vue";
import User from "../views/User/index.vue";
import Login from "../views/Login/index.vue";
import Reg from "../views/Reg/index.vue";
import Test from "../views/Test/index.vue";
import Reset from "../views/Reset/index.vue";
import About from '../views/About/index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg,
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/reset",
    name: "reset",
    component: Reset,
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/test",
    name: "test",
    component: Test,
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/",
    component: CommonLayout,
    children: [
      {
        path: "",
        redirect: "/schedule"
      },
      {
        path: "user",
        name: "User",
        component: User,
      },
      {
        path:"schedule",
        name:"Schedule",
        component: Schedule,
      },
      {
        path:"about",
        name:"About",
        component: About,
      },
    ],
  },
  {
    path: "/404",
    name: "NoFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NoFound.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

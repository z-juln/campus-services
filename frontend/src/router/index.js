import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "../layout/CommonLayout.vue";
import User from "../views/User/index.vue";
import Login from "../views/Login/index.vue";
import Reg from "../views/Reg/index.vue";
import Test from "../views/Test/index.vue";
import Reset from "../views/Reset/index.vue";

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
        path: "user",
        name: "User",
        component: User,
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

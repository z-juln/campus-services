import Vue from "vue";
import store from '../store'
import VueRouter from "vue-router";
import CommonLayout from "../layout/CommonLayout.vue";
import Test from "../views/Test/index.vue";
import { Toast } from "vant";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg'),
    meta: {
      fullScreen: true
    }
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import(/* webpackChunkName: "reset" */ '../views/Reset'),
    meta: {
      fullScreen: true
    }
  },
  /* {
    path: "/test",
    name: "test",
    component: Test,
    meta: {
      fullScreen: true
    }
  }, */
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
        component: () => import(/* webpackChunkName: "user" */ '../views/User'),
      },
      {
        path:"schedule",
        name:"Schedule",
        component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule'),
      },
      {
        path:"about",
        name:"About",
        component: () => import(/* webpackChunkName: "about" */ '../views/About'),
      },
    ],
  },
  {
    path: "/*",
    name: "NoFound",
    component: () =>
      import(/* webpackChunkName: "no-found" */ "../views/NoFound.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requireLogin = !['login', 'reg'].includes(to.name)
  const isLogin = store.state.user?.token
  if(requireLogin) {
    if(isLogin) {
      next()
    } else {
      Toast('尚未登录, 请先登录')
      next({ name: 'login' })
    }
  }
  next()
})

export default router;

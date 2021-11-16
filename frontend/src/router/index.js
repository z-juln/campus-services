import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "../layout/CommonLayout.vue";
import Home from "../views/Home/index.vue";
import About from "../views/About/index.vue";
import Schedule from "../views/Schedule/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: CommonLayout,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path:"schedule",
        name:"Schedule",
        component: Schedule,
      }
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

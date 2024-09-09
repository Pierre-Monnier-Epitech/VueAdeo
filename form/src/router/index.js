import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/ListUsers.vue")
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/Create.vue")
    }
  ]
});

export default router;

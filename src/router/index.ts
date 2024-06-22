import { RoutePaths } from "@/core/config/route-paths";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: RoutePaths.home.path,
  },
  {
    path: RoutePaths.home.path,
    name: RoutePaths.home.name,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.view.vue"),
  },
  {
    path: RoutePaths.list.path,
    name: RoutePaths.list.name,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/list.view.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

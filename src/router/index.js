import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import AuthGuard from "@/router/auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: AuthGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ "../views/AdminPage.vue"),
    children: [
      {
        path: "car",
        name: "Car",
        beforeEnter: AuthGuard,
        component: () => import(/* webpackChunkName: "car" */ "../components/Car/CarCard"),
      },
      {
        path: "list",
        name: "CarList",
        beforeEnter: AuthGuard,
        component: () => import(/* webpackChunkName: "list" */ "../components/List/CarList"),
      },
      {
        path: "orders",
        name: "Orders",
        beforeEnter: AuthGuard,
        component: () => import(/* webpackChunkName: "orders" */ "../components/Orders/Orders"),
      },
    ],
  },
  {
    path: "*",
    name: "Error",
    component: () => import(/* webpackChunkName: "error" */ "../components/Error"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

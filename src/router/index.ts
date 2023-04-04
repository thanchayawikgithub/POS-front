import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("../views/HomeView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: LoginView,
      },

      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/about",
      name: "about",

      components: {
        default: () => import("../views/AboutView.vue"),
        menu: () => import("@/components/menus/AboutMenu.vue"),
        header: () => import("@/components/headers/AboutHeader.vue"),
      },
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/customers",
      name: "customer",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/Customer/CustomerView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/pos",
      name: "pos",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/pos/PosView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/products",
      name: "product",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/product/ProductView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/materials",
      name: "material",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/material/MaterialView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/employees",
      name: "employee",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/employee/EmployeeView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/stores",
      name: "stores",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/Store/StoreView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/receipts",
      name: "receipt",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../views/receipt/receiptView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/staff",
      name: "Staff Menu",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import("../components/menus/StaffMenu.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
  ],
});

const isLogin = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  }
  return false;
};
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !isLogin()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;

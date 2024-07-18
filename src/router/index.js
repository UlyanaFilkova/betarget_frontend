import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import CrmView from "@/views/CrmView.vue";
import { fetchUserMyData } from "@/api/user/fetcher.js";

const isAuthenticated = async () => {
  const userData = await fetchUserMyData();
  return !!userData;
};

const checkViewBeforeEnter = async (to, from, next, destination) => {
  if (await isAuthenticated()) {
    if (destination) {
      next({ name: destination });
    } else {
      next();
    }
  } else {
    next({ name: "login" });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      beforeEnter: (to, from, next) => checkViewBeforeEnter(to, from, next, "crm"),
    },
    {
      path: "/crm",
      name: "crm",
      component: CrmView,
      beforeEnter: (to, from, next) => checkViewBeforeEnter(to, from, next, ""),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationView,
    },
  ],
});

export default router;

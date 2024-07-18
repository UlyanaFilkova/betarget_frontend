import { createRouter, createWebHistory, RouterView } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import CrmView from "@/views/CrmView.vue";
import { fetchUserMyData } from "@/api/user/fetcher.js";
import { saveUser, deleteUser } from "@/service/user";
import Tr from "@/i18n/translation.js";

const isAuthenticated = async (userData) => {
  return userData != null;
};

const checkViewBeforeEnter = async (to, from, next, destination) => {
  const userData = await fetchUserMyData(false);
  if (await isAuthenticated(userData)) {
    saveUser(userData);
    if (destination) {
      next({ name: destination, params: { locale: to.params.locale } });
    } else {
      next();
    }
  } else {
    deleteUser();
    next({ name: "login", params: { locale: to.params.locale } });
  }
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      redirect: { name: "crm" },
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: "crm",
          name: "crm",
          component: CrmView,
          beforeEnter: (to, from, next) =>
            checkViewBeforeEnter(to, from, next, ""),
        },
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "registration",
          name: "registration",
          component: RegistrationView,
        },
      ],
    },
  ],
});

export default router;

import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from "./i18n";

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(i18n)
    .use(pinia)
    .mount("#app");


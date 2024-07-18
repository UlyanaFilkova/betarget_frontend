import { createApp } from "vue/dist/vue.esm-bundler";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "./i18n";

app.use(router);
app.use(store);
app.use(i18n)
app.mount("#app");


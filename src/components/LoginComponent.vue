<script setup>
import "@/assets/css/login.css";
import { reactive } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
import axios from "axios";

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const userData = {
    email: form.email,
    password: form.password,
  };

  try {
    console.log(userData);
    // const response = await axios.post("/api/jobs/", userData);
    // router.push(`/jobs/${response.data.id}`);
  } catch (error) {
    console.error("Error login", error);
  }
};
</script>

<template>
  <section class="login">
    <div class="login__wrapper">
      <h1 class="login__logo">Betarget</h1>
      <form class="login__form" @submit.prevent="handleSubmit">
        <input
          class="login__input"
          type="email"
          id="login__email"
          name="login__email"
          v-model="form.email"
          placeholder="Электронная почта"
          required
        />
        <input
          class="login__input"
          type="password"
          id="login__password"
          name="login__password"
          v-model="form.password"
          placeholder="Пароль"
          required
        />
        <button class="login__button" type="submit">Вход</button>
        <div class="login__links">
          <RouterLink to="" class="login__link">Забыли пароль?</RouterLink>
          <RouterLink to="" class="login__link">Создать аккаунт</RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>

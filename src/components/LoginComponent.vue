<script setup>
import "@/assets/css/login.css";
</script>

<template>
  <section class="login">
    <h1 class="login__logo">Betarget</h1>
    <form class="login__form">
      <input
        class="login__input"
        type="email"
        id="login__email"
        name="login__email"
        placeholder="Электронная почта"
        required
      />

      <input
        class="login__input"
        type="password"
        id="login__password"
        name="login__password"
        placeholder="Пароль"
        required
      />

      <button type="submit">Вход</button>
    </form>
    <p>
      <a href="#">Забыли пароль?</a>
      <a href="#">Создать аккаунт</a>
    </p>
  </section>
</template>

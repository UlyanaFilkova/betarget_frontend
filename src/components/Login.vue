<script setup>
import "@/assets/css/login.css";
import { reactive, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { fetchAuthLogin, fetchAuthGoogle } from "@/api/auth/fetcher.js";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import Tr from "@/i18n/translation"

const authLink = ref("");

const getAuthLink = async () => {
  const url = await fetchAuthGoogle();
  authLink.value = url;
}
getAuthLink();

const form = reactive({
  email: "",
  password: "",
});

const loginEmail = ref(null);
const loginPassword = ref(null);

const errors = reactive({
  email: "",
  password: "",
  emptyFields: "",
  invalidLogin: "",
});

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

const checkEmail = () => {
  if (loginEmail.value.validity.typeMismatch) {
    errors.email = t("login.enter_correct_email");
    return false;
  } else {
    errors.email = "";
    return true;
  }
};

const checkPassword = () => {
  if (loginPassword.value != null && !validatePassword(loginPassword.value.value)) {
    errors.password =
      t("login.password_constrains");
    return false;
  } else {
    errors.password = "";
    return true;
  }
};

onMounted(() => {
  loginEmail.value.addEventListener("focusout", (event) => {
    if (checkEmail() === false) {
      loginEmail.value.addEventListener("input", checkEmail);
    } else {
      errors.email = "";
    }
  });

  loginPassword.value.addEventListener("focusout", (event) => {
    if (checkPassword() === false) {
      loginPassword.value.addEventListener("input", checkPassword);
    } else {
      errors.password = "";
    }
  });
});

const checkForm = () => {
  // заполнены ли все поля
  if (loginPassword.value.value === "" || loginEmail.value.value === "") {
    errors.emptyFields = t("login.fill_all_fields");
    return false;
  } else {
    errors.emptyFields = "";
  }
  // если еще остались ошибки
  if (errors.email !== "" || errors.password !== "" || errors.emptyFields) {
    return false;
  }

  if (checkEmail() === false || checkPassword() === false) {
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!checkForm()) {
    return;
  }
  const userData = {
    username: form.email,
    password: form.password,
  }
  if(await fetchAuthLogin(userData)) {
    router.push({ name: "crm" });
  } else {
    errors.invalidLogin = t("login.wrong_name_or_password");
  }
};
</script>

<template>
  <section class="login">
    <div class="login__wrapper">
      <h1 class="login__logo">Betarget</h1>
      <form novalidate class="login__form" @submit.prevent="handleSubmit">
        <span
          :style="{ visibility: errors.emptyFields ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.emptyFields }}</span
        >
        <span
          :style="{ visibility: errors.invalidLogin ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.invalidLogin }}</span
        >
        <input
          class="login__input"
          type="email"
          id="login__email"
          name="login__email"
          v-model="form.email"
          :placeholder="$t('login.email')"
          autocomplete="email"
          ref="loginEmail"
          required
        />
        <span
          :style="{ visibility: errors.email ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.email }}</span
        >
        <input
          class="login__input"
          type="password"
          id="login__password"
          name="login__password"
          v-model="form.password"
          :placeholder="$t('login.password')"
          autocomplete="current-password"
          ref="loginPassword"
          required
        />
        <span
          :style="{ visibility: errors.password ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.password }}</span
        >
        <button class="login__button" type="submit">{{ $t("login.sign_in") }}</button>
      </form>
      <div class="login__links">
        <RouterLink :to="Tr.i18nRoute({ name: '' })" class="login__link">{{ $t("login.forgot_password") }}</RouterLink>
        <RouterLink :to="Tr.i18nRoute({ name: 'registration' })" class="login__link"
          >{{ $t("login.create_account") }}</RouterLink
        >
      </div>
      <a :href="authLink">{{ $t("login.sign_in_with_google") }}</a>
    </div>
    <LanguageSwitcher />
  </section>
</template>

<script setup>
import "@/assets/css/login.css";
import { reactive, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { fetchAuthLogin, fetchAuthGoogle } from "@/api/auth/fetcher.js";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import Tr from "@/i18n/translation";

const { t } = useI18n();
const authLink = ref("");

const getAuthLink = async () => {
  const url = await fetchAuthGoogle();
  authLink.value = url;
};
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
  if (
    loginPassword.value != null &&
    !validatePassword(loginPassword.value.value)
  ) {
    errors.password = t("login.password_constrains");
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
  };
  if (await fetchAuthLogin(userData)) {
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
          :style="{
            visibility:
              errors.emptyFields || errors.invalidLogin ? 'visible' : 'hidden',
          }"
          class="login__error"
        >
          {{ errors.emptyFields || errors.invalidLogin }}
        </span>
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
        <button class="login__button" type="submit">
          {{ $t("login.sign_in") }}
        </button>
      </form>
      <div class="login__links">
        <RouterLink :to="Tr.i18nRoute({ name: '' })" class="login__link">{{
          $t("login.forgot_password")
        }}</RouterLink>
        <RouterLink
          :to="Tr.i18nRoute({ name: 'registration' })"
          class="login__link"
          >{{ $t("login.create_account") }}</RouterLink
        >
      </div>
      <div class="login__additional-links">
        <a
          :href="authLink"
          :title="$t('login.sign_in_with_google')"
          class="login__google"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-380.2 274.7 65.7 65.8"
            id="google"
          >
            <circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0"></circle>
            <circle cx="-347.3" cy="307.1" r="32.4" fill="#fff"></circle>
            <g>
              <defs>
                <path
                  id="a"
                  d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                ></path>
              </defs>
              <clipPath id="b">
                <use overflow="visible" xlink:href="#a"></use>
              </clipPath>
              <path
                fill="#fbbc05"
                d="M-370.8 320.3v-26l17 13z"
                clip-path="url(#b)"
              ></path>
              <defs>
                <path
                  id="c"
                  d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                ></path>
              </defs>
              <clipPath id="d">
                <use overflow="visible" xlink:href="#c"></use>
              </clipPath>
              <path
                fill="#ea4335"
                d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z"
                clip-path="url(#d)"
              ></path>
              <g>
                <defs>
                  <path
                    id="e"
                    d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="f">
                  <use overflow="visible" xlink:href="#e"></use>
                </clipPath>
                <path
                  fill="#34a853"
                  d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z"
                  clip-path="url(#f)"
                ></path>
              </g>
              <g>
                <defs>
                  <path
                    id="g"
                    d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="h">
                  <use overflow="visible" xlink:href="#g"></use>
                </clipPath>
                <path
                  fill="#4285f4"
                  d="M-322.8 331.3l-31-24-4-3 35-10z"
                  clip-path="url(#h)"
                ></path>
              </g>
            </g>
          </svg>
        </a>
        <LanguageSwitcher />
      </div>
    </div>
  </section>
</template>

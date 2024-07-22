<script setup>
import "@/assets/css/login.css";
import { reactive, ref, onMounted } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import {
  fetchAuthRegister,
  fetchAuthLogin,
  fetchAuthGoogle,
} from "@/api/auth/fetcher.js";
import { fetchUserExists } from "@/api/user/fetcher";
import Tr from "@/i18n/translation.js";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const { t } = useI18n();
const authLink = ref("");

const getAuthLink = async () => {
  const url = await fetchAuthGoogle();
  authLink.value = url;
};
getAuthLink();

const form = reactive({
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
});

const loginEmail = ref(null);
const loginUsername = ref(null);
const loginPassword = ref(null);
const loginRepeatPassword = ref(null);

const errors = reactive({
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  emptyFields: "",
});

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

const checkUsername = async () => {
  if (await fetchUserExists({ username: loginUsername.value.value })) {
    errors.username = t("registration.username_exists");
    return false;
  } else {
    errors.username = "";
    return true;
  }
};

const checkEmail = async () => {
  if (loginEmail.value.validity.typeMismatch) {
    errors.email = t("registration.enter_valid_email");
    return false;
  } else if (await fetchUserExists({ email: loginEmail.value.value })) {
    errors.email = t("registration.email_exists");
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
    errors.password = t("registration.password_constrains");
    return false;
  } else {
    errors.password = "";
    return true;
  }
};

const checkRepeatPassword = () => {
  if (
    loginRepeatPassword.value != null &&
    loginRepeatPassword.value.value !== loginPassword.value.value
  ) {
    errors.repeatPassword = t("registration.passwords_dont_match");
    return false;
  } else {
    errors.repeatPassword = "";
    return true;
  }
};

onMounted(async () => {
  loginUsername.value.addEventListener("focusout", (event) => {
    if (checkUsername() === false) {
      loginUsername.value.addEventListener("input", checkUsername);
    } else {
      errors.username = "";
    }
  });

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

  loginRepeatPassword.value.addEventListener("focusout", (event) => {
    if (checkRepeatPassword() === false) {
      loginRepeatPassword.value.addEventListener("input", checkRepeatPassword);
    } else {
      errors.repeatPassword = "";
    }
  });
});

const checkForm = () => {
  // если поля пусты или невалидны
  if (
    loginRepeatPassword.value.value === "" ||
    loginUsername.value.value === "" ||
    loginPassword.value.value === "" ||
    loginEmail.value.value === ""
  ) {
    errors.emptyFields = t("registration.fill_all_fields");
    return false;
  } else {
    errors.emptyFields = "";
  }
  // если еще остались ошибки
  if (
    errors.repeatPassword !== "" ||
    errors.username !== "" ||
    errors.email !== "" ||
    errors.password !== "" ||
    errors.emptyFields
  ) {
    return false;
  }

  if (
    checkUsername() === false ||
    checkEmail() === false ||
    checkPassword() === false ||
    checkRepeatPassword() === false
  ) {
    return false;
  }

  return true;
};

const clearForm = () => {
  form.email = "";
  form.username = "";
  form.password = "";
  form.repeatPassword = "";
};

const handleSubmit = async () => {
  if (!checkForm()) {
    return;
  }
  const userData = {
    username: form.username,
    email: form.email,
    password: form.password,
  };
  const user = await fetchAuthRegister(userData);
  if (user) {
    if (
      await fetchAuthLogin({
        username: userData.email,
        password: userData.password,
      })
    ) {
      clearForm();
      router.push({ name: "crm" });
    }
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
        <input
          class="login__input"
          type="username"
          id="login__username"
          name="login__username"
          v-model="form.username"
          :placeholder="$t('registration.username')"
          autocomplete="username"
          ref="loginUsername"
          required
        />
        <span
          :style="{ visibility: errors.username ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.username }}</span
        >
        <input
          class="login__input"
          type="email"
          id="login__email"
          name="login__email"
          v-model="form.email"
          :placeholder="$t('registration.email')"
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
          :placeholder="$t('registration.password')"
          autocomplete="new-password"
          ref="loginPassword"
          required
        />
        <span
          :style="{ visibility: errors.password ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.password }}</span
        >
        <input
          class="login__input"
          type="password"
          id="login__repeat_password"
          name="login__repeat_password"
          v-model="form.repeatPassword"
          :placeholder="$t('registration.confirm_password')"
          autocomplete="new-password"
          ref="loginRepeatPassword"
          required
        />
        <span
          :style="{ visibility: errors.repeatPassword ? 'visible' : 'hidden' }"
          class="login__error"
          >{{ errors.repeatPassword }}</span
        >
        <button class="login__button" type="submit">
          {{ $t("registration.register") }}
        </button>
      </form>
      <div class="login__links">
        <RouterLink :to="Tr.i18nRoute({ name: 'login' })" class="login__link">{{
          $t("registration.already_have_account")
        }}</RouterLink>
      </div>

      <div class="login__additional-links">
        <a
          :href="authLink"
          :title="$t('registration.sign_in_with_google')"
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

<style scoped>
.login__links {
  justify-content: center;
}
</style>

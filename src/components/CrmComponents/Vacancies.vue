<script setup>
import { ref, onMounted } from "vue";
import { useActiveStore } from "@/store";
import Vacancy from "@/models/vacancy.js";
import { fetchVacancies } from "@/api/vacancy/fetcher";

const activeStore = useActiveStore();
let activeVacancyElement = ref(null);

const setActiveVacancy = (event, vacancyId) => {
  if (activeVacancyElement.value !== null) {
    activeVacancyElement.value.classList.remove("vacancies__vacancy_active");
  }
  const targetElement = event.currentTarget;
  targetElement.classList.add("vacancies__vacancy_active");
  activeVacancyElement.value = targetElement;
  activeStore.updateActiveVacancyId(Number(vacancyId));
};

onMounted(async () => {
  activeStore.updateVacancies((await fetchVacancies()).map(data => new Vacancy(data)));
});
</script>

<template>
  <section class="vacancies">
    <div class="vacancies__header">Вакансии</div>
    <div class="vacancies__list">
      <a v-for="vacancy in activeStore.vacancies" :key="vacancy.id" class="vacancies__vacancy"
        @click.prevent="setActiveVacancy($event, vacancy.id)">
        <div class="vacancies__title">{{ vacancy.jobTitle }}</div>
        <div class="vacancies__subtitle">{{ vacancy.company }}</div>
      </a>
    </div>
    <a href="" class="vacancies__new-vacancy">
      <p>Новая вакансия</p>
      <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M29.6638 14.7641C29.6638 22.9165 23.0649 29.4942 14.9464 29.4942C6.82781 29.4942 0.262695 22.9165 0.262695 14.7641C0.262695 6.62857 6.82781 0.0126953 14.9464 0.0126953C23.0649 0.0126953 29.6638 6.62857 29.6638 14.7641Z" />
        <path
          d="M8.59712 13.9385H21.2956C21.7576 13.9385 22.1212 14.2982 22.1212 14.7639C22.1212 15.2427 21.7575 15.6063 21.2956 15.6063H8.59712C8.13635 15.6063 7.77173 15.2426 7.77173 14.7639C7.77173 14.2984 8.13518 13.9385 8.59712 13.9385Z"
          fill="white" />
        <path
          d="M15.7719 8.41467V21.13C15.7719 21.5919 15.4082 21.9555 14.9462 21.9555C14.4843 21.9555 14.1208 21.5919 14.1208 21.13V8.41467C14.1208 7.94911 14.4843 7.58911 14.9462 7.58911C15.407 7.58911 15.7719 7.94896 15.7719 8.41467Z"
          fill="white" />
      </svg>
    </a>
  </section>
</template>

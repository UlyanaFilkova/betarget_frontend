<script setup>
import {
  reactive,
  ref,
  inject,
  onMounted,
  watch,
  computed,
  unref,
  toRaw,
} from "vue";
import { useStore } from "vuex";
import Resume from "@/models/resume.js";
import axios from "axios";

const resumes = reactive([]);
const store = useStore();
let activeVacancyId = computed(() => Number(store.state.activeVacancy));
let activeResume = ref(null);

watch(activeVacancyId, (newActiveVacancyId) => {
  resumes.splice(0);
  fetchAllResumes(unref(newActiveVacancyId));
});

const fetchAllResumes = async (vacancyId) => {
  try {
    const resumesData = await fetchResumes(vacancyId);
    resumesData.forEach((data) => resumes.push(new Resume(data)));
    // console.dir(resumesData);
    // console.dir(resumes);
    store.dispatch("updateResumes", toRaw(resumes));
  } catch (error) {
    console.error(error);
  }
};

const fetchResumes = async (vacancyId, resumeStatus = undefined) => {
  try {
    const url = new URL("/server/api/v1/resume", window.location.origin);
    if (vacancyId) {
      url.searchParams.set("vacancy_id", vacancyId);
    }
    if (resumeStatus !== undefined) {
      url.searchParams.set("resume_status", resumeStatus);
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching resumes");
  }
};

const setActiveResume = (event, resumeId) => {
  if (activeResume.value !== null) {
    activeResume.classList.remove("resume-list__resume_active");
  }
  const targetElement = event.currentTarget;
  targetElement.classList.add("resume-list__resume_active");
  activeResume = targetElement;
  store.dispatch("updateActiveResumeId", Number(resumeId));
  console.log(resumeId);
};
</script>

<template>
  <section class="resume-list">
    <a
      v-for="resume in resumes"
      :key="resume.id"
      class="resume-list__resume"
      @click.prevent="setActiveResume($event, resume.id)"
    >
      <div class="resume-list__photo-container">
        <img class="resume-list__photo" />
      </div>
      <div class="resume-list__info">
        <div class="resume-list__name">
          {{ resume.firstName }} {{ resume.lastName }}
        </div>
        <div class="resume-list__job-title">{{ resume.jobTitle }}</div>
        <div
          class="resume-list__score"
          :style="{ display: resume.rating === 0 ? 'none' : '' }"
        >
          <span
            class="resume-list__score-number"
            :class="{ 'resume-list__score-number_good': resume.rating >= 8 }"
            >{{ resume.rating }}</span
          >
          <span> / 10</span>
        </div>
      </div>
    </a>
  </section>
</template>

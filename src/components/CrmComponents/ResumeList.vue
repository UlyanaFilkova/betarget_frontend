<script setup>
import { ref, watch, computed, unref } from "vue";
import { useActiveStore } from "@/store";
import { fetchResumes } from "@/api/resume/fetcher";
import Resume from "@/models/resume.js";

const activeStore = useActiveStore();
let activeResumeElement = ref(null);

watch(computed(() => activeStore.activeVacancyId), async(newActiveVacancyId) => {
  activeStore.updateResumes((await fetchResumes(unref(newActiveVacancyId))).map(data => new Resume(data)));
});

const setActiveResume = (event, resumeId) => {
  if (activeResumeElement.value !== null) {
    activeResumeElement.classList.remove("resume-list__resume_active");
  }
  const targetElement = event.currentTarget;
  targetElement.classList.add("resume-list__resume_active");
  activeResumeElement = targetElement;
  activeStore.updateActiveResumeId(Number(resumeId));
};
</script>

<template>
  <section class="resume-list">
    <a v-for="resume in activeStore.resumes" :key="resume.id" class="resume-list__resume"
      @click.prevent="setActiveResume($event, resume.id)">
      <div class="resume-list__photo-container">
        <img class="resume-list__photo" />
      </div>
      <div class="resume-list__info">
        <div class="resume-list__name">
          {{ resume.firstName }} {{ resume.lastName }}
        </div>
        <div class="resume-list__job-title">{{ resume.jobTitle }}</div>
        <div class="resume-list__score" :style="{ display: resume.rating === 0 ? 'none' : '' }">
          <span class="resume-list__score-number" :class="{ 'resume-list__score-number_good': resume.rating >= 8 }">{{
            resume.rating }}</span>
          <span> / 10</span>
        </div>
      </div>
    </a>
  </section>
</template>

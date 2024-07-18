<script setup>
import ResumeActions from "@/components/crmComponents/resumeComponents/ResumeActions.vue";
import ResumeContent from "@/components/crmComponents/resumeComponents/ResumeContent.vue";
import ResumeInfo from "@/components/crmComponents/resumeComponents/ResumeInfo.vue";

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

const store = useStore();
let activeResumeId = computed(() => Number(store.state.activeResume));

watch(activeResumeId, (newActiveResumeId) => {
  let resumes = computed(() => store.state.resumes);
  resumes = toRaw(unref(resumes));
  let resume = resumes.find((resume) => resume.id === newActiveResumeId);
  resume = toRaw(resume);
  console.dir(resume);
});
</script>

<template>
  <div class="resume">
    <section class="resume-display">
      <ResumeActions />
      <ResumeContent />
    </section>
    <ResumeInfo />

    <div class="resume__not-chosen">Выберите резюме</div>
  </div>
</template>

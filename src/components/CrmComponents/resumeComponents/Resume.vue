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
let activeResumeId = computed(() => Number(store.state.activeResumeId));
let resume = reactive({});

watch(activeResumeId, (newActiveResumeId) => {
  let resumes = computed(() => store.state.resumes);
  resumes = toRaw(unref(resumes));

  let resumeData = resumes.find((resume) => resume.id === newActiveResumeId);
  console.dir(resumeData);
  resumeData = toRaw(resumeData);
  console.dir(resumeData);
  resume = new Resume(resumeData);
  console.dir(resume);
  store.dispatch("updateActiveResume", toRaw(resume));
});
</script>

<template>
  <div class="resume">
    <section class="resume-display">
      <ResumeActions :resumeData="resume" />
      <ResumeContent :resume="resume" />
    </section>
    <ResumeInfo :resume="resume" />

    <div class="resume__not-chosen">Выберите резюме</div>
  </div>
</template>

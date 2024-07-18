<script setup>
import { reactive, ref, inject, onMounted, watch } from "vue";
import Resume from "@/models/resume.js";
import axios from "axios";
// import bus from "@/eventBus";

const resumes = reactive([]);
let currentActiveVacancy = ref(null);

// bus.on("activeVacancyChanged", async (currentActiveVacancy) => {
//   try {
//     const resumesData = await fetchResumes(currentActiveVacancy);
//     resumesData.forEach((data) => resumes.push(new Resume(data)));
//     console.log(resumes);
//   } catch (error) {
//     console.error(error);
//   }
// });

const fetchResumes = async (
  vacancyId = undefined,
  resumeStatus = undefined
) => {
  try {
    let url = "/api/v1/resume";
    if (vacancyId != undefined || vacancyId != null) {
      url += `?vacancy_id=${vacancyId}`;
    }
    if (resumeStatus !== undefined) {
      url += `&resume_status=${resumeStatus}`;
    }
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    resumes.splice(0);
    response.data.forEach((resume) => resumes.push(resume));
    return response.data;
  } catch (error) {
    throw new Error("Error fetching resumes");
  }
};

// onMounted(async () => {
//   try {

//     const resumesData = await fetchResumes(currentActiveVacancy);
//     resumesData.forEach((data) => resumes.push(new Resume(data)));
//   } catch (error) {
//     console.error(error);
//   }
// });

function handleResumeClick(event, resumeId) {
  // Add your logic here to handle the resume click event
  console.log(`Resume clicked: ${resumeId}`);
}
</script>

<template>
  <section class="resume-list">
    <a
      v-for="resume in resumes"
      :key="resume.id"
      class="resume-list__resume"
      @click.prevent="handleResumeClick($event, resume.id)"
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

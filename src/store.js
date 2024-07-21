import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useActiveStore = defineStore("active", {
  state: () => ({
    activeVacancyId: ref(null),
    activeResume: null,
    activeResumeId: null,
    resumes: reactive([]),
    vacancies: reactive([]),
  }),
  actions: {
    updateActiveVacancyId(activeVacancyId) {
      this.activeVacancyId = activeVacancyId;
    },
    updateActiveResumeId(activeResumeId) {
      this.activeResumeId = activeResumeId;
    },
    updateActiveResume(activeResume) {
      this.activeResume = activeResume;
    },
    updateResumes(resumes) {
      this.resumes.splice(0, this.resumes.length, ...resumes);
    },
    updateVacancies(vacancies) {
      this.vacancies.splice(0, this.vacancies.length, ...vacancies);
    }
  },
  getters: {
    getActiveResume: (state) => {
      return state.resumes.find((resume) => resume.id === state.activeResumeId);
    },
  },
});

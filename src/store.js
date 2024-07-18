import { createStore } from "vuex";
// import { toRaw } from "vue";

const store = createStore({
  state: {
    activeVacancy: null,
    activeResume: null,
    activeResumeId: null,
    resumes: null,
  },
  mutations: {
    updateActiveVacancy(state, activeVacancy) {
      state.activeVacancy = activeVacancy;
    },
    updateActiveResumeId(state, activeResumeId) {
      state.activeResumeId = activeResumeId;
    },
    updateActiveResume(state, activeResume) {
      state.activeResume = activeResume;
    },
    updateResumes(state, resumes) {
      state.resumes = resumes;
    },
  },
  actions: {
    updateActiveVacancy({ commit }, activeVacancy) {
      commit("updateActiveVacancy", activeVacancy);
    },
    updateActiveResumeId({ commit }, activeResumeId) {
      commit("updateActiveResumeId", activeResumeId);
    },
    updateActiveResume({ commit }, activeResume) {
      commit("updateActiveResume", activeResume);
    },
    updateResumes({ commit }, resumes) {
      commit("updateResumes", resumes);
    },
  },
  getters: {},
});

export default store;

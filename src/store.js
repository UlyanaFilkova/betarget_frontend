import { createStore } from "vuex";
// import { toRaw } from "vue";

const store = createStore({
  state: {
    activeVacancy: null,
    activeResume: null,
    resumes: null,
  },
  mutations: {
    updateActiveVacancy(state, activeVacancy) {
      state.activeVacancy = activeVacancy;
    },
    updateActiveResume(state, activeResume) {
      state.activeResume = activeResume;
    },
    updateResumes(state, resumes) {
      state.resumes = resumes;
      // console.dir(toRaw(state.resumes));
    },
  },
  actions: {
    updateActiveVacancy({ commit }, activeVacancy) {
      commit("updateActiveVacancy", activeVacancy);
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

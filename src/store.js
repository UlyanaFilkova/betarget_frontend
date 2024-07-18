import { createStore } from "vuex";

const store = createStore({
  state: {
    activeVacancy: null,
  },
  mutations: {
    updateActiveVacancy(state, activeVacancy) {
      state.activeVacancy = activeVacancy;
    },
  },
  actions: {
    updateActiveVacancy({ commit }, activeVacancy) {
      commit("updateActiveVacancy", activeVacancy);
    },
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
  },
});

export default store;

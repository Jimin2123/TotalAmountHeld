import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog: false
  },
  mutations: {
    open(state) {
      state.dialog = true;
    },
    close(state) {
      state.dialog = false;
    }
  },
  actions: {},
  modules: {}
});
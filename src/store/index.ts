import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      access_token: ""
    },
    project_id: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user.access_token = payload.access_token;
    }
  },
  actions: {
  },
  modules: {
  }
});

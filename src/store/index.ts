import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      access_token: ""
    },
    project_id: "",
    construct_id: 0,
    currentConstruct: undefined
  },
  mutations: {
    setUser(state, payload) {
      state.user.access_token = payload.access_token;
    },
    setProjectId(state, projectId) {
      state.project_id = projectId;
    },
    setConstructId(state, constructId) {
      state.construct_id = constructId;
    },
    setCurrentConstruct(state, currentConstruct) {
      state.currentConstruct = currentConstruct;
    }
  },
  actions: {
  },
  modules: {
  }
});

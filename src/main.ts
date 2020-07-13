import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import PointInput from "@/components/PointInput.vue";

Vue.use(ElementUI);
Vue.component("point-input", PointInput);
Vue.config.productionTip = false;

axios.interceptors.request.use(function(config) {
  if (store.state.user.access_token) {
    config.headers.Authorization = "Bearer" + store.state.user.access_token;
  }
  config.withCredentials = true;
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  const data = response.data;
  if (data.code === "00191") {
    const beforelogout = new CustomEvent("beforelogout", { detail: {} });
    window.dispatchEvent(beforelogout);

    // logout, so app will show login page
    setTimeout(() => {
      store.commit("setUser", { access_token: "" });
    }, 0);
  }
  return response;
}, function(error) {
  return Promise.reject(error);
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import PointInput from "@/components/PointInput.vue";
import { MessageType, ElMessageOptions } from "element-ui/types/message";
import * as _ from "lodash";

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

function logout() {
  const beforelogout = new CustomEvent("beforelogout", { detail: {} });
  window.dispatchEvent(beforelogout);

  // logout, so app will show login page
  setTimeout(() => {
    store.commit("setUser", { access_token: "" });
  }, 0);
}

const throttledLogout = _.throttle(logout, 5 * 60 * 1000, { trailing: false });

axios.interceptors.response.use(function(response) {
  const data = response.data;
  if (data.code === "00191") {
    // 在用户token过期后，可能会发出多个ajax请求，通过throttle限制只发出一次beforelogout事件。
    throttledLogout();
  }
  return response;
}, function(error) {
  return Promise.reject(error);
});

// node_modules\element-ui\packages\message\src\main.js
// 设置消息缺省时长为1秒
(["success", "warning", "info", "error"] as MessageType[]).forEach((type) => {
  Message[type] = (options: ElMessageOptions | string) => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    options.type = type;
    if (!options.duration && options.duration !== 0) {
      options.duration = 1000;
    }
    return Message(options);
  };
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

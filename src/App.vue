<template>
  <div id="app">
    <login-page v-if="!user.access_token"> </login-page>
    <home-page v-else> </home-page>
    <!-- <template v-else>
      <home-page v-if="!project_id"> </home-page>
      <project-page v-else> </project-page>
    </template> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State /*, Getter, Action, Mutation, namespace */ } from "vuex-class";

import LoginPage from "@/components/pages/LoginPage.vue";
import HomePage from "@/components/pages/HomePage.vue";
import ProjectPage from "@/components/pages/ProjectPage.vue";

@Component({
  components: {
    "login-page": LoginPage,
    "home-page": HomePage,
    "project-page": ProjectPage
  }
})
export default class App extends Vue {
  page = "login-page";
  @State user!: any;
  @State project_id!: string;
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>

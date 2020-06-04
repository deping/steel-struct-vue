<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  /* State, Getter, Action, */ Mutation /*, namespace */
} from "vuex-class";
// import { Form } from "element-ui";
// import { getAjaxUrl } from "@/utils/path";
// import axios from "axios";

@Component({
  components: {}
})
export default class ProjectPage extends Vue {
  name = "project-page";

  @Mutation setProjectId!: (payload: any) => void;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
</style>

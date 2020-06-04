<template>
  <div id="container">
    <div>
      <el-checkbox v-model="confirmDelProj" @change="change('confirmDelProj')"
        >需要确认删除工程</el-checkbox
      >
    </div>
    <div>
      <el-checkbox v-model="confirmDelCons" @change="change('confirmDelProj')"
        >需要确认删除构件</el-checkbox
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomePageLocalSettings extends Vue {
  name = "local-settings";

  confirmDelProj = true;
  confirmDelCons = true;

  created() {
    this.confirmDelProj =
      localStorage.getItem("settings.confirmDelProj") !== "false";
    this.confirmDelCons =
      localStorage.getItem("settings.confirmDelCons") !== "false";
  }

  change(item: "confirmDelProj" | "confirmDelCons") {
    localStorage.setItem("settings." + item, String(this[item]));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
</style>

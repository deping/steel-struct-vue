<template>
  <div id="container">
    <div class="item">
      <el-checkbox v-model="confirmDelProj" @change="change('confirmDelProj')"
        >需要确认删除工程</el-checkbox
      >
    </div>
    <div class="item">
      <el-checkbox v-model="confirmDelCons" @change="change('confirmDelCons')"
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.item {
  margin: 10px;
}
</style>

<style lang="scss">
.item .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
}
</style>

<template>
  <el-tabs type="border-card" style="width:100%;height:100%;border:0px">
    <el-tab-pane label="路线">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="总体设计">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="标准横断面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="立面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="纵肋">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="横隔系">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="桥面板">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="附属">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="绘图设置">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="图纸查看">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="三维模型">替换为对应的标签页组件</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Persist } from "@/components/ConstructBase";
// import {
//   /* State, Getter, Action, */ Mutation /* namespace */
// } from "vuex-class";
// import { getAjaxUrl } from "@/utils/path";
// import axios from "axios";

@Component({
  components: {}
})
export default class CaoxingZuheliang extends Vue implements Persist {
  name = "cao-xing-zu-he-liang";

  async save() {
    console.log("请实现 save");
  }

  async load() {
    console.log("请实现 load");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
</style>

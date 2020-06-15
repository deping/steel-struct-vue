<template>
  <el-tabs type="border-card" style="width:100%;height:100%;border:0px">
    <el-tab-pane label="路线">
      <GJ-luxian></GJ-luxian>
    </el-tab-pane>
    <el-tab-pane label="总体设计">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="标准横断面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="立面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="纵肋">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="横隔系">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="桥面板">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="附属">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="绘图设置">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="图纸查看">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="三维模型">
      <three-js :file="'model/sample.fbx'"></three-js>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive } from "vue-property-decorator";
import { Persist } from "@/components/ConstructBase";
import ThreeJs from "@/components/ThreeJs.vue";
import { JsonDataService } from "./models/JsonDataService";
import LuXian from "@/components/CaoXingZuHeLiang/tabs/LuXian.vue";
// import {
//   /* State, Getter, Action, */ Mutation /* namespace */
// } from "vuex-class";
// import { getAjaxUrl } from "@/utils/path";
// import axios from "axios";

@Component({
  components: {
    "three-js": ThreeJs,
    "GJ-luxian": LuXian
  }
})
export default class CaoxingZuheliang extends Vue implements Persist {
  name = "cao-xing-zu-he-liang";

  // 在子组件，使用
  // @InjectReactive() jsonDataService!: JsonDataService;
  // 来导入这个对象
  @ProvideReactive() jsonDataService = new JsonDataService();

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
div.tab-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: block;
}
</style>

<style lang="scss">
div.el-tabs > div.el-tabs__content {
  width: 100%;
  height: calc(100% - 42px);
  margin: 0px;
  border: 0px;
  padding: 0px;
}
div.el-tabs > div.el-tabs__content > div.el-tab-pane {
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 0px;
  padding: 0px;
  overflow-y: auto;
}
</style>

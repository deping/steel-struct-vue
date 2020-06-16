<template>
  <el-tabs type="border-card" style="width:100%;height:100%;border:0px">
    <el-tab-pane label="路线">
      <GJ-luxian></GJ-luxian>
    </el-tab-pane>
    <el-tab-pane label="总体设计">
      <zongti-sheji></zongti-sheji>
    </el-tab-pane>
    <el-tab-pane label="标准横断面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="立面">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="纵肋">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="横隔系">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="桥面板">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="附属">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="绘图设置">替换为对应的标签页组件</el-tab-pane>
    <el-tab-pane label="图纸查看"
      ><tuzhi-chakan @modelChange="onModelChange"></tuzhi-chakan
    ></el-tab-pane>
    <el-tab-pane label="三维模型">
      <three-js ref="three" :file="'model/sample.fbx'"></three-js>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive } from "vue-property-decorator";
import { Persist } from "@/components/ConstructBase";
import ThreeJs, { ThreeModelFile } from "@/components/ThreeJs.vue";
import { JsonDataService } from "./models/JsonDataService";
import LuXian from "@/components/CaoXingZuHeLiang/tabs/LuXian.vue";
import { State /*, Getter, Action, Mutation, namespace */ } from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import ZongtiSheji from "@/components/CaoXingZuHeLiang/tabs/ZongtiSheji.vue";
import TuzhiChakan from "@/components/CaoXingZuHeLiang/tabs/TuzhiChakan.vue";

@Component({
  components: {
    "zongti-sheji": ZongtiSheji,
    "three-js": ThreeJs,
    "GJ-luxian": LuXian,
    "tuzhi-chakan": TuzhiChakan
  }
})
export default class CaoxingZuheliang extends Vue implements Persist {
  name = "cao-xing-zu-he-liang";

  @State construct_id!: string;

  // 在子组件，使用
  // @InjectReactive() jsonDataService!: JsonDataService;
  // 来导入这个对象
  // 在注入类中，x = this.jsonDataService.x; 会报错。
  // 在注入类的mouted()中调用 this.x = this.jsonDataService.x;
  @ProvideReactive() jsonDataService = new JsonDataService();

  $refs!: {
    three: ThreeJs;
  };

  created() {
    // eslint-disable-next-line space-before-function-paren
    ((Vue as any).eventHub as Vue).$on("save", async () => {
      await this.save();
    });
  }

  async save() {
    try {
      await this.serialize();
      const formdata = new FormData();
      formdata.append("componentId", String(this.construct_id));
      formdata.append(
        "htszJson",
        encodeURIComponent(JSON.stringify(this.jsonDataService.htszJSON))
      );
      formdata.append(
        "otherJson",
        encodeURIComponent(JSON.stringify(this.jsonDataService.exportJSON))
      );
      formdata.append(
        "uiJson",
        encodeURIComponent(JSON.stringify(this.jsonDataService.uiJSON))
      );
      const res = await axios.post(
        getAjaxUrl("/calc/saveComponentJson"),
        formdata
      );
      if (res.data.code !== "00100") {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    } catch (error) {
      this.$message({
        type: "error",
        message: error.message
      });
    }
  }

  async load() {
    console.log("请实现 load");
  }

  async serialize() {
    console.log("开始序列化");
    console.log("TODO 序列化");
    this.jsonDataService.uiJSON.isEmpty = "false";
    console.log("结束序列化");
  }

  onModelChange(model: ThreeModelFile) {
    this.$refs.three.setModelFile(model);
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

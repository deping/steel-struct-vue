<template>
  <el-tabs
    type="border-card"
    style="width:100%;height:100%;border:0px"
    @tab-click="onTabClick"
    ref="tabs"
  >
    <el-tab-pane label="路线">
      <GJ-luxian ref="luxian"></GJ-luxian>
    </el-tab-pane>
    <el-tab-pane label="总体设计">
      <zongti-sheji ref="zongtisheji"></zongti-sheji>
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
import { Component, Vue, Provide } from "vue-property-decorator";
import { Persist, canSerialize } from "@/components/ConstructBase";
import ThreeJs, { ThreeModelFile } from "@/components/ThreeJs.vue";
import { JsonDataService } from "./models/JsonDataService";
import LuXian from "@/components/CaoXingZuHeLiang/tabs/LuXian.vue";
import { State /*, Getter, Action, Mutation, namespace */ } from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import ZongtiSheji from "@/components/CaoXingZuHeLiang/tabs/ZongtiSheji.vue";
import TuzhiChakan from "@/components/CaoXingZuHeLiang/tabs/TuzhiChakan.vue";
import { JsonData } from "@/models/json-data";
import { ComponentInfo } from "./models/component-info";
import { LJK } from "./models/export-data";
import { Tabs } from "element-ui";

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

  currentTab?: { $children: Vue[] };

  @State construct_id!: string;

  // 在子组件，使用
  // @Inject() jsonDataService!: JsonDataService;
  // 来导入这个对象
  // 在注入类中，x = this.jsonDataService.x; 会报错。
  // 在注入类的mouted()中调用 this.x = this.jsonDataService.x;
  @Provide() jsonDataService = new JsonDataService();

  $refs!: {
    three: ThreeJs;
    luxian: LuXian;
    zongtisheji: ZongtiSheji;
    tabs: Tabs;
  };

  mounted() {
    this.currentTab = (this.$refs.tabs as any).panes[0];
    // if (this.currentTab && canSerialize(this.currentTab.$children[0])) {
    //   this.currentTab.$children[0].deserialize();
    // }
  }

  onTabClick(tab: any) {
    if (this.currentTab && canSerialize(this.currentTab.$children[0])) {
      this.currentTab.$children[0].serialize();
    }
    this.currentTab = tab;
    if (this.currentTab && canSerialize(this.currentTab.$children[0])) {
      this.currentTab.$children[0].deserialize();
    }
  }

  async save() {
    try {
      this.serialize();
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
    } catch (err) {
      this.$message({
        type: "error",
        message: err.message
      });
    }
  }

  async load() {
    try {
      const res1 = await axios.get(getAjaxUrl("/calc/parts/getAllPartsIndex"));
      console.log("得到零件库");
      const infoLJK = res1.data as JsonData;
      if (infoLJK.data) {
        this.jsonDataService.ljkJSON = infoLJK.data as LJK;
      }
      // this.setLJK();

      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      formdata.append("jsonFlg", "33");
      const res2 = await axios.post(
        getAjaxUrl("/calc/queryComponentInfo"),
        formdata
      );
      console.log("得到组件信息");
      const componentInfo = res2.data as ComponentInfo;
      // uiJSON
      if (componentInfo.uiJson) {
        this.jsonDataService.uiJSON = JSON.parse(componentInfo.uiJson);
      }
      // 全局JSON
      if (componentInfo.data.componentInputParamList.length !== 0) {
        const czJSON = componentInfo.data.componentInputParamList[0].inputParam;
        if (czJSON) {
          this.jsonDataService.exportJSON = JSON.parse(czJSON);
        } else {
          this.jsonDataService.exportJSON = JSON.parse(
            JSON.stringify(JsonDataService.defaultExportJSON)
          );
        }
      }

      const formdata2 = new FormData();
      formdata2.append("componentId", this.construct_id);
      formdata2.append("jsonFlg", "44");
      const res3 = await axios.post(
        getAjaxUrl("/calc/parts/getExportJSON"),
        formdata2
      );
      console.log("得到绘图设置");
      const data = res3.data as JsonData;
      if (data.data) {
        this.jsonDataService.htszJSON = JSON.parse(data.data);
      } else {
        this.jsonDataService.htszJSON = JSON.parse(
          JSON.stringify(JsonDataService.defaultHtszJSON)
        );
      }
      this.deserialize();
    } catch (err) {
      this.$message({
        type: "error",
        message: err.message
      });
    }
  }

  serialize() {
    console.log("开始序列化");
    this.$refs.luxian.serialize();
    this.$refs.zongtisheji.serialize();
    this.jsonDataService.uiJSON.isEmpty = "false";
    console.log("结束序列化");
  }

  deserialize() {
    console.log("开始反序列化");
    this.$refs.luxian.deserialize();
    this.$refs.zongtisheji.deserialize();
    this.jsonDataService.uiJSON.isEmpty = "false";
    console.log("结束反序列化");
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

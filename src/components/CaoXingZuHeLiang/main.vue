<template>
  <el-tabs type="border-card" style="width:100%;height:100%;border:0px" @tab-click="onTabClick" ref="tabs">
    <el-tab-pane label="路线">
      <GJ-luxian ref="luxian"></GJ-luxian>
    </el-tab-pane>
    <el-tab-pane label="总体设计">
      <zongti-sheji ref="zongtisheji"></zongti-sheji>
    </el-tab-pane>
    <el-tab-pane label="标准横断面">
      <GJ-BiaoZhunHengDuanMian ref="biaozhunhengduanmian"></GJ-BiaoZhunHengDuanMian>
    </el-tab-pane>
    <el-tab-pane label="立面">
      <limian ref="limian"></limian>
    </el-tab-pane>
    <el-tab-pane label="纵肋">
      <zonglei ref="zonglei"></zonglei>
    </el-tab-pane>
    <el-tab-pane label="横隔系">
      <GJ-henggexi ref="henggexi"></GJ-henggexi>
    </el-tab-pane>
    <el-tab-pane label="桥面板">
      <qiaomianban ref="qiaomianban"></qiaomianban>
    </el-tab-pane>
    <el-tab-pane label="附属">
      <fushu ref="fushu"></fushu>
    </el-tab-pane>
    <el-tab-pane label="绘图设置">
      <huitushezhi ref="huitushezhi"></huitushezhi>
    </el-tab-pane>
    <el-tab-pane label="图纸查看">
      <tuzhi-chakan @modelChange="onModelChange"></tuzhi-chakan>
    </el-tab-pane>
    <el-tab-pane label="三维模型">
      <model-viewer ref="modelViewer"></model-viewer>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { Persist, canSerialize } from "@/components/ConstructBase";
import { ThreeModelFile } from "@/components/ThreeJs.vue";
import { JsonDataService } from "./models/JsonDataService";
import LuXian from "@/components/CaoXingZuHeLiang/tabs/LuXian.vue";
import { State /*, Getter, Action, Mutation, namespace */ } from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import ZongtiSheji from "@/components/CaoXingZuHeLiang/tabs/ZongtiSheji.vue";
import TuzhiChakan from "@/components/CaoXingZuHeLiang/tabs/TuzhiChakan.vue";
import BiaoZhunHengDuanMian from "@/components/CaoXingZuHeLiang/tabs/BiaoZhunHengDuanMian.vue";
import LiMian from "@/components/CaoXingZuHeLiang/tabs/LiMian.vue";
import ZongLei from "@/components/CaoXingZuHeLiang/tabs/ZongLei.vue";
import FuShu from "@/components/CaoXingZuHeLiang/tabs/FuShu.vue";
import QiaoMianBan from "@/components/CaoXingZuHeLiang/tabs/QiaoMianBan.vue";
import HuiTuSheZhi from "@/components/CaoXingZuHeLiang/tabs/HuiTuSheZhi.vue";
import ModelViewer from "./tabs/ModelViewer.vue";
import HengGeXi from "@/components/CaoXingZuHeLiang/tabs/HengGeXi.vue";
import { JsonData } from "@/models/json-data";
import { ComponentInfo } from "./models/component-info";
import { LJK } from "./models/export-data";
import { Tabs } from "element-ui";

@Component({
  components: {
    "zongti-sheji": ZongtiSheji,
    "model-viewer": ModelViewer,
    "GJ-luxian": LuXian,
    "tuzhi-chakan": TuzhiChakan,
    "GJ-BiaoZhunHengDuanMian": BiaoZhunHengDuanMian,
    limian: LiMian,
    zonglei: ZongLei,
    fushu: FuShu,
    "GJ-henggexi": HengGeXi,
    qiaomianban: QiaoMianBan,
    huitushezhi: HuiTuSheZhi
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
    modelViewer: ModelViewer;
    luxian: LuXian;
    zongtisheji: ZongtiSheji;
    biaozhunhengduanmian: BiaoZhunHengDuanMian;
    limian: LiMian;
    zonglei: ZongLei;
    fushu: FuShu;
    qiaomianban: QiaoMianBan;
    huitushezhi: HuiTuSheZhi;
    tabs: Tabs;
    henggexi: HengGeXi;
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
      } else {
        console.log("保存组件信息");
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
      console.log("加载零件库");
      const infoLJK = res1.data as JsonData;
      if (infoLJK.data) {
        this.jsonDataService.ljkJSON = infoLJK.data as LJK;
      }
      // this.setLJK();

      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      const res2 = await axios.post(
        getAjaxUrl("/calc/queryComponentInfo"),
        formdata
      );
      console.log("加载组件信息");
      const componentInfo = res2.data as ComponentInfo;
      // uiJSON
      if (componentInfo.uiJson) {
        this.jsonDataService.uiJSON = JSON.parse(componentInfo.uiJson);
      }
      let exportJSONSet = false;
      let htszJSONSet = false;
      const componentInputParamList =
        componentInfo.data.componentInputParamList;
      for (const inputParam of componentInputParamList) {
        const jsonString = inputParam.inputParam;
        const json = JSON.parse(jsonString);
        if (inputParam.jsonFlag === "33") {
          this.jsonDataService.exportJSON = json;
          exportJSONSet = true;
        } else if (inputParam.jsonFlag === "44") {
          this.jsonDataService.htszJSON = json;
          htszJSONSet = true;
        }
      }
      if (!exportJSONSet) {
        this.jsonDataService.exportJSON = JSON.parse(
          JSON.stringify(JsonDataService.defaultExportJSON)
        );
      }
      if (!htszJSONSet) {
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
    if (this.currentTab && canSerialize(this.currentTab.$children[0])) {
      this.currentTab.$children[0].serialize();
    }
    this.jsonDataService.uiJSON.isEmpty = "false";
    console.log("结束序列化");
  }

  deserialize() {
    console.log("开始反序列化");
    if (this.currentTab && canSerialize(this.currentTab.$children[0])) {
      this.currentTab.$children[0].deserialize();
    }
    this.jsonDataService.uiJSON.isEmpty = "false";
    console.log("结束反序列化");
  }

  onModelChange(model: ThreeModelFile) {
    this.$refs.modelViewer.setModelFile(model);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

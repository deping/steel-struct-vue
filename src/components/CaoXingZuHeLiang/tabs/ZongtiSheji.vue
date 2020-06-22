<template>
  <div class="ZtSheJi">
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>一、结构形式</h3>
      </div>
      <div class="text-item">
        <el-select
          v-model="construct.type"
          placeholder="选择结构"
          class="flex-item"
        >
          <el-option
            v-for="(meta, index) of constructMetas"
            :label="meta.label"
            :value="index"
            :key="index"
            :disabled="meta.disabled"
          ></el-option>
        </el-select>
      </div>
      <div class="header">
        <h3>二、桥梁特征</h3>
      </div>
      <div class="flex-container-row">
        <div class="flex-container-col">
          <div class="border">
            <el-switch
              v-model="isJZ"
              active-text="简支"
              inactive-text="连续"
              disabled
            >
            </el-switch>
          </div>
          <br />
          <div class="border">
            <el-switch
              v-model="isDG"
              active-text="等高"
              inactive-text="变高"
              disabled
            >
            </el-switch>
          </div>
          <br />
          <div class="border">
            <el-switch
              v-model="isGQLSLJ"
              active-text="高强螺栓连接"
              inactive-text="全焊接"
              disabled
            >
            </el-switch>
          </div>
        </div>
        <br />
        <div class="flex-container-col">
          <div class="border">
            <el-switch
              v-model="isDK"
              active-text="等宽"
              inactive-text="变宽"
              disabled
            >
            </el-switch>
          </div>
          <br />
          <div class="border">
            <el-switch
              v-model="isXJHNTQMB"
              active-text="现浇混凝土桥面板"
              inactive-text="预制混凝土桥面板"
              disabled
            >
            </el-switch>
          </div>
        </div>
        <br />
        <div class="flex-container-col">
          <div class="border">
            <el-switch
              v-model="isZJ"
              active-text="正交"
              inactive-text="斜交"
              disabled
            >
            </el-switch>
          </div>
          <br />
          <div class="border">
            <el-switch
              v-model="isQMBDXB"
              active-text="桥面板单向板"
              inactive-text="桥面板双向板"
              disabled
            >
            </el-switch>
          </div>
          <br />
        </div>
      </div>
      <div class="header">
        <h3>三、总体设计</h3>
      </div>
      <div>
        <div class="flex-container-row">
          <div class="flex-container-col-between">
            <table cellspacing="10">
              <tr>
                <td class="title">伸缩缝宽</td>
                <td>
                  <el-input v-model="entriesZTSJ.ssfk" clearable></el-input>
                </td>
              </tr>
              <br />
              <tr>
                <td class="title">梁端距</td>
                <td>
                  <el-input v-model="entriesZTSJ.ldj" clearable></el-input>
                </td>
              </tr>
            </table>

            <el-button
              @click="submit"
              type="success"
              style="margin-top:15px;margin-left:50px"
              >提交</el-button
            >
          </div>
          <img
            id="widget-qltz-1"
            src="../imgs/papers/widget-qltz-1.png"
            width="400"
          />
        </div>
      </div>
    </div>
    <div id="graph">
      <div class="canvas">
        <fabric-canvas :showCoord="true" ref="canvas1" />
      </div>
      <div class="canvas">
        <fabric-canvas :showCoord="true" ref="canvas2" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, InjectReactive } from "vue-property-decorator";
import {
  State
  /* Getter, Action,  Mutation, namespace */
} from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import { isPoint } from "@/utils/misc";
import axios from "axios";
import FabricCanvas from "@/components/FabricCanvas.vue";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import { PreviewData } from "../models/preview-data";
import { Persist } from "@/components/ConstructBase";
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace rightHand {
  function loadObjects(ar: any[]): any[]; // fabric.Object[]
}

declare let fabric: any;

interface ConstructNode {
  id: number;
  name: string;
  desc?: string;
  type: string;
  needFill?: boolean;
}

@Component({
  components: {
    "fabric-canvas": FabricCanvas
  }
})
export default class ZongtiSheji extends Vue {
  name = "ZongtiSheji";

  isJZ = true;
  isDG = true;
  isGQLSLJ = true;
  isDK = true;
  isXJHNTQMB = true;
  isZJ = true;
  isQMBDXB = true;

  construct = {
    type: 0,
    name: "",
    desc: ""
  };

  entriesZTSJ: any = {
    ssfk: "40,40",

    ldj: "550,550"
  };

  constructMetas = [
    { label: "槽型组合梁", disabled: false },
    { label: "多主梁钢板梁", disabled: true },
    { label: "双主梁钢箱梁", disabled: true },
    { label: "整体式钢箱梁", disabled: true },
    { label: "分离式钢箱梁", disabled: true },
    { label: "窄箱梁", value: "zhai-xiang-liang", disabled: true }
  ];

  canvas1: any;
  canvas2: any;
  dataCanvas1: [] = [];
  dataCanvas2: [] = [];

  @State construct_id!: string;
  @State currentConstruct!: Vue & Persist;
  @InjectReactive() jsonDataService!: JsonDataService;

  $refs!: {
    canvas1: FabricCanvas;
    canvas2: FabricCanvas;
  };

  getZTJSON(): any {
    const ZTJSON = {
      MAIN: [
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "name"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "type"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "note1"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "note2"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "bk"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "zs"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "es"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "importFiles")
      ]
    };
    return ZTJSON;
  }

  serialize() {
    console.log("序列化 总体设计 开始");
    const es = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "es");
    if (es) {
      if (isPoint(this.entriesZTSJ.ssfk)) {
        es.v = this.entriesZTSJ.ssfk;
      }
    }
    const zs = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "zs");
    if (zs) {
      if (isPoint(this.entriesZTSJ.ldj)) {
        zs.v = this.entriesZTSJ.ldj;
      }
    }
    console.log("序列化 总体设计 完成");
  }

  deserialize() {
    console.log("反序列化 总体设计 开始");
    const es = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "es");
    if (es) {
      this.entriesZTSJ.ssfk = es.v;
    }
    const zs = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "zs");
    if (zs) {
      this.entriesZTSJ.ldj = zs.v;
    }
    console.log("反序列化 总体设计 完成");
  }

  async submit() {
    try {
      this.currentConstruct.serialize();
      const ZTJSON: string = await JSON.stringify(this.getZTJSON());
      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      formdata.append("json", encodeURIComponent(ZTJSON));
      const res = await axios.post(
        getAjaxUrl("/calc/jna/GetZTPreview"),
        formdata
      );

      const info = res.data as PreviewData;
      if (info.error === "") {
        const dataCanvas1 = JSON.parse(info.outLM) as [];
        const dataCanvas2 = JSON.parse(info.outPM) as [];
        this.$refs.canvas1.clear();
        this.$refs.canvas2.clear();
        const objs1 = rightHand.loadObjects(dataCanvas1);
        this.$refs.canvas1.loadObjects(objs1);
        const objs2 = rightHand.loadObjects(dataCanvas2);
        this.$refs.canvas2.loadObjects(objs2);
        this.$refs.canvas1.zoomToFit();
        this.$refs.canvas2.zoomToFit();
      }
    } catch (error) {
      this.$message({
        type: "error",
        message: "数据错误"
      });
    }
  }
}
</script>

<style scoped lang="scss">
div.ZtSheJi {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;

  #other {
    flex-grow: 0;
    width: calc(100% - 20px);
    height: auto;

    .flex-container-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      table {
        border: 1px solid #dee2e6;
        td.title {
          padding: 0.75rem;
          background: #8b8b8b;
          color: #fff;
        }
        td {
          text-align: center;
          background-color: rgba(0, 0, 0, 0);
          display: table-cell;
        }
      }

      img#widget-qltz-1 {
        margin-left: 10px;
      }
    }

    .flex-container-col {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .flex-container-col-between {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    .border {
      margin-right: 30px;
      padding: 10px;
      border: solid 1px;
      text-align: center;
      width: 85%;
    }

    .header {
      width: 112.3px;
    }

    .text-item {
      text-align: left;
    }
  }

  $canvas_margin: 10px;

  #graph {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-grow: 0;
    width: calc(100% - 20px);
    height: 420px;
    margin: 0px;

    .canvas {
      height: 400px;
      width: calc(50% - 1.5 * #{$canvas_margin});
      margin: $canvas_margin;
    }
  }
}
</style>
<style lang="scss"></style>
<style>
.el-checkbox.is-disabled
  span.el-checkbox__input.is-disabled
  + span.el-checkbox__label {
  color: #606266;
}
</style>

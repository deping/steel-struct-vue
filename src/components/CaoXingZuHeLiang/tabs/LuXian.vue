/* eslint-disable no-const-assign */
/* eslint-disable no-constant-condition */
<template>
  <div style="margin:20px 0 0 10px ">
    <div style="width:calc(100% - 10px)">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="DXF文件：">
          <div style="width:500px;text-align:left">
            <el-upload ref="upload" action :auto-upload="false" :on-change="onAddDxf" :limit=1>
              <el-button slot="trigger" size="small" type="primary">选取文件
              </el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="UploadFiles">上传文件</el-button>
              <el-button size="small" type="success" plain @click="downloadDxfFile()">平曲线丶竖曲线.DXF文件格式样例下载</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="起始桩号：">
          <div style="width:100px">
            <el-input type="number" v-model="form.qishizhuanghao"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe border>
        <el-table-column label="桩号">
          <template v-slot="scope">
            <el-select v-model="scope.row.bkl" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input type="number" v-model="scope.row.zh" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="左横坡%">
          <template v-slot="scope">
            <el-input type="number" v-model="scope.row.zhp" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="右横坡%">
          <template v-slot="scope">
            <el-input type="number" v-model="scope.row.yhp" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="inserttableData(scope.$index, tableData)">插入</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;">
        <el-button type="primary" @click="addtableData(tableData)" style="float:left; margin:10px 0 10px 0">增加行
        </el-button>
        <el-button type="success" style="margin-top:15px ;float:left; margin:10px 10px 0 10px" @click="submit()">提交
        </el-button>
      </div>
    </div>
    <div style="margin:80px 0 0 0px ;width:100%;display: flex;">
      <div style="width:calc(50% - 5px);height: 520px;margin: 0 5px 0 0;">
        <fabric-canvas :showCoord="true" ref="canvas1" />
      </div>
      <div style="width: calc(50% - 5px);height: 520px;;margin: 0 5px 0 0;">
        <fabric-canvas :showCoord="true" ref="canvas2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import {
  State
  /* Getter, Action,  Mutation, namespace */
} from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import * as FileSaver from "file-saver";
import { ElUpload2 } from "@/typings/element-ui";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import FabricCanvas from "@/components/FabricCanvas.vue";
import { PreviewData } from "../models/preview-data";
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace rightHand {
  function loadObjects(ar: any[]): any[]; // fabric.Object[]
}

@Component({
  components: {
    "fabric-canvas": FabricCanvas
  }
})
export default class LuXian extends Vue {
  name = "Lu-Xian";

  // 约定传给后端ID，区分上传文件类型。
  fileId = {
    FileDXF: "4"
  };

  valueL = 40000;

  @State construct_id!: string;

  @Inject() jsonDataService!: JsonDataService;

  $refs!: {
    upload: ElUpload2;
    canvas1: FabricCanvas;
    canvas2: FabricCanvas;
  };

  // DXF起始桩号
  form = {
    qishizhuanghao: "1010"
  };

  // 表格数据集 右横坡，桩号值，左横坡，桩号
  tableData = [
    { yhp: "-2", zh: "-40", zhp: "2", bkl: "BK0", bk: 0 },
    { yhp: "-2", zh: "40", zhp: "2", bkl: "BK1", bk: 1 }
  ];

  // select 数据集
  options = [
    {
      value: "BK0",
      label: "BK0"
    },
    { value: "BK1", label: "BK1" }
  ];

  // 添加文件、上传成功和上传失败时都会被调用
  // 但是我们是自己上传，所以只有添加文件是才会被调用
  async onAddDxf(
    file: ElUploadInternalFileDetail,
    fileList: ElUploadInternalFileDetail[]
  ) {
    const isDxf =
      file.name.substring(file.name.length - 4).toLowerCase() === ".dxf";

    if (!isDxf) {
      this.$message.error("只能上传DXF文件!");
      fileList.splice(fileList.indexOf(file), 1);
    }
  }

  // 上传文件方法
  async UploadFiles() {
    try {
      if (this.$refs.upload.uploadFiles.length > 0) {
        const formdata = new FormData();
        for (let i = 0; i < this.$refs.upload.uploadFiles.length; ++i) {
          formdata.append("fileName", this.$refs.upload.uploadFiles[i].raw);
        }
        formdata.append("componentId", this.construct_id);
        formdata.append("fileFlag", this.fileId.FileDXF);
        const res = await axios.post(
          getAjaxUrl("/zuul/calc/uploadFile"),
          formdata
        );
        if (res.data.code === "00100") {
          this.$refs.upload.clearFiles();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      } else {
        this.$message({
          message: "请选取文件后点击上传",
          type: "warning"
        });
      }
    } catch (error) {
      this.$message({
        message: "上传文件出错啦",
        type: "error"
      });
    }
  }

  // 下载示例文件
  async downloadDxfFile() {
    const res = await fetch(
      getAjaxUrl("/files/download/平曲线、竖曲线.DXF文件格式样例.dxf"),
      { method: "GET" }
    );
    const blob = await res.blob();
    // eslint-disable-next-line no-undef
    FileSaver.saveAs(blob, "平曲线、竖曲线.DXF文件格式样例.dxf");
  }

  // 顺序增加表格行
  addtableData(tableData: any[]) {
    tableData.push({ yhp: "", zh: "", zhp: "", bk: "BK0" });
  }

  // 插入增加表格行
  inserttableData(index: number, tableData: any[]) {
    tableData.splice(index + 1, 0, {
      yhp: "",
      zh: "",
      zhp: "",
      bk: "BK0"
    });
  }

  // 删除表格行
  handleDelete(index: number, tableData: any[]) {
    tableData.splice(index, 1);
  }

  // 查询LXJSON
  getLXJSON(): any {
    const main = this.jsonDataService.exportJSON.MAIN;
    const LXJSON = {
      MAIN: [
        main.find(e => e.aaak === "name"),
        main.find(e => e.aaak === "note1"),
        main.find(e => e.aaak === "note2"),
        main.find(e => e.aaak === "importFiles")
      ]
    };
    return LXJSON;
  }

  getStringDLHP() {
    let res = "";
    const BK_0: number = parseFloat(this.form.qishizhuanghao);
    this.tableData.forEach(value => {
      res += `${BK_0 +
        (value.bk === 1 ? this.valueL / 1000 : 0) +
        parseFloat(value.zh)},${value.zhp},${value.yhp};`;
    });
    return res.substring(0, res.length - 1);
  }

  // 路线序列化
  serialize() {
    console.log("序列化 路线 开始");
    const main = this.jsonDataService.exportJSON.MAIN;
    const qmCs = main.find(e => e.aaak === "qmCS");
    if (qmCs) {
      qmCs.v = this.getStringDLHP();
    }

    const importFiles = main.find(e => e.aaak === "importFiles");
    if (importFiles) {
      importFiles.v = "A.pm,A道路边线.dxf,A.ZDM,A.sup";
    }
    const bk = main.find(e => e.aaak === "bk");
    if (bk) {
      bk.v = this.form.qishizhuanghao;
    }
    this.jsonDataService.uiJSON.valueL = String(this.valueL);
    console.log("序列化 路线 完成");
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deserialize() {
    console.log("反序列化 路线 开始");
    const main = this.jsonDataService.exportJSON.MAIN;
    const bk = main.find(e => e.aaak === "bk");
    if (bk) {
      this.form.qishizhuanghao = bk.v;
    }
    this.valueL = parseFloat(this.jsonDataService.uiJSON.valueL);
    const BK_0: number = parseFloat(this.form.qishizhuanghao);
    const BK_1: number = BK_0 + this.valueL / 1000;
    this.tableData = [];
    const qmCS = main.find(e => e.aaak === "qmCS");
    if (qmCS) {
      qmCS.v.split(";").forEach(value => {
        const row: string[] = value.split(",");
        const tmp = {
          yhp: "",
          zh: "",
          zhp: "",
          bkl: "BK0",
          bk: 0
        };
        const bkLength: number = parseFloat(row[0]);
        if (bkLength <= (BK_0 + BK_1) / 2) {
          tmp.bk = 0;
          tmp.bkl = "BK0";
          tmp.zh = String(bkLength - BK_0);
        } else {
          tmp.bk = 1;
          tmp.bkl = "BK1";
          tmp.zh = String(bkLength - BK_1);
        }
        tmp.zhp = row[1];
        tmp.yhp = row[2];
        this.tableData.push(tmp);
      });
    }
    console.log("反序列化 路线 完成");
  }

  // 立即提交
  async submit() {
    try {
      this.serialize();
      const LXJSON: string = await JSON.stringify(this.getLXJSON());
      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      formdata.append("json", encodeURIComponent(LXJSON));
      const res = await axios.post(
        getAjaxUrl("/calc/jna/GetLXPreview"),
        formdata
      );
      const info = res.data as PreviewData;
      if (info.error === "") {
        this.$refs.canvas1.clear();
        this.$refs.canvas2.clear();
        const dataCanvas1 = JSON.parse(info.outLM) as [];
        const dataCanvas2 = JSON.parse(info.outPM) as [];
        const objs1 = rightHand.loadObjects(dataCanvas1);
        this.$refs.canvas1.loadObjects(objs1);
        const objs2 = rightHand.loadObjects(dataCanvas2);
        this.$refs.canvas2.loadObjects(objs2);
        this.$refs.canvas1.zoomToFit();
        this.$refs.canvas2.zoomToFit();
        const main = this.jsonDataService.exportJSON.MAIN;
        const glH = main.find(e => e.aaak === "glH");
        const outInfo = JSON.parse(info.outInfo);
        if (glH) {
          let tmp: number = Math.floor(parseInt(outInfo.L) / 22);
          if (tmp % 50 !== 0) {
            tmp += 50 - (tmp % 50);
          }
          glH.v = String(tmp);
        }
        this.jsonDataService.valueQB = parseInt(outInfo.QB);
      }
    } catch (error) {
      this.$message({
        type: "error",
        message: "提交出错啦"
      });
    }
  }
}
</script>
<style scoped lang="scss">
</style>
<style lang="scss">
.el-table .cell {
  display: flex;
}
</style>

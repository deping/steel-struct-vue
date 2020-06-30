<template>
  <div class="LiMian">
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>翼缘板厚度</h3>
      </div>
      <div class="text-item">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6' }"
        >
          <el-table-column label="参考线名称" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.ckxmc" placeholder="请选择">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="起点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.qdjzld" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="终点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.zdjzld" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="厚度">
            <template v-slot="scope">
              <el-input v-model="scope.row.hd" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addRow(scope.$index, tableData)"
                >插入</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="removeRow(scope.$index, tableData)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button
            type="primary"
            @click="addRow2(tableData)"
            style="float:left"
            >增加行</el-button
          >
        </div>
      </div>
    </div>
    <!-- 腹板厚度 -->
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>腹板厚度</h3>
      </div>
      <div class="text-item">
        <el-table
          :data="tableData_fb"
          stripe
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6' }"
        >
          <el-table-column label="参考线名称" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.ckxmc_fb" placeholder="请选择">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="起点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.qdjzld_fb" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="终点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.zdjzld_fb" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="厚度">
            <template v-slot="scope">
              <el-input v-model="scope.row.fbhd" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addRowfb(scope.$index, tableData_fb)"
                >插入</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="removeRowfb(scope.$index, tableData_fb)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button
            type="primary"
            @click="addRowafb(tableData_fb)"
            style="float:left"
            >增加行</el-button
          >
        </div>
      </div>
    </div>
    <!-- 底板厚度 -->
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>底板厚度</h3>
      </div>
      <div class="text-item">
        <el-table
          :data="tableData_db"
          stripe
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6' }"
        >
          <el-table-column label="参考线名称" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.ckxmc_db" placeholder="请选择">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="起点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.qdjzld_db" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="终点距左梁端">
            <template v-slot="scope">
              <el-input v-model="scope.row.zdjzld_db" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="厚度">
            <template v-slot="scope">
              <el-input v-model="scope.row.dbhd" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addRowdb(scope.$index, tableData_db)"
                >插入</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="removeRowdb(scope.$index, tableData_db)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button
            type="primary"
            @click="addRowadb(tableData_db)"
            style="float:left"
            >增加行</el-button
          >
        </div>
      </div>
    </div>
    <!-- 纵桥向横隔系布置 -->
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header" style="width: 170px;">
        <h3>纵桥向横隔系布置</h3>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="横隔板布置:">
          <el-input v-model="form.hgbbz"></el-input>
        </el-form-item>
        <el-form-item label="竖向加劲肋布置:">
          <el-input v-model="form.sxjjlbz"></el-input>
        </el-form-item>
        <el-form-item label="左端封板距离梁端:">
          <el-input v-model="form.zdfbjlld" disabled></el-input>
        </el-form-item>
        <el-form-item label="右端封板距离梁端:">
          <el-input v-model="form.ydfbjlld" disabled></el-input>
        </el-form-item>
        <el-form-item label="底板超出腹板的距离:">
          <el-input v-model="form.dbccfbjl" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 钢梁阶段布置 -->
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>钢梁阶段布置</h3>
      </div>
      <div class="text-item">
        <section></section>
        <el-table
          :data="tableData_gljd"
          stripe
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6' }"
        >
          <el-table-column label="接头名称" width="190px">
            <template v-slot="scope">
              <el-input v-model="scope.row.name" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="钢梁阶段划分">
            <template v-slot="scope">
              <el-input v-model="scope.row.dist" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="腹板连接">
            <template v-slot="scope">
              <el-select v-model="scope.row.fblj" placeholder="请选择">
                <el-option
                  v-for="item in options_gljd"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="底板连接">
            <template v-slot="scope">
              <el-select v-model="scope.row.dblj" placeholder="请选择">
                <el-option
                  v-for="item in options_gljd"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="底板纵肋连接">
            <template v-slot="scope">
              <el-select v-model="scope.row.dbzllj" placeholder="请选择">
                <el-option
                  v-for="item in options_gljd"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addRowgljd(scope.$index, tableData_gljd)"
                >插入</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="removeRowgljd(scope.$index, tableData_gljd)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form
          ref="form_gl"
          :model="form_gl"
          label-width="150px"
          label-position="left"
        >
          <el-form-item label="纵向接缝宽度:">
            <el-input v-model="form_gl.zxjfkd"></el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100%;">
          <el-button
            type="primary"
            @click="addRowagljd(tableData_gljd)"
            style="float:left; margin:10px 0 10px 0"
            >增加行</el-button
          >
          <el-button
            @click="submit"
            type="success"
            style="margin-top:15px ;float:left; margin:10px 10px 0 10px"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <div id="graph">
      <div class="canvas">
        <fabric-canvas :showCoord="true" ref="canvas" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import FabricCanvas from "@/components/FabricCanvas.vue";
import axios from "axios";
import {
  State
  /* Getter, Action,  Mutation, namespace */
} from "vuex-class";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import { Persist } from "@/components/ConstructBase";
import { getAjaxUrl } from "@/utils/path";
import { makeLabelValueArray } from "@/utils/misc";
import { PreviewData } from "../models/preview-data";
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
export default class LiMian extends Vue {
  name = "liMian";
  canvas: any;
  dataCanvas: [] = [];
  @State construct_id!: string;
  @State currentConstruct!: Vue & Persist;
  @Inject() jsonDataService!: JsonDataService;
  $refs!: {
    canvas: FabricCanvas;
  };

  getLMJSON(): any {
    const LMJSON = {
      MAIN: [
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "name"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "type"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "note1"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "note2"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "bk"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "zs"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "es"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "qmCS"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "hulan"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "pz"),
        this.jsonDataService.exportJSON.MAIN.find(
          e => e.aaak === "importFiles"
        ),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "fbLay"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "xfK"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbL"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "ckW"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "ckH"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "ckLS"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "ckRS"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dsc"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "tt"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dt"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "bt"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dunTopD"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "sybTopD"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "xbLenS"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "xbLenE"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "xbDS"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "xbDE"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "glH"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbDirect"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "fbt"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "yybB"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbCSType"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbExtendfb"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "qmbMat"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "gbMat"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "yybD"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "fbD"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbD"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "hgbLay"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "sxjjLLay"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "ygd"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "zxjtw"),
        this.jsonDataService.exportJSON.MAIN.find(
          e => e.aaak === "bHulanWaiBaoInLx"
        ),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "fbDirect"),
        this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "yybDirect")
      ],
      ZXJJL: this.jsonDataService.exportJSON.ZXJJL,
      ZXJT: this.jsonDataService.exportJSON.ZXJT
    };
    return LMJSON;
  }

  // 表格数据集 起点距左梁端 终点距左梁端 翼缘板厚度 参考线名称
  tableData = [
    {
      ckxmc: "DLX",
      qdjzld: "0",
      zdjzld: "9560",
      hd: "28"
    },
    {
      ckxmc: "DLX",
      qdjzld: "9560",
      zdjzld: "30660",
      hd: "46"
    },
    {
      ckxmc: "DLX",
      qdjzld: "30660",
      zdjzld: "39920",
      hd: "28"
    }
  ];

  // 参考线名称-腹板 起点距左梁端 终点距左梁端 腹板厚度
  tableData_fb = [
    {
      ckxmc_fb: "DLX",
      qdjzld_fb: "0",
      zdjzld_fb: "9560",
      fbhd: "16"
    },
    {
      ckxmc_fb: "DLX",
      qdjzld_fb: "9560",
      zdjzld_fb: "30660",
      fbhd: "16"
    },
    {
      ckxmc_fb: "DLX",
      qdjzld_fb: "30660",
      zdjzld_fb: "39920",
      fbhd: "16"
    }
  ];

  // 参考线名称-底板 起点距左梁端 终点距左梁端 底板厚度
  tableData_db = [
    {
      ckxmc_db: "DLX",
      qdjzld_db: "0",
      zdjzld_db: "9260",
      dbhd: "28"
    },
    {
      ckxmc_db: "DLX",
      qdjzld_db: "9260",
      zdjzld_db: "30660",
      dbhd: "44"
    },
    {
      ckxmc_db: "DLX",
      qdjzld_db: "30660",
      zdjzld_db: "39920",
      dbhd: "28"
    }
  ];

  // 接头名称 钢梁阶段划分 腹板连接 底板链接 底板纵肋连接
  tableData_gljd = [
    {
      name: "接头1",
      dist: "6835",
      fblj: "FB401",
      dblj: "DB401",
      dbzllj: "ZXJJL40"
    },
    {
      name: "接头2",
      dist: "15585",
      fblj: "FB401",
      dblj: "DB401",
      dbzllj: "ZXJJL40"
    },
    {
      name: "接头3",
      dist: "24355",
      fblj: "FB401",
      dblj: "DB401",
      dbzllj: "ZXJJL40"
    },
    {
      name: "接头4",
      dist: "33085",
      fblj: "FB401",
      dblj: "DB401",
      dbzllj: "ZXJJL40"
    }
  ];

  // 参考线名称
  options = [
    { value: "DLX", label: "道路设计线" },
    { value: "XLCen1", label: "箱梁中心线1" },
    { value: "XLCen2", label: "箱梁中心线2" }
  ];

  // 钢梁阶段布置下拉框
  options_gljd = [
    "FB401",
    "FB402",
    "DB401",
    "DB401",
    "DB402",
    "ZXJJL40",
    "FB451",
    "FB452",
    "DB451",
    "DB452",
    "ZXJJL45",
    "FB501",
    "FB502",
    "DB501",
    "DB502",
    "ZXJJL50",
    "FB601",
    "FB601",
    "DV601",
    "DB602",
    "ZXJJL60"
  ];

  // 纵桥向横隔系布置默认值
  form = {
    hgbbz: "BK0+550,M1-15000,6*5000,BK1-550",
    sxjjlbz: "R1115,6*L1250,L1115",
    zdfbjlld: "",
    ydfbjlld: "",
    dbccfbjl: ""
  };

  // 钢梁阶段布置‘纵向接缝宽度’表单数据
  form_gl = {
    zxjfkd: "10"
  };

  // 获取‘翼缘板厚度’表格数据
  getStringYYBHD(tableData: any[]) {
    let res: any = [];
    tableData.forEach(value => {
      res += `${value.ckxmc},${value.qdjzld},${value.zdjzld},${value.hd};`;
    });
    return res.substring(0, res.length - 1);
  }

  // 获取‘腹板厚度’表格数据
  getStringFBBHD(tableData_fb: any[]) {
    let res_fb: any = [];
    tableData_fb.forEach(value => {
      res_fb += `${value.ckxmc_fb},${value.qdjzld_fb},${value.zdjzld_fb},${value.fbhd};`;
    });
    return res_fb.substring(0, res_fb.length - 1);
  }

  // 获取‘底板厚度’表格数据
  getStringDBHD(tableData_db: any[]) {
    let res_db: any = [];
    tableData_db.forEach(value => {
      res_db += `${value.ckxmc_db},${value.qdjzld_db},${value.zdjzld_db},${value.dbhd};`;
    });
    return res_db.substring(0, res_db.length - 1);
  }

  // 获取‘钢梁阶段布置’表格数据
  getStringGLJDBZ(tableData_gljd: any[]) {
    let res_gljd: any = [];
    tableData_gljd.forEach(value => {
      res_gljd += `${value.name},${value.dist},${value.fblj},${value.dblj},${value.dbzllj};`;
    });
    return res_gljd.substring(0, res_gljd.length - 1);
  }

  // 序列化
  serialize() {
    console.log("序列化 立面 开始");
    // 翼缘板数据
    const yy = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "yybD"
    );
    if (yy) {
      yy.v = this.getStringYYBHD(this.tableData);
    }
    // 腹板数据
    const fb = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "fbD");
    if (fb) {
      fb.v = this.getStringFBBHD(this.tableData_fb);
    }
    // 底板数据
    const db = this.jsonDataService.exportJSON.MAIN.find(e => e.aaak === "dbD");
    if (db) {
      db.v = this.getStringDBHD(this.tableData_db);
    }
    // 纵桥向横隔系布置
    // 横隔板布置
    const hgbbz = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "hgbLay"
    );
    if (hgbbz) {
      hgbbz.v = this.form.hgbbz;
    }
    // 竖向加劲肋布置
    const sxjjlbz = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "sxjjLLay"
    );
    if (sxjjlbz) {
      sxjjlbz.v = this.form.sxjjlbz;
    }
    // 钢梁阶段布置
    const zxjfkd = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "zxjtw"
    );
    if (zxjfkd) {
      zxjfkd.v = this.form_gl.zxjfkd;
    }
    console.log("序列化 立面 完成");
  }

  // 反序列化
  deserialize() {
    this.options = makeLabelValueArray(
      "箱梁中心线",
      "XLCen",
      1,
      this.jsonDataService.amoutGZL,
      [{ value: "DLX", label: "道路设计线" }]
    );

    console.log("反序列化 立面 开始");

    // 翼缘板数据反序列化
    this.tableData = [];
    const yy = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "yybD"
    );
    if (yy && yy.v) {
      yy.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = { ckxmc: "", qdjzld: "", zdjzld: "", hd: "" };
          const col: string[] = row.split(",");
          tmp.ckxmc = col[0];
          tmp.qdjzld = col[1];
          tmp.zdjzld = col[2];
          tmp.hd = col[3];
          this.tableData.push(tmp);
        });
    }

    // 腹板数据反序列化
    this.tableData_fb = [];
    const yy_fb = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "fbD"
    );
    if (yy_fb && yy_fb.v) {
      yy_fb.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = { ckxmc_fb: "", qdjzld_fb: "", zdjzld_fb: "", fbhd: "" };
          const col: string[] = row.split(",");
          tmp.ckxmc_fb = col[0];
          tmp.qdjzld_fb = col[1];
          tmp.zdjzld_fb = col[2];
          tmp.fbhd = col[3];
          this.tableData_fb.push(tmp);
        });
    }

    // 底板数据反序列化
    this.tableData_db = [];
    const yy_db = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "dbD"
    );
    if (yy_db && yy_db.v) {
      yy_db.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = { ckxmc_db: "", qdjzld_db: "", zdjzld_db: "", dbhd: "" };
          const col: string[] = row.split(",");
          tmp.ckxmc_db = col[0];
          tmp.qdjzld_db = col[1];
          tmp.zdjzld_db = col[2];
          tmp.dbhd = col[3];
          this.tableData_db.push(tmp);
        });
    }

    // 纵桥向横隔系布置
    // 横隔板布置
    const hgbbz = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "hgbLay"
    );
    if (hgbbz) {
      this.form.hgbbz = hgbbz.v;
    }
    // 竖向加劲肋布置
    const sxjjlbz = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "sxjjLLay"
    );
    if (sxjjlbz) {
      this.form.sxjjlbz = sxjjlbz.v;
    }
    // 钢梁阶段布置
    this.tableData_gljd = [];
    const data =
      "接头1,6835,FB401,DB401,ZXJJL40;接头2,15585,FB401,DB401,ZXJJL40;接头3,24355,FB401,DB401,ZXJJL40;接头4,33085,FB401,DB401,ZXJJL40";
    data
      .split(";")
      .filter(e => e !== "")
      .forEach(row => {
        const tmp = { name: "", dist: "", fblj: "", dblj: "", dbzllj: "" };
        const col: string[] = row.split(",");
        tmp.name = col[0];
        tmp.dist = col[1];
        tmp.fblj = col[2];
        tmp.dblj = col[3];
        tmp.dbzllj = col[4];
        this.tableData_gljd.push(tmp);
      });
    const zxjfkd = this.jsonDataService.exportJSON.MAIN.find(
      e => e.aaak === "zxjtw"
    );
    if (zxjfkd) {
      this.form_gl.zxjfkd = zxjfkd.v;
    }
    console.log("反序列化 立面 结束");
  }

  // 提交出图
  async submit() {
    try {
      this.currentConstruct.serialize();
      const LMJSON: string = await JSON.stringify(this.getLMJSON());
      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      formdata.append("json", encodeURIComponent(LMJSON));
      const res = await axios.post(
        getAjaxUrl("/calc/jna/GetZXPreview"),
        formdata
      );
      const info = res.data as PreviewData;
      if (info.error === "") {
        this.dataCanvas = JSON.parse(info.out) as [];
        this.$refs.canvas.clear();
        const objs = rightHand.loadObjects(this.dataCanvas);
        this.$refs.canvas.loadObjects(objs);

        this.$refs.canvas.zoomToFit();

        const res_hg = await axios.post(
          getAjaxUrl("/calc/jna/GetHGXGZ"),
          formdata
        );
        const info_hg = res_hg.data as PreviewData;
        if (info_hg.error === "") {
          this.jsonDataService.hgxgzJSON = JSON.parse(info_hg.outJsonContent);
        }
      }
    } catch (error) {
      this.$message({
        type: "error",
        message: "数据错误"
      });
    }
  }

  // 翼缘板最后一行加入行
  addRow2(tableData: any[]) {
    tableData.push({ qdjzld: "", zdjzld: "", hd: "", ckxmc: "DLX" });
  }

  // 翼缘板插入行
  addRow(index: number, tableData: any[]) {
    tableData.splice(index + 1, 0, {
      qdjzld: "",
      zdjzld: "",
      hd: "",
      ckxmc: "DLX"
    });
  }

  // 翼缘板删除当前行
  removeRow(index: number, tableData: any[]) {
    tableData.splice(index, 1);
  }

  // 腹板最后一行加入
  addRowafb(tableData_fb: any[]) {
    tableData_fb.push({
      qdjzld_fb: "",
      zdjzld_fb: "",
      fbhd: "",
      ckxmc_fb: "DLX"
    });
  }

  // 腹板插入行
  addRowfb(index: number, tableData_fb: any[]) {
    tableData_fb.splice(index + 1, 0, {
      qdjzld_fb: "",
      zdjzld_fb: "",
      fbhd: "",
      ckxmc_fb: "DLX"
    });
  }

  // 腹板删除当前行
  removeRowfb(index: number, tableData_fb: any[]) {
    tableData_fb.splice(index, 1);
  }

  // 底板最后一行加入
  addRowadb(tableData_db: any[]) {
    tableData_db.push({
      qdjzld_db: "",
      zdjzld_db: "",
      dbhd: "",
      ckxmc_db: "DLX"
    });
  }

  // 底板插入行
  addRowdb(index: number, tableData_db: any[]) {
    tableData_db.splice(index + 1, 0, {
      qdjzld_db: "",
      zdjzld_db: "",
      dbhd: "",
      ckxmc_db: "DLX"
    });
  }

  // 底板删除当前行
  removeRowdb(index: number, tableData_db: any[]) {
    tableData_db.splice(index, 1);
  }

  // 钢梁阶段布置增加行
  addRowagljd(tableData_gljd: any[]) {
    tableData_gljd.push({
      name: "",
      dist: "",
      fblj: "FB401",
      dblj: "FB401",
      dbzllj: "FB401"
    });
  }

  // 钢梁阶段布置插入行
  addRowgljd(index: number, tableData_gljd: any[]) {
    tableData_gljd.splice(index + 1, 0, {
      name: "",
      dist: "",
      fblj: "FB401",
      dblj: "FB401",
      dbzllj: "FB401"
    });
  }

  // 钢梁阶段布置删除当前行
  removeRowgljd(index: number, tableData_gljd: any[]) {
    tableData_gljd.splice(index, 1);
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 112.3px;
}
div.LiMian {
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
    width: calc(100% - 1.5 * #{$canvas_margin});
    margin: $canvas_margin;
  }
}
</style>
<style lang="scss"></style>

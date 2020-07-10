<template>
  <div style="margin:20px 0 0 10px ;width:98%">
    <!-- 一丶桥面铺装-->
    <div>
      <h3 align="left">一丶桥面铺装</h3>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column label="铺装名称">
          <template v-slot="scope">
            <el-input v-model="scope.row.pz" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="材料类型">
          <template v-slot="scope">
            <el-select v-model="scope.row.value">
              <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="铺装厚度(mm)">
          <template v-slot="scope">
            <el-input v-model="scope.row.pzhd" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="inserttableData(scope.$index, tableData)">插入</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;text-align:center;">
        <el-button type="primary" @click="addtableData(tableData)" style="float:left ;margin:10px 0 10px 0 ">增加行
        </el-button>
      </div>
    </div>

    <!-- 二丶护栏 -->
    <div style="margin-top: 70px;">
      <h3 align="left">二、护栏</h3>
      <div class="hulan">
        <div class="hulan-left">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="护栏：">
              <el-select v-model="form.HuLan" @change="change(form.HuLan)">
                <el-option v-for="(item,index) in HuLanoptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="路基：" v-if="form.HuLan !== '与路基齐平'">
              <el-select v-model="form.luji">
                <el-option v-for="(item,index) in LuJioptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽度[WB]：">
              <el-input v-model="form.waibao" style="width:210px"></el-input>
            </el-form-item>
            <el-form-item label="护栏类型：">
              <el-select v-model="form.leixing">
                <el-option v-for="(item,index) in LeiXingoptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="hulan-right" v-if="form.HuLan !== '与路基齐平'">
          <div style="width:100%">
            <img :src="imgsURL" style="width:100%;margin: 0 0 20px 0" />
          </div>
        </div>
      </div>
    </div>

    <!-- 三丶桥面板 -->
    <div style="margin-top: 50px;">
      <h3 align="left">三、桥面板</h3>
      <div class="hulan">
        <div class="hulan-left">
          <el-select v-model="QMBform.QiaoMianBan" placeholder="请选择" style="margin: 0 540px 10px 0">
            <el-option v-for="(item,index) in QiaoMianBanoptions" :key="index" :label="item.label" :value="item.label"
                       :disabled="item.disabled"></el-option>
          </el-select>
          <el-form ref="QMBform" :model="QMBform" label-width="200px" label-position="left">
            <!-- 滴水槽 -->
            <div v-if="form.HuLan === '内缩' " style="height:398px;margin-bottom:30px">
              <el-form-item label="滴水槽设计"></el-form-item>
              <el-form-item label="距离梁端SX：">
                <el-input v-model="QMBform.liangduanSX"></el-input>
              </el-form-item>
              <el-form-item label="半径R：">
                <el-input v-model="QMBform.banjingR"></el-input>
              </el-form-item>
            </div>
            <!-- 悬臂 -->
            <div style="height:398px ;margin-top:220px">
              <el-form-item label="桥面板厚度" v-if="QMBform.QiaoMianBan === '等厚'">
                <el-input v-model="QMBform.DengHou"></el-input>
              </el-form-item>
              <el-form-item label="1丶桥面板标准厚度BKH：">
                <el-input v-model="QMBform.qmbbzhd"></el-input>
              </el-form-item>
              <el-form-item label="2丶悬臂设计"></el-form-item>
              <el-form-item label="2.1 外悬臂等厚段厚度BD：">
                <el-input v-model="QMBform.xuanbihd"></el-input>
              </el-form-item>
              <el-form-item label="2.2 外悬臂渐变段长度X：">
                <el-input v-model="QMBform.xuanbijb"></el-input>
              </el-form-item>
            </div>
            <!-- 承托 -->
            <div style="height:398px ;margin-top:220px">
              <el-form-item label="3丶承托设计"></el-form-item>
              <el-form-item label="3.1 腹板处桥面板厚度BCH：">
                <el-input v-model="QMBform.qiaomianbanBCH"></el-input>
              </el-form-item>
              <el-form-item label="3.2 箱内渐变段长度X：">
                <el-input v-model="QMBform.xiangnei"></el-input>
              </el-form-item>
              <el-form-item label="3.3 承托宽度：">
                <el-input v-model="QMBform.chengtuo"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="hulan-right">
          <div v-if="form.HuLan === '内缩'" style=" margin-bottom:30px">
            <img :src="dishuicaoURL" style="width:100%" />
          </div>
          <div style="margin-top:20px">
            <img :src="xuanbiURL" style="width:100%" />
          </div>
          <div style="margin-top:20px">
            <img :src="chengtuoURL" style="width:100%" />
          </div>
        </div>
      </div>
    </div>

    <!-- 四丶钢主梁 -->
    <div style="margin-top: 50px;">
      <h3 align="left">四丶钢主梁</h3>
      <div>
        <div>
          <el-form ref="form" :model="GangLiangform">
            <div class="hulan-left">
              <el-form-item label="4.1 钢梁材质">
                <el-select v-model="GangLiangform.GangLiangCZ" @change="Gangliangchange(GangLiangform.GangLiangCZ)"
                           style="width:380px">
                  <el-option v-for="(item,index ) in GangLiangoptions" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="GangLiangform.GLcaizhi" style="width:120px">
                  <el-option v-for="(item,index) in GangLiang2options" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="4.2 钢主梁在桥梁宽度内的片数设计">
                <el-select v-model="GangLiangform.GLpianshu" style="width:100px;margin-right:20px">
                  <el-option v-for="(item,index) in GangZhuLiangoptions" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-button size="small" type="primary" @click="autoCalcGZL()">根据梁宽自动计算</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <p align="left" style="color:rgba(0,0,0,.87);font-size:20px;">
                {{this.pianming[GangLiangform.GLpianshu - 2]}}主梁(梁宽{{this.valueQB}}mm)</p>
            </el-form-item>
            <el-form-item>
              <el-table :data="GangZLData[GangLiangform.GLpianshu - 2]" style="width: 100%" border>
                <el-table-column label="左悬臂">
                  <template v-slot="props">
                    <el-input v-model="props.row.zxb"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="箱室宽度（GL-1）">
                  <template v-slot="props">
                    <el-input v-model="props.row.gl1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="箱间宽度">
                  <template v-slot="props">
                    <el-input v-model="props.row.xjkd1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="箱室宽度（GL-2）">
                  <template v-slot="props">
                    <el-input v-model="props.row.gl2"></el-input>
                  </template>
                </el-table-column>
                <div v-if="GangLiangform.GLpianshu > 2">
                  <el-table-column label="箱间宽度">
                    <template v-slot="props">
                      <el-input v-model="props.row.xjkd2"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="箱室宽度（GL-3）">
                    <template v-slot="props">
                      <el-input v-model="props.row.gl3"></el-input>
                    </template>
                  </el-table-column>
                </div>
                <div v-if="GangLiangform.GLpianshu > 3">
                  <el-table-column label="箱间宽度">
                    <template v-slot="props">
                      <el-input v-model="props.row.xjkd3"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="箱室宽度（GL-4）">
                    <template v-slot="props">
                      <el-input v-model="props.row.gl4"></el-input>
                    </template>
                  </el-table-column>
                </div>
                <div v-if="GangLiangform.GLpianshu > 4">
                  <el-table-column label="箱间宽度">
                    <template v-slot="props">
                      <el-input v-model="props.row.xjkd4"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="箱室宽度（GL-5）">
                    <template v-slot="props">
                      <el-input v-model="props.row.gl5"></el-input>
                    </template>
                  </el-table-column>
                </div>
                <div v-if="GangLiangform.GLpianshu > 5">
                  <el-table-column label="箱间宽度">
                    <template v-slot="props">
                      <el-input v-model="props.row.xjkd5"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="箱室宽度（GL-6）" width="150">
                    <template v-slot="props">
                      <el-input v-model="props.row.gl6"></el-input>
                    </template>
                  </el-table-column>
                </div>
                <el-table-column label="右悬臂">
                  <template v-slot="props">
                    <el-input v-model="props.row.yxb"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <!-- 4.3 翼缘板 -->
            <div class="hulan" style="margin-top:100px">
              <div style="width:30%">
                <el-form-item label="4.3 翼缘板宽度[YK]">
                  <el-input v-model="GangLiangform.Yybkd" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="4.3 翼缘板厚度变化">
                  <el-select v-model="GangLiangform.Yybhd" style="width:100px;">
                    <el-option v-for="(item,index) in Yybhdoptions" :key="index" :label="item.label" :value="item.label"
                               :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="width:70%">
                <div style="width:100%">
                  <img :src="gzlURL" style="width:100%;" />
                </div>
              </div>
            </div>
            <!-- 4.4 钢主梁高度[GH] -->
            <div style="width:30%">
              <el-form-item label="4.4 钢主梁高度[GH]">
                <el-input v-model="GangLiangform.Gzlgd" style="width:100px;"></el-input>
              </el-form-item>
            </div>
            <!-- 4.5 腹板设计 -->
            <div class="hulan" style="margin-top:100px">
              <div style="width:30%">
                <el-form-item label="4.5 腹板设计"></el-form-item>
                <el-form-item label="腹板斜率  方式">
                  <el-select v-model="GangLiangform.Fbxlfs">
                    <el-option v-for="(item,index) in Fubanoptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="钢梁编号">
                  <el-table :data="FuBanGangLiangtableData[GangLiangform.GLpianshu-2]"
                            @selection-change="handleSelectionChange" :row-key="'id'" style="width: 100%"
                            ref="shuiPingGangLiangtable" v-if="GangLiangform.Fbxlfs ==='水平尺寸' ">
                    <el-table-column prop="dbkd" label="钢梁编号"></el-table-column>
                    <el-table-column label="值">
                      <template v-slot="scope">
                        <el-input v-model="scope.row.zhi" :disabled="scope.row.disabled"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="是否竖直">
                      <el-table-column type="selection" width="80"></el-table-column>
                    </el-table-column>
                  </el-table>
                  <el-table :data="FuBanGangLiangXielvtableData[GangLiangform.GLpianshu-2]" :row-key="'id'"
                            @selection-change="GdxlSelectionChange" style="width: 100%" ref="guDingXieLvGangLiangTable"
                            v-if="GangLiangform.Fbxlfs ==='固定斜率' || this.isFuBanXieLV ">
                    <el-table-column prop="dbkd" label="钢梁编号"></el-table-column>
                    <el-table-column label="值">
                      <template v-slot="select">
                        <el-select v-model="select.row.xielv" :disabled="select.row.disabled">
                          <el-option v-for="(item,index) in XieLvoptions" :key="index" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="是否竖直">
                      <el-table-column type="selection" width="80"></el-table-column>
                    </el-table-column>
                  </el-table>
                </el-form-item>
                <el-form-item label="腹板厚度变化">
                  <el-select v-model="GangLiangform.FBhdbh">
                    <el-option v-for="(item,index) in GLFuBanHouDuoptions" :key="index" :label="item.label"
                               :value="item.label" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="width:70%">
                <div style="width:100%;margin-top:70px">
                  <img :src="fbsjURL" style="width:100%" />
                </div>
              </div>
            </div>
            <!-- 4.6 底板设计 -->
            <div class="hulan" style="margin-top:100px">
              <div style="width:30%">
                <el-form-item label="4.6 底板设计"></el-form-item>
                <el-form-item label="底板厚度变化">
                  <el-select v-model="GangLiangform.DBhdbh">
                    <el-option v-for="(item,index) in GLDiBanHouDuoptions" :key="index" :label="item.label"
                               :value="item.label" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="底板斜率变化">
                  <el-select v-model="GangLiangform.DBxl">
                    <el-option v-for="(item,index) in GLDiBanXieLvoptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="底板外伸[DS]">
                  <el-input v-model="GangLiangform.DBws" style="width:210px"></el-input>
                </el-form-item>
              </div>
              <div style="width:70%">
                <div style="width:100%;margin-top:70px">
                  <img :src="dbwsURL" style="width:100%" />
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-button type="success" style="margin-top:15px ;float:left; margin:20px 10px 0 0" @click="submit()">提交</el-button>
    <div style="margin:80px 0 0 0px ;width:100%;">
      <div style="height: 400px;">
        <fabric-canvas :showCoord="true" ref="canvas1" />
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
import { amountBeamByQB } from "@/utils/bridge";
import axios from "axios";
import { ElUpload2 } from "@/typings/element-ui";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import FabricCanvas from "@/components/FabricCanvas.vue";
import { PreviewData } from "../models/preview-data";
// import { Row } from "element-ui";
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace rightHand {
  function loadObjects(ar: any[]): any[]; // fabric.Object[]
}

@Component({
  components: {
    "fabric-canvas": FabricCanvas
  }
})
export default class BiaoZhunHengDuanMian extends Vue {
  name = "BiaoZhun-HengDuanMian";
  imgsURL = require("../imgs/widget-hl-1.png");
  dishuicaoURL = require("../imgs/widget-qmb-dsc.png");
  xuanbiURL = require("../imgs/widget-qmb-szct-2.png");
  chengtuoURL = require("../imgs/widget-qmb-szct-3.png");
  gzlURL = require("../imgs/widget-gzl-4.3.png");
  fbsjURL = require("../imgs/widget-gzl-4.5-1.png");
  dbwsURL = require("../imgs/widget-gzl-4.6.png");
  @Inject() jsonDataService!: JsonDataService;
  @State construct_id!: string;
  $refs!: {
    upload: ElUpload2;
    canvas1: FabricCanvas;
    shuiPingGangLiangtable: any;
    guDingXieLvGangLiangTable: any;
  };

  isFuBanXieLV = true;
  EnumHL = "FS护栏";
  pianming = ["两片", "三片", "四片", "五片", "六片"];
  valueQB = 0;
  // 一丶桥面铺装数据集
  tableData = [
    { pz: "沥青砼铺装", pzhd: "100", value: "沥青" },
    { pz: "防水层", pzhd: "", value: "防水涂料" }
  ];

  // 二丶 护栏数据集
  form = {
    HuLan: "外包",
    luji: "外包在路基宽度内",
    waibao: "100",
    leixing: "HL200×1000WB"
  };

  // 三丶桥面板数据集
  QMBform = {
    liangduanSX: "150", // 距离梁端SX
    banjingR: "50", // 半径R
    qmbbzhd: "350", // 桥面板标准厚度
    xuanbihd: "250", // 外悬臂等厚段厚度
    xuanbijb: "400", // 外悬臂渐变段长度
    DengHou: "350", // 桥面板等厚input
    qiaomianbanBCH: "350", // 腹板处桥面板厚度BCH
    xiangnei: "400", // 箱内渐变段长度X
    chengtuo: "600", // 承托高度
    QiaoMianBan: "设置承托" // 桥面板第一个select
  };

  // 四丶 钢主梁Table数据集
  GangZLData = [
    [
      {
        zxb: "",
        gl1: "",
        xjkd1: "",
        gl2: "",
        yxb: ""
      }
    ],
    [
      {
        zxb: "",
        gl1: "",
        xjkd1: "",
        gl2: "",
        xjkd2: "",
        gl3: "",
        yxb: ""
      }
    ],
    [
      {
        zxb: "",
        gl1: "",
        xjkd1: "",
        gl2: "",
        xjkd2: "",
        gl3: "",
        xjkd3: "",
        gl4: "",
        yxb: ""
      }
    ],
    [
      {
        zxb: "",
        gl1: "",
        xjkd1: "",
        gl2: "",
        xjkd2: "",
        gl3: "",
        xjkd3: "",
        gl4: "",
        xjkd4: "",
        gl5: "",
        yxb: ""
      }
    ],
    [
      {
        zxb: "",
        gl1: "",
        xjkd1: "",
        gl2: "",
        xjkd2: "",
        gl3: "",
        xjkd3: "",
        gl4: "",
        xjkd4: "",
        gl5: "",
        xjkd5: "",
        gl6: "",
        yxb: ""
      }
    ]
  ];

  // select数据集
  options = ["沥青", "防水涂料"];

  // select类型数据集
  LeiXingoptions = ["HL200×1000WB", "HL200×1000"];

  // select路基数据集
  LuJioptions = ["外包在路基宽度内", "外包在路基宽度外"];

  // select护栏数据集
  HuLanoptions = ["外包", "内缩", "与路基齐平"];

  // select 钢梁材质第一个下拉框数据集
  GangLiangoptions = [
    "《低合金高强度结构钢》（GB/T 1591-2018）",
    "《桥梁用结构钢》（GB/T 714-2015）",
    "《耐候结构钢》（GB/T 4171-2008）",
    "《碳素结构钢》（GB/T 700-2006）"
  ];

  // select 钢梁材质第二个下拉框数据集
  GangLiang2options = ["Q355B", "Q355C", "Q355D", "Q390B", "Q390C", "Q390D"];

  // select 钢主梁在桥梁宽度内的片数设计下拉框数据集
  GangZhuLiangoptions = [2, 3, 4, 5, 6];

  // select 腹板斜率方式数据集
  Fubanoptions = ["水平尺寸", "固定斜率"];

  // select 腹板钢梁编号斜率方式数据集
  XieLvoptions = ["1:2", "1:2.5", "1:3", "1:3.5", "1:4", "1:4.5", "1:5"];

  // select桥面板数据集
  QiaoMianBanoptions = [
    { label: "等厚", disabled: true },
    { label: "设置承托", disabled: false }
  ];

  // select翼缘板厚度变化数据集
  Yybhdoptions = [
    { label: "顶缘对齐", disabled: false },
    { label: "底缘对齐", disabled: true }
  ];

  // select钢梁腹板厚度数据集
  GLFuBanHouDuoptions = [
    { label: "外缘对齐", disabled: false },
    { label: "内缘对齐", disabled: true },
    { label: "中心对齐", disabled: true }
  ];

  // select 钢梁底板厚度数据集
  GLDiBanHouDuoptions = [
    { label: "顶缘对齐", disabled: false },
    { label: "底缘对齐", disabled: true }
  ];

  // select 钢梁底板斜率数据集
  GLDiBanXieLvoptions = ["随横坡", "水平"];

  // 四 钢梁form数据集
  GangLiangform = {
    GangLiangCZ: "《低合金高强度结构钢》（GB/T 1591-2018）", // 钢梁材质
    GLcaizhi: "Q355B", // 钢梁材质第二个下拉框
    GLpianshu: 2, // 钢主梁在桥梁宽度内的片数设计
    Yybkd: "600", // 翼缘板宽度
    Yybhd: "顶缘对齐", // 翼缘板厚度
    Gzlgd: "1830", // 钢主梁高度
    Fbxlfs: "水平尺寸", // 腹板斜率方式
    FBhdbh: "外缘对齐", // 刚腹板厚度变化
    DBhdbh: "顶缘对齐", // 底板厚度变化
    DBxl: "随横坡", // 底板斜率
    DBws: "100" // 底板外伸
  };

  // 4.5腹板设计  水平尺寸钢梁编号
  FuBanGangLiangtableData = [
    [
      { dbkd: "GL-1 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-1 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-2 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-2 右底板宽度[DKY]", zhi: "850", disabled: false }
    ],
    [
      { dbkd: "GL-1 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-1 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-2 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-2 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-3 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-3 右底板宽度[DKY]", zhi: "850", disabled: false }
    ],
    [
      { dbkd: "GL-1 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-1 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-2 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-2 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-3 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-3 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-4 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-4 右底板宽度[DKY]", zhi: "850", disabled: false }
    ],
    [
      { dbkd: "GL-1 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-1 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-2 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-2 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-3 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-3 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-4 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-4 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-5 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-5 右底板宽度[DKY]", zhi: "850", disabled: false }
    ],
    [
      { dbkd: "GL-1 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-1 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-2 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-2 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-3 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-3 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-4 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-4 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-5 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-5 右底板宽度[DKY]", zhi: "850", disabled: false },
      { dbkd: "GL-6 左底板宽度[DKZ]", zhi: "850", disabled: false },
      { dbkd: "GL-6 右底板宽度[DKY]", zhi: "850", disabled: false }
    ]
  ];

  // 4.5腹板设计  固定斜率钢梁编号
  FuBanGangLiangXielvtableData = [
    [
      { dbkd: "GL-1左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-1右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2右 斜率", xielv: "1:2", disabled: false }
    ],
    [
      { dbkd: "GL-1左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-1右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3右 斜率", xielv: "1:2", disabled: false }
    ],
    [
      { dbkd: "GL-1左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-1右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4右 斜率", xielv: "1:2", disabled: false }
    ],
    [
      { dbkd: "GL-1左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-1右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-5左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-5右 斜率", xielv: "1:2", disabled: false }
    ],
    [
      { dbkd: "GL-1左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-1右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-2右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-3右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-4右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-5左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-5右 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-6左 斜率", xielv: "1:2", disabled: false },
      { dbkd: "GL-6右 斜率", xielv: "1:2", disabled: false }
    ]
  ];

  // 约定传给后端ID，区分上传文件类型。
  fileId = {
    FileDXF: "4"
  };

  mounted() {
    this.valueQB = this.jsonDataService.valueQB;
    this.updateDataGZL();
  }

  // 钢梁编号select选中后值的disabled为true
  handleSelectionChange() {
    for (let i = 0; i < this.$refs.shuiPingGangLiangtable.data.length; i++) {
      if (
        this.$refs.shuiPingGangLiangtable.selection.find(
          (element: any) =>
            element === this.$refs.shuiPingGangLiangtable.data[i]
        )
      ) {
        this.$refs.shuiPingGangLiangtable.data[i].disabled = true;
      } else {
        this.$refs.shuiPingGangLiangtable.data[i].disabled = false;
      }
    }
  }

  GdxlSelectionChange() {
    for (let i = 0; i < this.$refs.guDingXieLvGangLiangTable.data.length; i++) {
      if (
        this.$refs.guDingXieLvGangLiangTable.selection.find(
          (element: any) =>
            element === this.$refs.guDingXieLvGangLiangTable.data[i]
        )
      ) {
        this.$refs.guDingXieLvGangLiangTable.data[i].disabled = true;
      } else {
        this.$refs.guDingXieLvGangLiangTable.data[i].disabled = false;
      }
    }
  }

  // 主梁计算table赋值
  updateDataGZL() {
    this.GangZLData = [
      [
        {
          zxb: String(0.125 * this.valueQB),
          gl1: String(0.2 * this.valueQB),
          xjkd1: String(0.35 * this.valueQB),
          gl2: String(0.2 * this.valueQB),
          yxb: String(0.125 * this.valueQB)
        }
      ],
      [
        {
          zxb: String(0.09 * this.valueQB),
          gl1: String(0.15 * this.valueQB),
          xjkd1: String(0.185 * this.valueQB),
          gl2: String(0.15 * this.valueQB),
          xjkd2: String(0.185 * this.valueQB),
          gl3: String(0.15 * this.valueQB),
          yxb: String(0.09 * this.valueQB)
        }
      ],
      [
        {
          zxb: String(0.06375 * this.valueQB),
          gl1: String(0.1 * this.valueQB),
          xjkd1: String(0.1575 * this.valueQB),
          gl2: String(0.1 * this.valueQB),
          xjkd2: String(0.1575 * this.valueQB),
          gl3: String(0.1 * this.valueQB),
          xjkd3: String(0.1575 * this.valueQB),
          gl4: String(0.1 * this.valueQB),
          yxb: String(0.06375 * this.valueQB)
        }
      ],
      [
        {
          zxb: String(0.05 * this.valueQB),
          gl1: String(0.08 * this.valueQB),
          xjkd1: String(0.125 * this.valueQB),
          gl2: String(0.08 * this.valueQB),
          xjkd2: String(0.125 * this.valueQB),
          gl3: String(0.08 * this.valueQB),
          xjkd3: String(0.125 * this.valueQB),
          gl4: String(0.08 * this.valueQB),
          xjkd4: String(0.125 * this.valueQB),
          gl5: String(0.08 * this.valueQB),
          yxb: String(0.05 * this.valueQB)
        }
      ],
      [
        {
          zxb: String(0.03875 * this.valueQB),
          gl1: String(0.06 * this.valueQB),
          xjkd1: String(0.1125 * this.valueQB),
          gl2: String(0.06 * this.valueQB),
          xjkd2: String(0.1125 * this.valueQB),
          gl3: String(0.06 * this.valueQB),
          xjkd3: String(0.1125 * this.valueQB),
          gl4: String(0.06 * this.valueQB),
          xjkd4: String(0.1125 * this.valueQB),
          gl5: String(0.06 * this.valueQB),
          xjkd5: String(0.1125 * this.valueQB),
          gl6: String(0.06 * this.valueQB),
          yxb: String(0.03875 * this.valueQB)
        }
      ]
    ];
  }

  // 根据梁宽自动计算
  autoCalcGZL() {
    this.GangLiangform.GLpianshu = amountBeamByQB(this.valueQB);
    this.updateDataGZL();
  }

  // select选中数据变化事件切换数据集，以及图片
  change(row: string) {
    if (row === "内缩") {
      this.imgsURL = require("../imgs/widget-hl-2.png");
      this.form.luji = "内缩在路基宽度内";
      this.LuJioptions.splice(
        0,
        this.LuJioptions.length,
        "内缩在路基宽度内",
        "内缩在路基宽度外"
      );
    }
    if (row === "外包") {
      this.imgsURL = require("../imgs/widget-hl-1.png");
      this.form.luji = "外包在路基宽度内";
      this.LuJioptions.splice(
        0,
        this.LuJioptions.length,
        "外包在路基宽度内",
        "外包在路基宽度外"
      );
    }
  }

  // select钢梁选中数据变化事件切换数据集
  Gangliangchange(row: string) {
    if (row === "《桥梁用结构钢》（GB/T 714-2015）") {
      this.GangLiangform.GLcaizhi = "Q345qC";
      this.GangLiang2options.splice(
        0,
        this.GangLiang2options.length,
        "Q345qC",
        "Q345qD",
        "Q345qE",
        "Q370qC",
        "Q370qD",
        "Q370qE",
        "Q420qD",
        "Q420qE",
        "Q345qNHD",
        "Q345qNHE",
        "Q420qNHD",
        "Q420qNHE"
      );
    }
    if (row === "《低合金高强度结构钢》（GB/T 1591-2018）") {
      this.GangLiangform.GLcaizhi = "Q355B";
      this.GangLiang2options.splice(
        0,
        this.GangLiang2options.length,
        "Q355B",
        "Q355C",
        "Q355D",
        "Q390B",
        "Q390C",
        "Q390D"
      );
    }
    if (row === "《耐候结构钢》（GB/T 4171-2008）") {
      this.GangLiangform.GLcaizhi = "Q355NHB";
      this.GangLiang2options.splice(
        0,
        this.GangLiang2options.length,
        "Q355NHB",
        "Q355NHC",
        "Q355NHD",
        "Q355NHE",
        "Q415NHB",
        "Q415NHC",
        "Q415NHD",
        "Q415NHE"
      );
    }
    if (row === "《碳素结构钢》（GB/T 700-2006）") {
      this.GangLiangform.GLcaizhi = "Q235B";
      this.GangLiang2options.splice(
        0,
        this.GangLiang2options.length,
        "Q235B",
        "Q235C",
        "Q235D"
      );
    }
  }

  // 顺序增加表格行
  addtableData(tableData: any[]) {
    tableData.push({ pz: "", pzhd: "", value: "沥青" });
  }

  // 插入增加表格行
  inserttableData(index: number, tableData: any[]) {
    tableData.splice(index + 1, 0, {
      pz: "",
      pzhd: "",
      value: "沥青"
    });
  }

  // 删除表格行
  handleDelete(index: number, tableData: any[]) {
    tableData.splice(index, 1);
  }

  // 获取字符串护栏
  getStringHL(): string {
    let value = "0";
    const name = this.form.leixing;
    if (this.form.HuLan === "外包") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value = this.form.waibao;
    } else if (this.form.HuLan === "内缩") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value = `-${this.form.waibao}`;
    }
    return `${name},${value};${name},${value}`;
  }

  // 获取水平尺寸table值
  getStringDBKD() {
    let res = "";
    for (let i = 0; i < this.$refs.shuiPingGangLiangtable.data.length; i += 2) {
      if (
        this.$refs.shuiPingGangLiangtable.selection.find(
          (element: any) =>
            element === this.$refs.shuiPingGangLiangtable.data[i]
        )
      ) {
        res += "0,";
      } else {
        res += this.$refs.shuiPingGangLiangtable.data[i].zhi + ",";
      }
      if (
        this.$refs.shuiPingGangLiangtable.selection.find(
          (element: any) =>
            element === this.$refs.shuiPingGangLiangtable.data[i + 1]
        )
      ) {
        res += "0;";
      } else {
        res += this.$refs.shuiPingGangLiangtable.data[i + 1].zhi + ";";
      }
    }
    return res;
  }

  // 序列化获取固定斜率table值
  getStringFBXL() {
    let res = "";
    for (let i = 0; i < this.$refs.guDingXieLvGangLiangTable.data.length; i++) {
      if (
        this.$refs.guDingXieLvGangLiangTable.selection.find(
          (element: any) =>
            element === this.$refs.guDingXieLvGangLiangTable.data[i]
        )
      ) {
        res += "1,0;";
      } else {
        if (
          // eslint-disable-next-line no-constant-condition
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-1左 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-2左 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-3左 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-4左 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-5左 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-6左 斜率"
        ) {
          res +=
            this.$refs.guDingXieLvGangLiangTable.data[i].xielv
              .split(":")
              .reverse()
              .join(",") + ";";
        }
        if (
          // eslint-disable-next-line no-constant-condition
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-1右 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-2右 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-3右 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-4右 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-5右 斜率" ||
          this.$refs.guDingXieLvGangLiangTable.data[i].dbkd === "GL-6右 斜率"
        ) {
          let tmp = [];
          tmp = this.$refs.guDingXieLvGangLiangTable.data[i].xielv
            .split(":")
            .reverse();
          tmp[1] = `-${tmp[1].trim()}`;
          res += tmp.join(",") + ";";
        }
      }
    }
    return res;
  }

  // 获取字符串FBLay用于序列化
  getStringFBLay() {
    let res = "";
    const main = this.jsonDataService.exportJSON.MAIN;
    if (this.GangLiangform.GLpianshu === 2) {
      const tmp = this.GangZLData[this.GangLiangform.GLpianshu - 2][0];
      const a: number = parseFloat(tmp.zxb);
      const b: number = parseFloat(tmp.gl1);
      const c: number = parseFloat(tmp.xjkd1);
      const d: number = parseFloat(tmp.gl2);
      const e: number = parseFloat(tmp.yxb);
      res = `ZBX,${a};ZBX,${a + b};YBX,${-(d + e)};YBX,${-e}`;
      const extraGzl = main.find(e => e.aaak === "extraGzl");
      if (extraGzl) {
        extraGzl.v = String(c);
      }
    }
    if (this.GangLiangform.GLpianshu === 3) {
      const tmp = this.GangZLData[this.GangLiangform.GLpianshu - 2][0];
      const a: number = parseFloat(tmp.zxb);
      const b: number = parseFloat(tmp.gl1);
      const c: number = parseFloat(tmp.xjkd1);
      const d: number = parseFloat(tmp.gl2);
      const e: number = parseFloat((tmp as any).xjkd2);
      const f: number = parseFloat((tmp as any).gl3);
      const g: number = parseFloat((tmp as any).yxb);
      res = `ZBX,${a};ZBX,${a + b};ZBX,${a + b + c};YBX,${-(e + f + g)};YBX,${-(
        f + g
      )};YBX,${-g}`;
      const extraGzl = main.find(e => e.aaak === "extraGzl");
      if (extraGzl) {
        extraGzl.v = String(d);
      }
    }
    if (this.GangLiangform.GLpianshu === 4) {
      const tmp = this.GangZLData[this.GangLiangform.GLpianshu - 2][0];
      const a: number = parseFloat(tmp.zxb);
      const b: number = parseFloat(tmp.gl1);
      const c: number = parseFloat(tmp.xjkd1);
      const d: number = parseFloat(tmp.gl2);
      const e: number = parseFloat((tmp as any).xjkd2);
      const f: number = parseFloat((tmp as any).gl3);
      const g: number = parseFloat((tmp as any).xjkd3);
      const h: number = parseFloat((tmp as any).gl4);
      const i: number = parseFloat((tmp as any).yxb);
      res = `ZBX,${a};ZBX,${a + b};ZBX,${a + b + c};ZBX,${a +
        b +
        c +
        d};YBX,${-(f + g + h + i)};YBX,${-(g + h + i)};YBX,${-(
        h + i
      )};YBX,${-i}`;
      const extraGzl = main.find(e => e.aaak === "extraGzl");
      if (extraGzl) {
        extraGzl.v = String(e);
      }
    }
    if (this.GangLiangform.GLpianshu === 5) {
      const tmp = this.GangZLData[this.GangLiangform.GLpianshu - 2][0];
      const a: number = parseFloat(tmp.zxb);
      const b: number = parseFloat(tmp.gl1);
      const c: number = parseFloat(tmp.xjkd1);
      const d: number = parseFloat(tmp.gl2);
      const e: number = parseFloat((tmp as any).xjkd2);
      const f: number = parseFloat((tmp as any).gl3);
      const g: number = parseFloat((tmp as any).xjkd3);
      const h: number = parseFloat((tmp as any).gl4);
      const i: number = parseFloat((tmp as any).xjkd4);
      const j: number = parseFloat((tmp as any).gl5);
      const k: number = parseFloat((tmp as any).yxb);
      res = `ZBX,${a};ZBX,${a + b};ZBX,${a + b + c};ZBX,${a +
        b +
        c +
        d};ZBX,${a + b + c + d + e};YBX,${-(g + h + i + j + k)};YBX,${-(
        h +
        i +
        j +
        k
      )};YBX,${-(i + j + k)};YBX,${-(j + k)};YBX,${-k}`;
      const extraGzl = main.find(e => e.aaak === "extraGzl");
      if (extraGzl) {
        extraGzl.v = String(f);
      }
    }
    if (this.GangLiangform.GLpianshu === 6) {
      const tmp = this.GangZLData[this.GangLiangform.GLpianshu - 2][0];
      const a: number = parseFloat(tmp.zxb);
      const b: number = parseFloat(tmp.gl1);
      const c: number = parseFloat(tmp.xjkd1);
      const d: number = parseFloat(tmp.gl2);
      const e: number = parseFloat((tmp as any).xjkd2);
      const f: number = parseFloat((tmp as any).gl3);
      const g: number = parseFloat((tmp as any).xjkd3);
      const h: number = parseFloat((tmp as any).gl4);
      const i: number = parseFloat((tmp as any).xjkd4);
      const j: number = parseFloat((tmp as any).gl5);
      const k: number = parseFloat((tmp as any).xjkd5);
      const l: number = parseFloat((tmp as any).gl6);
      const m: number = parseFloat((tmp as any).yxb);
      res = `ZBX,${a};ZBX,${a + b};ZBX,${a + b + c};ZBX,${a +
        b +
        c +
        d};ZBX,${a + b + c + d + e};ZBX,${a + b + c + d + e + f};YBX,${-(
        h +
        i +
        j +
        k +
        l +
        m
      )};YBX,${-(i + j + k + l + m)};YBX,${-(j + k + l + m)};YBX,${-(
        k +
        l +
        m
      )};YBX,${-(l + m)};YBX,${-m}`;
      const extraGzl = main.find(e => e.aaak === "extraGzl");
      if (extraGzl) {
        extraGzl.v = String(g);
      }
    }
    return res;
  }

  // 更新钢主梁table
  updateDataGZLByJSON(valueFbLay: string) {
    // eslint-disable-next-line no-useless-return
    if (valueFbLay === "") return;
    const tableData: any = [];
    valueFbLay.split(";").forEach(value => {
      tableData.push(parseFloat(value.split(",")[1]));
    });
    let index = 0;
    index = tableData.length / 2 - 2;
    const main = this.jsonDataService.exportJSON.MAIN;
    const extraGzl = main.find(e => e.aaak === "extraGzl");
    if (this.GangZhuLiangoptions[index] === 2) {
      this.GangZLData = [
        [
          {
            zxb: String(tableData[0]),
            gl1: String(tableData[1] - tableData[0]),
            xjkd1: String(extraGzl?.v),
            gl2: String(tableData[3] - tableData[2]),
            yxb: String(-tableData[3])
          }
        ]
      ];
    }
    if (this.GangZhuLiangoptions[index] === 3) {
      this.GangZLData = [
        [],
        [
          {
            zxb: String(tableData[0]),
            gl1: String(tableData[1] - tableData[0]),
            xjkd1: String(tableData[2] - tableData[1]),
            gl2: String(extraGzl?.v),
            xjkd2: String(tableData[4] - tableData[3]),
            gl3: String(tableData[5] - tableData[4]),
            yxb: String(-tableData[5])
          }
        ]
      ];
    }
    if (this.GangZhuLiangoptions[index] === 4) {
      this.GangZLData = [
        [],
        [],
        [
          {
            zxb: String(tableData[0]),
            gl1: String(tableData[1] - tableData[0]),
            xjkd1: String(tableData[2] - tableData[1]),
            gl2: String(tableData[3] - tableData[2]),
            xjkd2: String(extraGzl?.v),
            gl3: String(tableData[5] - tableData[4]),
            xjkd3: String(tableData[6] - tableData[5]),
            gl4: String(tableData[7] - tableData[6]),
            yxb: String(-tableData[7])
          }
        ]
      ];
    }
    if (this.GangZhuLiangoptions[index] === 5) {
      this.GangZLData = [
        [],
        [],
        [],
        [
          {
            zxb: String(tableData[0]),
            gl1: String(tableData[1] - tableData[0]),
            xjkd1: String(tableData[2] - tableData[1]),
            gl2: String(tableData[3] - tableData[2]),
            xjkd2: String(tableData[4] - tableData[3]),
            gl3: String(extraGzl?.v),
            xjkd3: String(tableData[6] - tableData[5]),
            gl4: String(tableData[7] - tableData[6]),
            xjkd4: String(tableData[8] - tableData[7]),
            gl5: String(tableData[9] - tableData[8]),
            yxb: String(-tableData[9])
          }
        ]
      ];
    }
    if (this.GangZhuLiangoptions[index] === 6) {
      this.GangZLData = [
        [],
        [],
        [],
        [],
        [
          {
            zxb: String(tableData[0]),
            gl1: String(tableData[1] - tableData[0]),
            xjkd1: String(tableData[2] - tableData[1]),
            gl2: String(tableData[3] - tableData[2]),
            xjkd2: String(tableData[4] - tableData[3]),
            gl3: String(tableData[5] - tableData[4]),
            xjkd3: String(extraGzl?.v),
            gl4: String(tableData[7] - tableData[6]),
            xjkd4: String(tableData[8] - tableData[7]),
            gl5: String(tableData[9] - tableData[8]),
            xjkd5: String(tableData[10] - tableData[9]),
            gl6: String(tableData[11] - tableData[10]),
            yxb: String(-tableData[11])
          }
        ]
      ];
    }
  }

  // 序列化
  serialize() {
    console.log("序列化 标准横断面 开始");
    // 一丶 桥面铺装
    let stringPZ = "";
    this.tableData.forEach(value => {
      stringPZ += `${value.pz},${value.value},${value.pzhd};`;
    });
    const main = this.jsonDataService.exportJSON.MAIN;
    const pz = main.find(e => e.aaak === "pz");
    if (pz) {
      pz.v = stringPZ.substring(0, stringPZ.length - 1);
    }
    // 二丶 护栏
    const hulan = main.find(e => e.aaak === "hulan");
    if (hulan) {
      hulan.v = this.getStringHL();
    }
    if (
      (this.form.HuLan === "外包" && this.form.luji === "外包在路基宽度内") ||
      (this.form.HuLan === "内缩" && this.form.luji === "内缩在路基宽度内")
    ) {
      const bHulanWaiBaoInLx = main.find(e => e.aaak === "bHulanWaiBaoInLx");
      if (bHulanWaiBaoInLx) {
        bHulanWaiBaoInLx.v = "1";
      }
    } else {
      const bHulanWaiBaoInLx = main.find(e => e.aaak === "bHulanWaiBaoInLx");
      if (bHulanWaiBaoInLx) {
        bHulanWaiBaoInLx.v = "0";
      }
    }
    // 三丶桥面板
    const dsc = main.find(e => e.aaak === "dsc");
    if (dsc) {
      dsc.v = `${this.QMBform.liangduanSX},${this.QMBform.banjingR}`;
    }
    const tt = main.find(e => e.aaak === "tt");
    if (tt) {
      tt.v =
        this.QMBform.QiaoMianBan === "等厚"
          ? this.QMBform.DengHou
          : this.QMBform.qmbbzhd;
    }
    const dt = main.find(e => e.aaak === "dt");
    if (dt) {
      dt.v =
        this.QMBform.QiaoMianBan === "等厚"
          ? this.QMBform.DengHou
          : this.QMBform.qiaomianbanBCH;
    }
    const sybTopD = main.find(e => e.aaak === "sybTopD");
    if (sybTopD) {
      sybTopD.v = this.QMBform.xiangnei;
    }
    const xbDS = main.find(e => e.aaak === "xbDS");
    if (xbDS) {
      xbDS.v = `${this.QMBform.xuanbihd},0`;
    }

    const xbDE = main.find(e => e.aaak === "xbDE");
    if (xbDE) {
      xbDE.v = `${this.QMBform.xuanbihd},0`;
    }
    const fbt = main.find(e => e.aaak === "fbt");
    if (fbt) {
      fbt.v = this.QMBform.chengtuo;
    }

    // 四丶 钢主梁
    this.jsonDataService.amoutGZL = this.GangLiangform.GLpianshu;
    const dbDirect = main.find(e => e.aaak === "dbDirect");
    if (dbDirect) {
      dbDirect.v = "1";
    }

    const fbDirect = main.find(e => e.aaak === "fbDirect");
    if (fbDirect) {
      fbDirect.v = "3";
    }
    const yybDirect = main.find(e => e.aaak === "yybDirect");
    if (yybDirect) {
      yybDirect.v = "3";
    }
    const dbCSType = main.find(e => e.aaak === "dbCSType");
    if (dbCSType) {
      if (this.GangLiangform.DBxl === "水平") {
        dbCSType.v = "2";
      } else {
        dbCSType.v = "1";
      }
    }

    const dbExtendfb = main.find(e => e.aaak === "dbExtendfb");
    if (dbExtendfb) {
      dbExtendfb.v = this.GangLiangform.DBws;
    }
    const gbMat = main.find(e => e.aaak === "gbMat");
    if (gbMat) {
      gbMat.v = this.GangLiangform.GLcaizhi;
    }

    if (this.GangLiangform.Fbxlfs === "水平尺寸") {
      const xfK = main.find(e => e.aaak === "xfK");
      if (xfK) {
        xfK.v = "";
      }
      const dbL = main.find(e => e.aaak === "dbL");
      if (dbL) {
        dbL.v = this.getStringDBKD();
      }
    }
    if (this.GangLiangform.Fbxlfs === "固定斜率") {
      const dbL = main.find(e => e.aaak === "dbL");
      if (dbL) {
        dbL.v = "";
      }
      const xfK = main.find(e => e.aaak === "xfK");
      if (xfK) {
        xfK.v = this.getStringFBXL();
      }
    }
    const yybB = main.find(e => e.aaak === "yybB");
    if (yybB) {
      yybB.v = this.GangLiangform.Yybkd;
    }
    const glH = main.find(e => e.aaak === "glH");
    if (glH) {
      glH.v = this.GangLiangform.Gzlgd;
    }
    this.jsonDataService.valueQB = this.valueQB;
    const fbLay = main.find(e => e.aaak === "fbLay");
    if (fbLay) {
      fbLay.v = this.getStringFBLay();
    }
    console.log("序列化 标准横断面 结束");
  }

  // 反序列化固定斜率table值
  findIndexTransformXL(value: string) {
    if (value !== "1,0") {
      const tmp: string[] = value.split(",");
      const pos: number = tmp[1].indexOf("-");
      if (pos !== -1) {
        tmp[1] = tmp[1].substring(pos + 1);
      }
      const tar: string = tmp.reverse().join(":");
      return tar;
    } else {
      return "1:2";
    }
  }

  // 反序列化
  deserialize() {
    console.log("标准横断面反序列化开始");
    // 一 桥面铺装
    this.tableData = [];
    const main = this.jsonDataService.exportJSON.MAIN;
    const pz = main.find(e => e.aaak === "pz");
    if (pz) {
      pz.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = {
            pz: "",
            pzhd: "",
            value: ""
          };
          const col = row.split(",");

          tmp.pz = col[0];
          tmp.value = col[1];
          tmp.pzhd = col[2];
          this.tableData.push(tmp);
        });
    }
    // 二 护栏
    const hulan = main.find(e => e.aaak === "hulan");
    if (hulan) {
      let valueHL: number = parseFloat(hulan.v.split(";")[0].split(",")[1]);
      if (valueHL === 0) {
        this.form.HuLan = "与路基齐平"; // 齐平
      } else if (valueHL > 0) {
        this.form.HuLan = "外包"; // 外包
      } else {
        this.form.HuLan = "内缩"; // 内缩
        valueHL = -valueHL;
      }
      this.form.waibao = String(valueHL);
      const bHulanWaiBaoInLx = main.find(e => e.aaak === "bHulanWaiBaoInLx");
      if (bHulanWaiBaoInLx) {
        if (bHulanWaiBaoInLx.v === "1") {
          if (this.form.HuLan === "外包") {
            this.form.luji = "外包在路基宽度内";
          }
          if (this.form.HuLan === "内缩") {
            this.form.luji = "内缩在路基宽度内";
          }
        }
      }
    }
    // 三丶 桥面板
    const dsc = main.find(e => e.aaak === "dsc");
    if (dsc) {
      dsc.v.split(",").forEach((value, index) => {
        if (index === 0) {
          this.QMBform.liangduanSX = value;
        } else if (index === 1) {
          this.QMBform.banjingR = value;
        }
      });

      if (this.QMBform.QiaoMianBan === "等厚") {
        const tt = main.find(e => e.aaak === "tt");
        if (tt) {
          this.QMBform.DengHou = tt.v;
        }
      } else {
        const tt = main.find(e => e.aaak === "tt");
        if (tt) {
          this.QMBform.qmbbzhd = tt.v;
        }
        const dt = main.find(e => e.aaak === "dt");
        if (dt) {
          this.QMBform.qiaomianbanBCH = dt.v;
        }
      }

      const sybTopD = main.find(e => e.aaak === "sybTopD");
      if (sybTopD) {
        this.QMBform.xiangnei = sybTopD.v;
      }

      const xbDS = main.find(e => e.aaak === "xbDS");
      if (xbDS) {
        this.QMBform.xuanbihd = xbDS.v.split(",")[0];
      }

      const fbt = main.find(e => e.aaak === "fbt");
      if (fbt) {
        this.QMBform.chengtuo = fbt.v;
      }
    }
    // 四 钢主梁
    this.GangLiangform.GLpianshu = this.jsonDataService.amoutGZL;
    if (this.jsonDataService.uiJSON.isEmpty === "true") {
      console.log("钢主梁不是第一次初始化");
      const fbLay = main.find(e => e.aaak === "fbLay");
      if (fbLay) {
        this.updateDataGZLByJSON(fbLay.v);
      }
    }
    const dbDirect = main.find(e => e.aaak === "dbDirect");
    if (dbDirect) {
      if (parseInt(dbDirect.v) - 1 === 0) {
        this.GangLiangform.DBhdbh = "顶缘对齐";
      } else {
        this.GangLiangform.DBhdbh = "底缘对齐";
      }
    }
    const fbDirect = main.find(e => e.aaak === "fbDirect");
    if (fbDirect) {
      if (parseInt(fbDirect.v) - 1 === 0) {
        this.GangLiangform.FBhdbh = "外缘对齐";
      }
      if (parseInt(fbDirect.v) - 1 === 1) {
        this.GangLiangform.FBhdbh = "内缘对齐";
      }
      if (parseInt(fbDirect.v) - 1 === 2) {
        this.GangLiangform.FBhdbh = "中心对齐";
      }
    }
    const yybDirect = main.find(e => e.aaak === "yybDirect");
    if (yybDirect) {
      if (parseInt(yybDirect.v) - 1 === 0) {
        this.GangLiangform.Yybhd = "顶缘对齐";
      }
    }
    const dbCSType = main.find(e => e.aaak === "dbCSType");
    if (dbCSType) {
      if (parseInt(dbCSType.v) - 1 === 0) {
        this.GangLiangform.DBxl = "随横坡";
      } else {
        this.GangLiangform.DBxl = "水平";
      }
    }
    const dbExtendfb = main.find(e => e.aaak === "dbExtendfb");
    if (dbExtendfb) {
      this.GangLiangform.DBws = dbExtendfb.v;
    }
    const xfK = main.find(e => e.aaak === "xfK");
    this.isFuBanXieLV = false;
    if (xfK?.v === "") {
      this.GangLiangform.Fbxlfs = "水平尺寸";
      const dbL = main.find(e => e.aaak === "dbL");
      if (dbL) {
        const dvllength = dbL.v.split(";");
        let tmplength = 0;
        const HuiXian: any = [];
        for (let i = 0; i < dvllength.length - 1; i++) {
          dvllength[i].split(",").forEach(e => {
            tmplength++;
            HuiXian.push(e);
          });
        }
        if (tmplength === 4) {
          for (let j = 0; j < this.FuBanGangLiangtableData[0].length; j++) {
            this.FuBanGangLiangtableData[0][j].zhi = HuiXian[j];
            if (HuiXian[j] === "0") {
              this.$refs.shuiPingGangLiangtable.toggleRowSelection(
                this.FuBanGangLiangtableData[0][j],
                true
              );
            }
          }
        }
        if (tmplength === 6) {
          for (let j = 0; j < this.FuBanGangLiangtableData[1].length; j++) {
            this.FuBanGangLiangtableData[1][j].zhi = HuiXian[j];
            if (HuiXian[j] === "0") {
              this.$refs.shuiPingGangLiangtable.toggleRowSelection(
                this.FuBanGangLiangtableData[1][j],
                true
              );
            }
          }
        }
        if (tmplength === 8) {
          for (let j = 0; j < this.FuBanGangLiangtableData[2].length; j++) {
            this.FuBanGangLiangtableData[2][j].zhi = HuiXian[j];
            if (HuiXian[j] === "0") {
              this.$refs.shuiPingGangLiangtable.toggleRowSelection(
                this.FuBanGangLiangtableData[2][j],
                true
              );
            }
          }
        }
        if (tmplength === 10) {
          for (let j = 0; j < this.FuBanGangLiangtableData[3].length; j++) {
            this.FuBanGangLiangtableData[3][j].zhi = HuiXian[j];
            if (HuiXian[j] === "0") {
              this.$refs.shuiPingGangLiangtable.toggleRowSelection(
                this.FuBanGangLiangtableData[3][j],
                true
              );
            }
          }
        }
        if (tmplength === 12) {
          for (let j = 0; j < this.FuBanGangLiangtableData[4].length; j++) {
            this.FuBanGangLiangtableData[4][j].zhi = HuiXian[j];
            if (HuiXian[j] === "0") {
              this.$refs.shuiPingGangLiangtable.toggleRowSelection(
                this.FuBanGangLiangtableData[4][j],
                true
              );
            }
          }
        }
      }
    } else {
      this.GangLiangform.Fbxlfs = "固定斜率";
      const xfK = main.find(e => e.aaak === "xfK");
      if (xfK) {
        const xfKlengths = xfK.v.split(";");
        let tmplengthS = 0;
        const HuiXians: any = [];
        for (let i = 0; i < xfKlengths.length - 1; i++) {
          [xfKlengths[i]].forEach(e => {
            tmplengthS++;
            HuiXians.push(e);
          });
        }
        if (tmplengthS === 4) {
          for (
            let j = 0;
            j < this.FuBanGangLiangXielvtableData[0].length;
            j++
          ) {
            this.FuBanGangLiangXielvtableData[0][
              j
            ].xielv = this.findIndexTransformXL(HuiXians[j]);
            if (HuiXians[j] === "1,0") {
              this.$refs.guDingXieLvGangLiangTable.toggleRowSelection(
                this.FuBanGangLiangXielvtableData[0][j],
                true
              );
            }
          }
        }
        if (tmplengthS === 6) {
          for (
            let j = 0;
            j < this.FuBanGangLiangXielvtableData[1].length;
            j++
          ) {
            this.FuBanGangLiangXielvtableData[1][
              j
            ].xielv = this.findIndexTransformXL(HuiXians[j]);
            if (HuiXians[j] === "1,0") {
              this.$refs.guDingXieLvGangLiangTable.toggleRowSelection(
                this.FuBanGangLiangXielvtableData[1][j],
                true
              );
            }
          }
        }
        if (tmplengthS === 8) {
          for (
            let j = 0;
            j < this.FuBanGangLiangXielvtableData[2].length;
            j++
          ) {
            this.FuBanGangLiangXielvtableData[2][
              j
            ].xielv = this.findIndexTransformXL(HuiXians[j]);
            if (HuiXians[j] === "1,0") {
              this.$refs.guDingXieLvGangLiangTable.toggleRowSelection(
                this.FuBanGangLiangXielvtableData[2][j],
                true
              );
            }
          }
        }
        if (tmplengthS === 10) {
          for (
            let j = 0;
            j < this.FuBanGangLiangXielvtableData[3].length;
            j++
          ) {
            this.FuBanGangLiangXielvtableData[3][
              j
            ].xielv = this.findIndexTransformXL(HuiXians[j]);
            if (HuiXians[j] === "1,0") {
              this.$refs.guDingXieLvGangLiangTable.toggleRowSelection(
                this.FuBanGangLiangXielvtableData[3][j],
                true
              );
            }
          }
        }
        if (tmplengthS === 12) {
          for (
            let j = 0;
            j < this.FuBanGangLiangXielvtableData[4].length;
            j++
          ) {
            this.FuBanGangLiangXielvtableData[4][
              j
            ].xielv = this.findIndexTransformXL(HuiXians[j]);
            if (HuiXians[j] === "1,0") {
              this.$refs.guDingXieLvGangLiangTable.toggleRowSelection(
                this.FuBanGangLiangXielvtableData[4][j],
                true
              );
            }
          }
        }
      }
    }

    const glH = main.find(e => e.aaak === "glH");
    if (glH) {
      this.GangLiangform.Gzlgd = glH.v;
    }
    const yybB = main.find(e => e.aaak === "yybB");
    if (yybB) {
      this.GangLiangform.Yybkd = yybB.v;
    }
    this.valueQB = this.jsonDataService.valueQB;
    console.log("标准横断面反序列化结束");
  }

  // 获取jsondataservice
  getDMJSON(): any {
    const main = this.jsonDataService.exportJSON.MAIN;
    const DMJSON = {
      MAIN: [
        main.find(e => e.aaak === "name"),
        main.find(e => e.aaak === "type"),
        main.find(e => e.aaak === "note1"),
        main.find(e => e.aaak === "note2"),
        main.find(e => e.aaak === "bk"),
        main.find(e => e.aaak === "zs"),
        main.find(e => e.aaak === "es"),
        main.find(e => e.aaak === "qmCS"),
        main.find(e => e.aaak === "hulan"),
        main.find(e => e.aaak === "bHulanWaiBaoInLx"),
        main.find(e => e.aaak === "pz"),
        main.find(e => e.aaak === "importFiles"),
        main.find(e => e.aaak === "fbLay"),
        main.find(e => e.aaak === "xfK"),
        main.find(e => e.aaak === "dbL"),
        main.find(e => e.aaak === "dsc"),
        main.find(e => e.aaak === "tt"),
        main.find(e => e.aaak === "dt"),
        main.find(e => e.aaak === "dunTopD"),
        main.find(e => e.aaak === "sybTopD"),
        main.find(e => e.aaak === "xbLenS"),
        main.find(e => e.aaak === "xbLenE"),
        main.find(e => e.aaak === "xbDS"),
        main.find(e => e.aaak === "xbDE"),
        main.find(e => e.aaak === "glH"),
        main.find(e => e.aaak === "dbDirect"),
        main.find(e => e.aaak === "fbDirect"),
        main.find(e => e.aaak === "yybDirect"),
        main.find(e => e.aaak === "fbt"),
        main.find(e => e.aaak === "yybB"),
        main.find(e => e.aaak === "dbCSType"),
        main.find(e => e.aaak === "dbExtendfb"),
        main.find(e => e.aaak === "gbMat")
      ]
    };
    return DMJSON;
  }

  // 提交按钮
  async submit() {
    try {
      this.serialize();
      const DMJSON: string = await JSON.stringify(this.getDMJSON());
      const formdata = new FormData();
      formdata.append("componentId", this.construct_id);
      formdata.append("json", encodeURIComponent(DMJSON));
      const res = await axios.post(
        getAjaxUrl("/calc/jna/GetDMPreview"),
        formdata
      );
      this.$refs.canvas1.clear();
      const dataCanvas1 = JSON.parse((res.data as PreviewData).out) as [];
      const objs1 = rightHand.loadObjects(dataCanvas1);
      this.$refs.canvas1.loadObjects(objs1);
      this.$refs.canvas1.zoomToFit();
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
.hulan {
  display: flex;
  width: 100%;
}
.hulan-left {
  width: 50%;
}
.hulan-right {
  width: 50%;
}
</style>
<style lang="scss">
</style>

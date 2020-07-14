<template>
  <div class="ZongLei">
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>腹板纵向加劲肋布置</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableData" stripe border style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="位置" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.wz" placeholder="请选择">
                <el-option v-for="(item, index) in wzOption" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="纵桥向布置（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.zqxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="竖向布置（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.sxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="腹板纵肋厚度FZt（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.hd" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="腹板纵肋高度FZh（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.lh" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="开孔类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.lx" placeholder="请选择">
                <el-option v-for="(item, index) in kkOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRow(scope.$index, tableData)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2(tableData)" style="float:left">增加行</el-button>
        </div>
      </div>
      <p>
        备注：正值布置以腹板中心与翼缘板的交点为起始线，向下布设；负值布置以腹板中心与底板的交点连线为起始线，向上布设
      </p>
    </div>
    <!-- 底板纵向加劲肋布置 -->
    <div id="other" style="margin:10px 0 0 20px">
      <div class="header">
        <h3>底板纵向加劲肋布置</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableDataD" stripe border style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="参考线" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.ckx" placeholder="请选择">
                <el-option v-for="(item, index) in ckxOption" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="纵桥向布置（mm）">
            <template v-slot="scope">
              <point-input v-model="scope.row.zqxbz_d" clearable></point-input>
            </template>
          </el-table-column>
          <el-table-column label="横桥向布置（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.hqxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="腹板纵肋厚度DZt（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.hd_d" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="腹板纵肋高度DZh（mm）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.lh_d" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="开孔类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.lx_d" placeholder="请选择">
                <el-option v-for="(item, index) in kkOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRowGljd(scope.$index, tableDataD)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRowGljd(scope.$index, tableDataD)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2Gljd(tableDataD)" style="float:left; margin:10px 0 10px 0">增加行
          </el-button>
        </div>
      </div>

      <p>
        备注：布置以箱室中心线为起点，向左右布设
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import { ZXJJL } from "../models/export-data";
import { makeLabelValueArray } from "@/utils/misc";

interface ConstructNode {
  id: number;
  name: string;
  desc?: string;
  type: string;
  needFill?: boolean;
}

@Component({
  components: {}
})
export default class ZongLei extends Vue {
  name = "ZongLei";
  @Inject() jsonDataService!: JsonDataService;

  // 腹板纵向加劲肋布置表格 位置下拉框， 纵桥向布置，竖向布置，腹板纵肋厚度FZt（mm），腹板纵肋高度FZh（mm）， 开孔类型下拉框
  tableData = [
    {
      wz: "",
      zqxbz: 0,
      sxbz: 0,
      lx: "",
      hd: 0,
      lh: 0
    }
  ];

  // 底板纵向加劲肋布置表格 参考线下拉框， 纵桥向布置，横桥向布置，腹板纵肋厚度FZt（mm），腹板纵肋高度FZh（mm）， 开孔类型下拉框
  tableDataD = [
    {
      ckx: "XLCen1",
      zqxbz_d: "20,39900",
      hqxbz: 0,
      lx_d: "ZXKK1",
      hd_d: 10,
      lh_d: 200
    },
    {
      ckx: "XLCen2",
      zqxbz_d: "20,39900",
      hqxbz: 0,
      lx_d: "ZXKK1",
      hd_d: 10,
      lh_d: 200
    }
  ];

  // 腹板纵向加劲肋布置表格  位置
  wzOption = [
    { value: "FB1", label: "腹板1" },
    { value: "FB2", label: "腹板2" },
    { value: "FB3", label: "腹板3" },
    { value: "FB4", label: "腹板4" }
  ];

  // 腹板纵向加劲肋布置表格  开孔类型
  kkOption: string[] = [];

  // 底板纵向加劲肋布置表格  参考线
  ckxOption = [
    { value: "XLCen1", label: "箱梁中心线1" },
    { value: "XLCen2", label: "箱梁中心线2" }
  ];

  // 腹板  表格数据
  dataFbzxjjl() {
    const zxjjls: ZXJJL[] = [];
    this.tableData.forEach(value => {
      const tmp: ZXJJL = new ZXJJL();
      tmp.ckx = value.wz;
      tmp.lay = String(value.sxbz);
      tmp.region = String(value.zqxbz);
      tmp.matIndex = value.lx;
      tmp.hd = String(value.hd);
      tmp.lh = String(value.lh);
      zxjjls.push(tmp);
    });
    return zxjjls;
  }

  // 底板  表格数据
  dataDbzxjjl() {
    const zxjjlsD: ZXJJL[] = [];
    this.tableDataD.forEach(value => {
      const tmp: ZXJJL = new ZXJJL();
      tmp.ckx = value.ckx;
      tmp.lay = String(value.hqxbz);
      tmp.region = value.zqxbz_d;
      tmp.matIndex = value.lx_d;
      tmp.hd = String(value.hd_d);
      tmp.lh = String(value.lh_d);
      zxjjlsD.push(tmp);
    });
    return zxjjlsD;
  }

  //  序列化
  serialize() {
    console.log("序列化 纵肋 开始");
    if (this.jsonDataService.stateZXJJL === 0) {
      this.jsonDataService.exportJSON.ZXJJL = this.dataDbzxjjl();
      this.jsonDataService.exportJSON.ZXJJL = this.dataFbzxjjl();
      this.jsonDataService.stateZXJJL = 1;
    } else if (this.jsonDataService.stateZXJJL === 1) {
      for (const p of this.dataDbzxjjl()) {
        this.jsonDataService.exportJSON.ZXJJL.push(p);
      }
      for (const p of this.dataFbzxjjl()) {
        this.jsonDataService.exportJSON.ZXJJL.push(p);
      }
      this.jsonDataService.stateZXJJL = 0;
    }
    console.log("序列化 纵肋 结束");
  }

  // 反序列化
  deserialize() {
    console.log("反序列化 纵肋 开始");
    this.kkOption = this.jsonDataService.ljkJSON.stiffeningRibAZxjjlkk;
    this.ckxOption = makeLabelValueArray(
      "箱梁中心线",
      "XLCen",
      1,
      this.jsonDataService.amoutGZL
    );
    this.wzOption = makeLabelValueArray(
      "腹板",
      "FB",
      1,
      this.jsonDataService.amoutGZL * 2
    );

    if (this.jsonDataService.uiJSON.isEmpty === "true") {
      // 腹板数据反序列化
      this.tableData = [];
      this.jsonDataService.exportJSON.ZXJJL.filter(e => e.type === "1").forEach(
        value => {
          const tmp = {
            wz: "",
            sxbz: 0,
            zqxbz: 0,
            lx: "",
            hd: 0,
            lh: 0
          };
          tmp.wz = value.ckx;
          tmp.zqxbz = Number(value.region);
          tmp.sxbz = Number(value.lay);
          tmp.lx = value.matIndex;
          tmp.hd = Number(value.hd);
          tmp.lh = Number(value.lh);
          this.tableData.push(tmp);
        }
      );

      // 底板数据反序列化
      this.tableDataD = [];
      this.jsonDataService.exportJSON.ZXJJL.filter(e => e.type === "2").forEach(
        value => {
          const tmp_d = {
            ckx: "",
            zqxbz_d: "",
            hqxbz: 0,
            lx_d: "",
            hd_d: 0,
            lh_d: 0
          };
          tmp_d.ckx = value.ckx;
          tmp_d.zqxbz_d = value.region;
          tmp_d.hqxbz = Number(value.lay);
          tmp_d.lx_d = value.matIndex;
          tmp_d.hd_d = Number(value.hd);
          tmp_d.lh_d = Number(value.lh);
          this.tableDataD.push(tmp_d);
        }
      );
    }
    console.log("反序列化 纵肋 结束");
  }

  // 腹板纵向加劲肋布置  最后一行加入行
  addRow2(tableData: any[]) {
    tableData.push({
      wz: "FB1",
      zqxbz: "",
      sxbz: "",
      lx: "ZXKK1",
      hd: "",
      lh: ""
    });
  }

  // 腹板纵向加劲肋布置  插入行
  addRow(index: number, tableData: any[]) {
    tableData.splice(index + 1, 0, {
      wz: "FB1",
      zqxbz: "",
      sxbz: "",
      lx: "ZXKK1",
      hd: "",
      lh: ""
    });
  }

  // 腹板纵向加劲肋布置  删除当前行
  removeRow(index: number, tableData: any[]) {
    tableData.splice(index, 1);
  }

  // 底板纵向加劲肋布置  增加行
  addRow2Gljd(tableDataD: any[]) {
    tableDataD.push({
      ckx: "XLCen1",
      zqxbz_d: "",
      hqxbz: "",
      lx_d: "ZXKK1",
      hd_d: "",
      lh_d: ""
    });
  }

  // 底板纵向加劲肋布置  插入行
  addRowGljd(index: number, tableDataD: any[]) {
    tableDataD.splice(index + 1, 0, {
      ckx: "XLCen1",
      zqxbz_d: "",
      hqxbz: "",
      lx_d: "ZXKK1",
      hd_d: "",
      lh_d: ""
    });
  }

  // 钢底板纵向加劲肋布置  删除当前行
  removeRowGljd(index: number, tableDataD: any[]) {
    tableDataD.splice(index, 1);
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 170px;
}

div.ZongLei {
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
  p {
    float: left;
    margin: 10px 0 0 20px;
  }
}
</style>
<style lang="scss"></style>

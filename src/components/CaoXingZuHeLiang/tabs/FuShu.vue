<template>
  <!-- 支座 -->
  <div class="FuShu">
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>支座</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableData[gangLiangShu - 2]" stripe style="width: 100%"
                  :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="编号">
            <template v-slot="scope">
              <el-input v-model="scope.row.bh" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="纵向定位" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.zxdw">
                <el-option v-for="(item, index) in zxdwOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="横向定位">
            <template v-slot="scope">
              <el-input v-model="scope.row.hxdw" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="支座类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.zzlx">
                <el-option v-for="(item, index) in zzOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="楔形块">
            <template v-slot="scope">
              <el-input v-model="scope.row.xxk" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRow(scope.$index, tableData0)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRow(scope.$index, tableData0)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2(tableData0)" style="float:left">增加行</el-button>
        </div>
      </div>
      <p>备注：横向定位，默认参考线为道路设计线</p>
    </div>
    <!-- 泄水孔 -->
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>泄水孔</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableDataXsk" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="纵向索引横隔系" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.zxsyhgx">
                <el-option v-for="(item, index) in zxsyhgxOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="纵向布置（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.zxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="横向索引腹板线" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.hxsyfbx">
                <el-option v-for="(item, index) in hxsxbzckxOption1" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="横向布置（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.hxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="引水板定位">
            <template v-slot="scope">
              <el-input v-model="scope.row.ysbdw" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.lx">
                <el-option v-for="(item, index) in lxOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRowXsk(scope.$index, tableDataXsk)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRowXsk(scope.$index, tableDataXsk)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2Xsk(tableDataXsk)" style="float:left">增加行</el-button>
        </div>
      </div>
      <p>
        引水板定位备注：纵桥向默认起点为横隔板，横向定位为腹板线与箱室结构中心线
      </p>
    </div>
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>检修孔</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableDataJxk" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="位置" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.wz" @change="change(scope.row.wz, scope.$index)">
                <el-option v-for="(item, index) in wzOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="纵向布置参考线" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.zxbzckx">
                <el-option v-for="(item, index) in zxbzckxOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="纵向布置（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.jxkZxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="横向/竖向布置参考线" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.hxsxbzckx">
                <el-option v-for="(item, index) in scope.row.hxsxbzckxOption" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="横向/竖向布置（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.hxsxbz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.jxkLx">
                <el-option v-for="(item, index) in jxkLxOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRowJxk(scope.$index, tableDataJxk)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRowJxk(scope.$index, tableDataJxk)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2Jxk(tableDataJxk)" style="float:left">增加行</el-button>
        </div>
      </div>
      <p>
        纵向布置参考线备注：调用前面生成的布孔线，下拉菜单选择<br />
        横向布置参考线备注：调用前面生成的箱室结构中心线，下拉菜单选择
      </p>
    </div>
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>预拱度</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableDataYgd" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="纵向定位（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.ygdZxdw" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="矢高（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.sg" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="addRowYgd(scope.$index, tableDataYgd)">插入</el-button>
              <el-button size="mini" type="danger" @click="removeRowYgd(scope.$index, tableDataYgd)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align:center; margin:10px 0 0 0">
          <el-button type="primary" @click="addRow2Ygd(tableDataYgd)" style="float:left">增加行</el-button>
        </div>
      </div>
    </div>
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h2>剪力钉</h2>
        <h3>上翼缘板剪力钉布置</h3>
        <h4>纵桥向布置</h4>
      </div>
      <div class="text-item">
        <el-table :data="tableDataYybJld" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="起始端/终止端距离（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.qsdJl" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="布置（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.bz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="190px">
            <template v-slot="scope">
              <el-select v-model="scope.row.jldLx">
                <el-option v-for="(item, index) in jldLxOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-form ref="form" :model="form" label-width="150px" label-position="left">
          <el-form-item label="横桥向布置:">
            <el-input v-model="form.hqxbz" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="header">
        <h3>横隔板和横梁顶板剪力钉布置</h3>
        <h4>横桥向布置</h4>
      </div>
      <div class="text-item">
        <el-table :data="tableDataHgbJld" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="箱室内调整间距（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.xsjj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="箱梁范围内调整间距（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.xljj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="标准间距（mm）">
            <template v-slot="scope">
              <el-input v-model="scope.row.bzjj" clearable></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-form ref="formZqxbz" :model="formZqxbz" label-width="150px" label-position="left">
          <el-form-item label="纵桥向布置:">
            <el-input v-model="formZqxbz.zqxbz" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p>
        备注：以(,;)隔开所表达的意思如括号内所示(间距数,间距;间距数,间距)
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import { ZZ, XSK, JXK } from "../models/export-data";
import { makeLabelValueArray } from "@/utils/misc";

interface ConstructNode {
  id: number;
  name: string;
  desc?: string;
  type: string;
  needFill?: boolean;
}

interface TableDataBH {
  bh: string;
  zxdw: string;
  hxdw: string;
  zzlx: string;
  xxk: string;
}

interface TableDataBH1 {
  bh: string;
  zxdw: string;
  hxdw: string;
  zzlx: string;
  xxk: string;
}

interface TableDataBH2 {
  bh: string;
  zxdw: string;
  hxdw: string;
  zzlx: string;
  xxk: string;
}

interface TableDataBH3 {
  bh: string;
  zxdw: string;
  hxdw: string;
  zzlx: string;
  xxk: string;
}

interface TableDataBH4 {
  bh: string;
  zxdw: string;
  hxdw: string;
  zzlx: string;
  xxk: string;
}

interface JxkEntry {
  wz: string;
  zxbzckx: string;
  jxkZxbz: string;
  hxsxbzckxOption: { label: string; value: string }[];
  hxsxbzckx: string;
  hxsxbz: string;
  jxkLx: string;
}

@Component({
  components: {}
})
export default class FuShu extends Vue {
  name = "FuShu";
  @Inject() jsonDataService!: JsonDataService;

  qb = this.jsonDataService.valueQB;
  gangLiangShu = this.jsonDataService.amoutGZL;

  // 支座  表格数据
  tableData: [
    TableDataBH[],
    TableDataBH1[],
    TableDataBH2[],
    TableDataBH3[],
    TableDataBH4[]
  ] = [
    [
      {
        bh: "1",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.275 * this.qb)),
        zzlx: "GPZ(2009)4GD",
        xxk: "50,30,30"
      },
      {
        bh: "2",
        zxdw: "BK0",
        hxdw: String(Math.round(0.275 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "3",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.275 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "4",
        zxdw: "BK1",
        hxdw: String(Math.round(0.275 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      }
    ],
    [
      {
        bh: "1",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.335 * this.qb)),
        zzlx: "GPZ(2009)4GD",
        xxk: "50,30,30"
      },
      {
        bh: "2",
        zxdw: "BK0",
        hxdw: String(Math.round(0 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "3",
        zxdw: "BK0",
        hxdw: String(Math.round(0.335 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "4",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.335 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "5",
        zxdw: "BK1",
        hxdw: String(Math.round(0 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "6",
        zxdw: "BK1",
        hxdw: String(Math.round(0.335 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      }
    ],
    [
      {
        bh: "1",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.38625 * this.qb)),
        zzlx: "GPZ(2009)4GD",
        xxk: "50,30,30"
      },
      {
        bh: "2",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.12875 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "3",
        zxdw: "BK0",
        hxdw: String(Math.round(0.12875 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "4",
        zxdw: "BK0",
        hxdw: String(Math.round(0.38625 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "5",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.38625 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "6",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.12875 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "7",
        zxdw: "BK1",
        hxdw: String(Math.round(0.12875 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "8",
        zxdw: "BK1",
        hxdw: String(Math.round(0.38625 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      }
    ],
    [
      {
        bh: "1",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.41 * this.qb)),
        zzlx: "GPZ(2009)4GD",
        xxk: "50,30,30"
      },
      {
        bh: "2",
        zxdw: "BK0",
        hxdw: String(Math.round(-0.205 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "3",
        zxdw: "BK0",
        hxdw: String(Math.round(0 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "4",
        zxdw: "BK0",
        hxdw: String(Math.round(0.205 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "5",
        zxdw: "BK0",
        hxdw: String(Math.round(0.41 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "6",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.41 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "7",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.205 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "8",
        zxdw: "BK1",
        hxdw: String(Math.round(0 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "9",
        zxdw: "BK1",
        hxdw: String(Math.round(0.205 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "10",
        zxdw: "BK1",
        hxdw: String(Math.round(0.41 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      }
    ],
    [
      {
        bh: "1",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.43125 * this.qb)),
        zzlx: "GPZ(2009)4GD",
        xxk: "50,30,30"
      },
      {
        bh: "2",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.25875 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "3",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.8625 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "4",
        zxdw: "BK1",
        hxdw: String(Math.round(0.8625 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "5",
        zxdw: "BK1",
        hxdw: String(Math.round(0.25875 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "6",
        zxdw: "BK1",
        hxdw: String(Math.round(0.43125 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "7",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.43125 * this.qb)),
        zzlx: "GPZ(2009)4DX-100",
        xxk: "50,30,30"
      },
      {
        bh: "8",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.25875 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "9",
        zxdw: "BK1",
        hxdw: String(Math.round(-0.8625 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "10",
        zxdw: "BK1",
        hxdw: String(Math.round(0.8625 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "11",
        zxdw: "BK1",
        hxdw: String(Math.round(0.25875 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      },
      {
        bh: "12",
        zxdw: "BK1",
        hxdw: String(Math.round(0.43125 * this.qb)),
        zzlx: "GPZ(2009)4SX-100",
        xxk: "50,30,30"
      }
    ]
  ];

  // 纵向定位
  zxdwOption = ["BK0", "BK1"];

  // 支座类型
  zzOption: any[] = [];

  // 泄水孔  表格数据
  tableDataXsk = [
    {
      zxsyhgx: "HGB1",
      zxbz: "280",
      hxsyfbx: "FB1",
      hxbz: "50",
      ysbdw: "200,650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB1",
      zxbz: "280",
      hxsyfbx: "FB2",
      hxbz: "-50",
      ysbdw: "200,650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB1",
      zxbz: "280",
      hxsyfbx: "FB3",
      hxbz: "50",
      ysbdw: "200,650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB1",
      zxbz: "280",
      hxsyfbx: "FB4",
      hxbz: "-50",
      ysbdw: "200,650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB9",
      zxbz: "-280",
      hxsyfbx: "FB1",
      hxbz: "50",
      ysbdw: "-200,-650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB9",
      zxbz: "-280",
      hxsyfbx: "FB2",
      hxbz: "-50",
      ysbdw: "-200,-650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB9",
      zxbz: "-280",
      hxsyfbx: "FB3",
      hxbz: "50",
      ysbdw: "-200,-650",
      lx: "XSK1"
    },
    {
      zxsyhgx: "HGB9",
      zxbz: "-280",
      hxsyfbx: "FB4",
      hxbz: "-50",
      ysbdw: "-200,-650",
      lx: "XSK1"
    }
  ];

  // 纵向索引横隔系
  zxsyhgxOption = [
    "HGB1",
    "HGB2",
    "HGB3",
    "HGB4",
    "HGB5",
    "HGB6",
    "HGB7",
    "HGB8",
    "HGB9",
    "HGB10",
    "HGB11",
    "HGB12"
  ];

  // 类型
  lxOption: string[] = [];

  // 横向/竖向布置参考线
  hxsxbzckxOption1 = makeLabelValueArray(
    "腹板",
    "FB",
    1,
    this.jsonDataService.amoutGZL * 2
  );

  hxsxbzckxOption2 = makeLabelValueArray(
    "箱梁中心线",
    "XLCen",
    1,
    this.jsonDataService.amoutGZL
  );

  // 检修孔  表格数据
  tableDataJxk: JxkEntry[] = [
    {
      wz: "腹板",
      zxbzckx: "BK0",
      jxkZxbz: "40",
      hxsxbzckxOption: this.hxsxbzckxOption1,
      hxsxbzckx: "FB1",
      hxsxbz: "900",
      jxkLx: "JXK2"
    },
    {
      wz: "腹板",
      zxbzckx: "BK1",
      jxkZxbz: "-40",
      hxsxbzckxOption: this.hxsxbzckxOption1,
      hxsxbzckx: "FB1",
      hxsxbz: "900",
      jxkLx: "JXK2"
    },
    {
      wz: "腹板",
      zxbzckx: "BK0",
      jxkZxbz: "40",
      hxsxbzckxOption: this.hxsxbzckxOption1,
      hxsxbzckx: "FB4",
      hxsxbz: "900",
      jxkLx: "JXk2"
    },
    {
      wz: "腹板",
      zxbzckx: "BK1",
      jxkZxbz: "-40",
      hxsxbzckxOption: this.hxsxbzckxOption1,
      hxsxbzckx: "FB4",
      hxsxbz: "900",
      jxkLx: "JXk2"
    }
  ];

  // 位置
  wzOption = ["腹板", "底板"];

  // 纵向参考线
  zxbzckxOption = ["BK0", "BK1"];

  // 检修孔  类型
  jxkLxOption: string[] = [];

  // 检修孔  位置改变时，横向/竖向布置参考线数据集改变
  change(row: string, index: number) {
    if (row === "腹板") {
      this.tableDataJxk[index].hxsxbzckxOption = this.hxsxbzckxOption1;
      this.tableDataJxk[index].hxsxbzckx = "FB1";
    } else if (row === "底板") {
      this.tableDataJxk[index].hxsxbzckxOption = this.hxsxbzckxOption2;
      this.tableDataJxk[index].hxsxbzckx = "XLCen1";
    }
  }

  // 预拱度  表格数据
  tableDataYgd = [
    {
      ygdZxdw: "1950",
      sg: "23"
    },
    {
      ygdZxdw: "2500",
      sg: "48"
    },
    {
      ygdZxdw: "2500",
      sg: "70"
    },
    {
      ygdZxdw: "2500",
      sg: "88"
    },
    {
      ygdZxdw: "2500",
      sg: "101"
    },
    {
      ygdZxdw: "2500",
      sg: "111"
    },
    {
      ygdZxdw: "2500",
      sg: "117"
    },
    {
      ygdZxdw: "2500",
      sg: "119"
    },
    {
      ygdZxdw: "2500",
      sg: "117"
    },
    {
      ygdZxdw: "2500",
      sg: "111"
    },
    {
      ygdZxdw: "2500",
      sg: "101"
    },
    {
      ygdZxdw: "2500",
      sg: "88"
    },
    {
      ygdZxdw: "2500",
      sg: "70"
    },
    {
      ygdZxdw: "2500",
      sg: "48"
    },
    {
      ygdZxdw: "2500",
      sg: "23"
    },
    {
      ygdZxdw: "1950",
      sg: "0"
    }
  ];

  getStringYGD(): string {
    let ygd = "";
    this.tableDataYgd.forEach(value => {
      ygd += `${value.ygdZxdw},${value.sg};`;
    });
    return ygd.substring(0, ygd.length - 1);
  }

  // 剪力钉  上翼缘板剪力钉布置  表格数据
  tableDataYybJld = [
    {
      qsdJl: "160",
      bz: "198*201",
      jldLx: "D22x200"
    }
  ];

  // 剪力钉  上翼缘板剪力钉布置  类型
  jldLxOption: string[] = [];

  // 横桥向布置  初始值
  form = {
    hqxbz: "3*150"
  };

  // 剪力钉  横隔板和横梁顶板剪力钉布置  表格数据
  tableDataHgbJld = [
    {
      xsjj: "150",
      xljj: "150",
      bzjj: "200"
    }
  ];

  // 纵桥向布置
  formZqxbz = {
    zqxbz: "2*150"
  };

  getStringZX(): string {
    let yybJld = "";
    this.tableDataYybJld.forEach(value => {
      yybJld += `${value.qsdJl},${value.bz};`;
    });
    return yybJld.substring(0, yybJld.length - 1);
  }

  getStringHX(): string {
    let hgbJld = "";
    this.tableDataHgbJld.forEach(value => {
      hgbJld += `${value.xsjj},${value.xljj},${value.bzjj};`;
    });
    return hgbJld.substring(0, hgbJld.length - 1);
  }

  // 序列化
  serialize() {
    console.log("序列化 附属 开始");
    const res: ZZ[] = [];
    const xsks: XSK[] = [];
    const jxks: JXK[] = [];
    // 支座
    if (this.gangLiangShu === 2) {
      this.tableData[0].forEach((tdBH: TableDataBH) => {
        const zz: ZZ = new ZZ();
        zz.aaaid = tdBH.bh;
        zz.zxckx = tdBH.zxdw;
        zz.hxpos = tdBH.hxdw;
        zz.type = tdBH.zzlx;
        zz.xxk = tdBH.xxk;
        res.push(zz);
      });
    } else if (this.gangLiangShu === 3) {
      this.tableData[1].forEach((tdBH1: TableDataBH1) => {
        const zz1: ZZ = new ZZ();
        zz1.aaaid = tdBH1.bh;
        zz1.zxckx = tdBH1.zxdw;
        zz1.hxpos = tdBH1.hxdw;
        zz1.type = tdBH1.zzlx;
        zz1.xxk = tdBH1.xxk;
        res.push(zz1);
      });
    } else if (this.gangLiangShu === 4) {
      this.tableData[2].forEach((tdBH2: TableDataBH2) => {
        const zz2: ZZ = new ZZ();
        zz2.aaaid = tdBH2.bh;
        zz2.zxckx = tdBH2.zxdw;
        zz2.hxpos = tdBH2.hxdw;
        zz2.type = tdBH2.zzlx;
        zz2.xxk = tdBH2.xxk;
        res.push(zz2);
      });
    } else if (this.gangLiangShu === 5) {
      this.tableData[3].forEach((tdBH3: TableDataBH3) => {
        const zz3: ZZ = new ZZ();
        zz3.aaaid = tdBH3.bh;
        zz3.zxckx = tdBH3.zxdw;
        zz3.hxpos = tdBH3.hxdw;
        zz3.type = tdBH3.zzlx;
        zz3.xxk = tdBH3.xxk;
        res.push(zz3);
      });
    } else if (this.gangLiangShu === 6) {
      this.tableData[4].forEach((tdBH4: TableDataBH4) => {
        const zz4: ZZ = new ZZ();
        zz4.aaaid = tdBH4.bh;
        zz4.zxckx = tdBH4.zxdw;
        zz4.hxpos = tdBH4.hxdw;
        zz4.type = tdBH4.zzlx;
        zz4.xxk = tdBH4.xxk;
        res.push(zz4);
      });
    }
    this.jsonDataService.exportJSON.ZZ = res;

    // 泄水孔
    this.tableDataXsk.forEach((value, index) => {
      const xsk: XSK = new XSK();
      xsk.aaaid = `xsk${String(index + 1)}`;
      xsk.ckFB = value.hxsyfbx;
      xsk.ckHGX = value.zxsyhgx;
      xsk.hpos = value.hxbz;
      xsk.matIndex = value.lx;
      xsk.ysbPos = value.ysbdw;
      xsk.zpos = value.zxbz;
      xsks.push(xsk);
    });
    this.jsonDataService.exportJSON.XSK = xsks;

    // 检修孔
    this.tableDataJxk.forEach((value, index) => {
      const jxk: JXK = new JXK();
      jxk.aaaid = `jxk${String(index + 1)}`;
      jxk.hxCKX = value.hxsxbzckx;
      jxk.hxPos = value.hxsxbz;
      jxk.matIndex = value.jxkLx;
      jxk.type = value.wz;
      jxk.zxCKX = value.zxbzckx;
      jxk.zxPos = value.jxkZxbz;
      jxks.push(jxk);
    });
    this.jsonDataService.exportJSON.JXK = jxks;
    // 预拱度
    const main = this.jsonDataService.exportJSON.MAIN;
    const ygd = main.find(e => e.aaak === "ygd");
    if (ygd) {
      ygd.v = this.getStringYGD();
    }
    // 剪力钉
    // 上翼缘板剪力钉布置
    const yybJld = main.find(e => e.aaak === "jldYYBZLay");
    if (yybJld && yybJld.v) {
      yybJld.v = this.getStringZX();
    }
    const hqxBz = main.find(e => e.aaak === "jldTBZ");
    if (hqxBz && hqxBz.v) {
      hqxBz.v = this.form.hqxbz.replace("*", ",");
    }
    // 横隔板和横梁顶板剪力钉布置
    const hgbJld = main.find(e => e.aaak === "jldTBH");
    if (hgbJld && hgbJld.v) {
      hgbJld.v = this.getStringHX();
    }
    const zqxBz = main.find(e => e.aaak === "jldYYBH");
    if (zqxBz && zqxBz.v) {
      zqxBz.v = this.formZqxbz.zqxbz.replace("*", ",");
    }
    // 上翼缘板剪力钉布置  类型
    const jldLx = main.find(e => e.aaak === "jldMat");
    if (jldLx && jldLx.v) {
      jldLx.v = this.tableDataYybJld[0].jldLx;
    }

    console.log("序列化 附属 结束");
  }

  // 反序列化
  deserialize() {
    console.log("反序列化 附属 开始");
    this.lxOption = this.jsonDataService.ljkJSON.drainHoleXsk;
    this.jxkLxOption = this.jsonDataService.ljkJSON.manholeJxk;
    this.jldLxOption = this.jsonDataService.ljkJSON.shearStudsJld;
    this.zzOption = this.jsonDataService.ljkJSON.seatSeat;
    this.gangLiangShu = this.jsonDataService.amoutGZL;
    this.hxsxbzckxOption1 = makeLabelValueArray(
      "腹板",
      "FB",
      1,
      this.jsonDataService.amoutGZL * 2
    );
    this.hxsxbzckxOption2 = makeLabelValueArray(
      "箱梁中心线",
      "XLCen",
      1,
      this.jsonDataService.amoutGZL
    );

    if (this.gangLiangShu === 2) {
      const zz = this.jsonDataService.exportJSON.ZZ;
      const tableData0: any[] = this.tableData;
      const minLen = Math.min(zz.length, tableData0.length);
      for (let i = 0; i < minLen; ++i) {
        const tdBH = tableData0[i];
        tdBH.bh = zz[i].aaaid;
        tdBH.zxdw = zz[i].zxckx;
        tdBH.hxdw = zz[i].hxpos;
        tdBH.zzlx = zz[i].type;
        tdBH.xxk = zz[i].xxk;
      }
    } else if (this.gangLiangShu === 3) {
      const zz1 = this.jsonDataService.exportJSON.ZZ;
      const tableData1: any[] = this.tableData;
      const minLen = Math.min(zz1.length, tableData1.length);
      for (let i = 0; i < minLen; ++i) {
        const tdBH1 = tableData1[i];
        tdBH1.bh = zz1[i].aaaid;
        tdBH1.zxdw = zz1[i].zxckx;
        tdBH1.hxdw = zz1[i].hxpos;
        tdBH1.zzlx = zz1[i].type;
        tdBH1.xxk = zz1[i].xxk;
      }
    } else if (this.gangLiangShu === 4) {
      const zz2 = this.jsonDataService.exportJSON.ZZ;
      const tableData2: any[] = this.tableData;
      const minLen = Math.min(zz2.length, tableData2.length);
      for (let i = 0; i < minLen; ++i) {
        const tdBH2 = tableData2[i];
        tdBH2.bh = zz2[i].aaaid;
        tdBH2.zxdw = zz2[i].zxckx;
        tdBH2.hxdw = zz2[i].hxpos;
        tdBH2.zzlx = zz2[i].type;
        tdBH2.xxk = zz2[i].xxk;
      }
    } else if (this.gangLiangShu === 5) {
      const zz3 = this.jsonDataService.exportJSON.ZZ;
      const tableData3: any[] = this.tableData;
      const minLen = Math.min(zz3.length, tableData3.length);
      for (let i = 0; i < minLen; ++i) {
        const tdBH3 = tableData3[i];
        tdBH3.bh = zz3[i].aaaid;
        tdBH3.zxdw = zz3[i].zxckx;
        tdBH3.hxdw = zz3[i].hxpos;
        tdBH3.zzlx = zz3[i].type;
        tdBH3.xxk = zz3[i].xxk;
      }
    } else if (this.gangLiangShu === 6) {
      const zz4 = this.jsonDataService.exportJSON.ZZ;
      const tableData4: any[] = this.tableData;
      const minLen = Math.min(zz4.length, tableData4.length);
      for (let i = 0; i < minLen; ++i) {
        const tdBH4 = tableData4[i];
        tdBH4.bh = zz4[i].aaaid;
        tdBH4.zxdw = zz4[i].zxckx;
        tdBH4.hxdw = zz4[i].hxpos;
        tdBH4.zzlx = zz4[i].type;
        tdBH4.xxk = zz4[i].xxk;
      }
    }
    // 泄水孔
    this.tableDataXsk = [];
    this.jsonDataService.exportJSON.XSK.forEach(value => {
      const xsk = {
        zxsyhgx: "",
        zxbz: "",
        hxsyfbx: "",
        hxbz: "",
        ysbdw: "",
        lx: ""
      };
      xsk.zxsyhgx = value.ckHGX;
      xsk.zxbz = value.zpos;
      xsk.hxsyfbx = value.ckFB;
      xsk.hxbz = value.hpos;
      xsk.ysbdw = value.ysbPos;
      xsk.lx = value.matIndex;
      this.tableDataXsk.push(xsk);
    });
    // 检修孔
    this.tableDataJxk = [];
    this.jsonDataService.exportJSON.JXK.forEach(value => {
      const jxk: JxkEntry = {
        wz: "",
        zxbzckx: "",
        jxkZxbz: "",
        hxsxbzckxOption: [],
        hxsxbzckx: "",
        hxsxbz: "",
        jxkLx: ""
      };
      jxk.wz = value.type;
      jxk.zxbzckx = value.zxCKX;
      jxk.jxkZxbz = value.zxPos;
      jxk.hxsxbzckxOption =
        value.type === "腹板" ? this.hxsxbzckxOption1 : this.hxsxbzckxOption2;
      jxk.hxsxbzckx = value.hxCKX;
      jxk.hxsxbz = value.hxPos;
      jxk.jxkLx = value.matIndex;
      this.tableDataJxk.push(jxk);
    });

    // 预拱度
    this.tableDataYgd = [];
    const main = this.jsonDataService.exportJSON.MAIN;
    const ygd = main.find(e => e.aaak === "ygd");
    if (ygd && ygd.v) {
      ygd.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = {
            ygdZxdw: "",
            sg: ""
          };
          const col: string[] = row.split(",");
          tmp.ygdZxdw = col[0];
          tmp.sg = col[1];
          this.tableDataYgd.push(tmp);
        });
    }

    // 剪力钉
    this.tableDataYybJld = [];
    const yybJld = main.find(e => e.aaak === "jldYYBZLay");
    const jldLx1 = main.find(e => e.aaak === "jldMat");
    if (yybJld && yybJld.v && jldLx1 && jldLx1.v) {
      yybJld.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = {
            qsdJl: "",
            bz: "",
            jldLx: ""
          };
          const col: string[] = row.split(",");
          tmp.qsdJl = col[0];
          tmp.bz = col[1];
          tmp.jldLx = jldLx1.v;
          this.tableDataYybJld.push(tmp);
        });
    }
    const hqxbz = main.find(e => e.aaak === "jldYYBH");
    if (hqxbz && hqxbz.v) {
      this.form.hqxbz = hqxbz.v.replace(",", "*");
    }

    this.tableDataHgbJld = [];
    const hgbJld = main.find(e => e.aaak === "jldTBH");
    if (hgbJld && hgbJld.v) {
      hgbJld.v
        .split(";")
        .filter(e => e !== "")
        .forEach(row => {
          const tmp = { xsjj: "", xljj: "", bzjj: "" };
          const col: string[] = row.split(",");
          tmp.xsjj = col[0];
          tmp.xljj = col[1];
          tmp.bzjj = col[2];
          this.tableDataHgbJld.push(tmp);
        });
    }
    const zqxbz = main.find(e => e.aaak === "jldTBZ");
    if (zqxbz && zqxbz.v) {
      this.formZqxbz.zqxbz = zqxbz.v.replace(",", "*");
    }

    console.log("反序列化 附属 结束");
  }

  // 支座  最后一行加入行
  addRow2(tableData: any[]) {
    tableData.push({
      bh: "",
      zxdw: "BK0",
      hxdw: "",
      zzlx: "GPZ(2009)0.4DX-50",
      xxk: ""
    });
  }

  // 支座  插入行
  addRow(index: number, tableData: any[]) {
    tableData.splice(index + 1, 0, {
      bh: "",
      zxdw: "BK0",
      hxdw: "",
      zzlx: "GPZ(2009)0.4DX-50",
      xxk: ""
    });
  }

  // 支座  删除当前行
  removeRow(index: number, tableData: TableDataBH[]) {
    tableData.splice(index, 1);
  }

  // 泄水孔  最后一行加入行
  addRow2Xsk(tableDataXsk: any[]) {
    tableDataXsk.push({
      zxsyhgx: "HGB1",
      zxbz: "",
      hxsyfbx: "FB1",
      hxbz: "",
      ysbdw: "",
      lx: "XSK1"
    });
  }

  // 泄水孔  插入行
  addRowXsk(index: number, tableDataXsk: any[]) {
    tableDataXsk.splice(index + 1, 0, {
      zxsyhgx: "HGB1",
      zxbz: "",
      hxsyfbx: "FB1",
      hxbz: "",
      ysbdw: "",
      lx: "XSK1"
    });
  }

  // 泄水孔  删除当前行
  removeRowXsk(index: number, tableDataXsk: any[]) {
    tableDataXsk.splice(index, 1);
  }

  // 检修孔  最后一行加入行
  addRow2Jxk(tableDataJxk: any[]) {
    tableDataJxk.push({
      wz: "腹板",
      zxbzckx: "BK0",
      jxkZxbz: "40",
      hxsxbzckx: "FB1",
      hxsxbz: "900",
      jxkLx: "JKX2"
    });
  }

  // 检修孔  插入行
  addRowJxk(index: number, tableDataJxk: any[]) {
    tableDataJxk.splice(index + 1, 0, {
      wz: "腹板",
      zxbzckx: "BK0",
      jxkZxbz: "0",
      hxsxbzckx: "FB1",
      hxsxbz: "0",
      jxkLx: "JXK1"
    });
  }

  // 检修孔  删除当前行
  removeRowJxk(index: number, tableDataJxk: any[]) {
    tableDataJxk.splice(index, 1);
  }

  // 预拱度  最后一行加入行
  addRow2Ygd(tableDataYgd: any[]) {
    tableDataYgd.push({
      ygdZxdw: "",
      sg: ""
    });
  }

  // 预拱度  插入行
  addRowYgd(index: number, tableDataYgd: any[]) {
    tableDataYgd.splice(index + 1, 0, {
      ygdZxdw: "",
      sg: ""
    });
  }

  // 预拱度  删除当前行
  removeRowYgd(index: number, tableDataYgd: any[]) {
    tableDataYgd.splice(index, 1);
  }
}
</script>
<style lang="scss" scoped>
div.FuShu {
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
  .header {
    text-align: left;
  }
}
</style>
<style lang="scss"></style>

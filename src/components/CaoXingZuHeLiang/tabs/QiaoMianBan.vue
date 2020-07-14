<template>
  <div class="QiaoMianBan">
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>钢筋</h3>
      </div>
      <div class="text-item">
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
          <el-table-column label="钢筋名称" prop="gjmc" width="190px">
          </el-table-column>
          <el-table-column label="钢筋直径">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.gjzj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="钢种">
            <template v-slot="scope">
              <el-input v-model="scope.row.gz" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="横向间距/间隔">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.hxjj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="横向最小间距">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.hxzxjj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="弯钩长度">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.wgcd" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="边距（中心到边）">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.bj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="纵向间距/间隔">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.zxjj" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="锚固长度">
            <template v-slot="scope">
              <el-input type="number" v-model="scope.row.mgcd" clearable></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { GJ } from "../models/export-data";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";

@Component({
  components: {}
})
export default class QiaoMianBan extends Vue {
  name = "QiaoMianBan";

  @Inject() jsonDataService!: JsonDataService;

  // 表格数据  桥面板
  tableData = [
    {
      gjmc: "横筋顶",
      gjzj: 16,
      gz: 3,
      hxjj: 125,
      hxzxjj: 125,
      wgcd: 0,
      bj: 44.2,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "横筋底",
      gjzj: 16,
      gz: 3,
      hxjj: 125,
      hxzxjj: 125,
      wgcd: 0,
      bj: 54.2,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "横筋底边支",
      gjzj: 16,
      gz: 3,
      hxjj: 125,
      hxzxjj: 125,
      wgcd: 300,
      bj: 54.2,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "纵筋顶",
      gjzj: 20,
      gz: 3,
      hxjj: 125,
      hxzxjj: 0,
      wgcd: 200,
      bj: 67.6,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "纵筋顶墩顶",
      gjzj: 25,
      gz: 3,
      hxjj: 125,
      hxzxjj: 0,
      wgcd: 250,
      bj: 67.6,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "纵筋底",
      gjzj: 20,
      gz: 3,
      hxjj: 125,
      hxzxjj: 0,
      wgcd: 200,
      bj: 77.6,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "纵筋底墩顶",
      gjzj: 25,
      gz: 3,
      hxjj: 125,
      hxzxjj: 0,
      wgcd: 250,
      bj: 77.6,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "勾筋",
      gjzj: 12,
      gz: 3,
      hxjj: 1,
      hxzxjj: 0,
      wgcd: 120,
      bj: 0,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "槽口顶横向",
      gjzj: 16,
      gz: 3,
      hxjj: 125,
      hxzxjj: 125,
      wgcd: 160,
      bj: 44.2,
      zxjj: 100,
      mgcd: 500
    },
    {
      gjmc: "槽口顶纵向",
      gjzj: 16,
      gz: 3,
      hxjj: 125,
      hxzxjj: 125,
      wgcd: 160,
      bj: 62.6,
      zxjj: 100,
      mgcd: 500
    }
  ];

  serialize() {
    console.log("序列化 桥面板 开始");
    const gjs: GJ[] = [];
    this.tableData.forEach(value => {
      const gj: GJ = new GJ();
      gj.aaaid = value.gjmc;
      gj.d = String(value.gjzj);
      gj.djl = String(value.bj);
      gj.djr = String(value.bj);
      gj.s = String(value.zxjj);
      gj.sb = String(value.hxjj);
      gj.sm = String(value.hxzxjj);
      gj.sz = String(value.bj);
      gj.type = String(value.gz);
      gj.wg = String(value.wgcd);
      gj["锚固长度"] = String(value.mgcd);
      gjs.push(gj);
    });
    this.jsonDataService.exportJSON.GJ = gjs;
    console.log("序列化 桥面板 完成");
  }

  deserialize() {
    console.log("反序列化 桥面板 开始");
    let index = 0;
    this.jsonDataService.exportJSON.GJ.forEach(value => {
      const row = this.tableData[index];
      // row.gjmc = value.aaaid;
      row.gjzj = Number(value.d);
      row.gz = Number(value.type);
      row.hxjj = Number(value.sb);
      row.hxzxjj = Number(value.sm);
      row.wgcd = Number(value.wg);
      row.bj = Number(value.sz);
      row.zxjj = Number(value.s);
      row.mgcd = Number(value["锚固长度"]);

      ++index;
    });
    console.log("反序列化 桥面板 完成");
  }
}
</script>

<style lang="scss" scoped>
div.QiaoMianBan {
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
  .header {
    text-align: left;
  }
}
</style>
<style lang="scss"></style>

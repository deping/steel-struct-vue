<template>
  <div class="HuiTuSheZhi">
    <div id="other" style="margin:20px 0 0 10px">
      <div class="header">
        <h3>出图选项</h3>
      </div>
      <div class="text-item">
        <el-table
          ref="table"
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6' }"
          :span-method="mergeRow"
        >
          <el-table-column prop="tzmc" label="图纸名称" class-name="top">
          </el-table-column>
          <el-table-column label="出图">
            <el-table-column
              type="selection"
              width="155"
              class-name="top"
              :selectable="checkBoxDisable"
            ></el-table-column>
          </el-table-column>

          <el-table-column prop="tk" label="图块"> </el-table-column>
          <el-table-column label="比例">
            <template v-slot="scope">
              <el-input v-model="scope.row.bl" clearable></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { HTBL } from "../models/export-data";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";
import { ElTable2 } from "@/typings/element-ui";

interface DrawingSettingTableEntry {
  tzmc: string;
  tk: string;
  bl: number;
  keyInJSON: string;
  rowSpan: number;
  draw: boolean;
}

@Component({
  components: {}
})
export default class HuiTuSheZhi extends Vue {
  name = "HuiTuSheZhi";

  @Inject() jsonDataService!: JsonDataService;

  // 表格数据
  tableData: DrawingSettingTableEntry[] = [
    {
      tzmc: "主要材料汇总表",
      tk: "",
      bl: 40,
      keyInJSON: "z",
      draw: false,
      rowSpan: 1
    },
    {
      tzmc: "组合梁总体布置图",
      tk: "平面",
      bl: 120,
      keyInJSON: "zhlzpm",
      draw: false,
      rowSpan: 4
    },
    {
      tzmc: "组合梁总体布置图",
      tk: "立面",
      bl: 120,
      keyInJSON: "zhlzlm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "组合梁总体布置图",
      tk: "断面",
      bl: 40,
      keyInJSON: "zhlzdm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "组合梁总体布置图",
      tk: "大样",
      bl: 20,
      keyInJSON: "zhlzdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁总体布置图",
      tk: "平面",
      bl: 120,
      keyInJSON: "xlzpm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "箱梁总体布置图",
      tk: "立面",
      bl: 120,
      keyInJSON: "xlzlm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "钢梁横隔系构造图",
      tk: "断面",
      bl: 30,
      keyInJSON: "hgxdm",
      draw: false,
      rowSpan: 3
    },
    {
      tzmc: "钢梁横隔系构造图",
      tk: "大样",
      bl: 20,
      keyInJSON: "hgxdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "钢梁横隔系构造图",
      tk: "局部大样",
      bl: 10,
      keyInJSON: "hgxdy1",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁工地连接构造图",
      tk: "断面",
      bl: 30,
      keyInJSON: "gdljdm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "箱梁工地连接构造图",
      tk: "大样",
      bl: 15,
      keyInJSON: "gdljdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁工厂连接构造图",
      tk: "断面",
      bl: 20,
      keyInJSON: "gcljdm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "箱梁工厂连接构造图",
      tk: "示意图",
      bl: 20,
      keyInJSON: "gcljsty",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "支点横梁构造图",
      tk: "断面",
      bl: 20,
      keyInJSON: "zdhldm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "支点横梁构造图",
      tk: "大样",
      bl: 20,
      keyInJSON: "zdhldy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "中间横梁构造图",
      tk: "断面",
      bl: 20,
      keyInJSON: "zjhldm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "中间横梁构造图",
      tk: "大样",
      bl: 20,
      keyInJSON: "zjhldy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁板件焊接连接构造图",
      tk: "",
      bl: 40,
      keyInJSON: "x",
      draw: false,
      rowSpan: 1
    },
    {
      tzmc: "钢主梁支座调节钢板构造图",
      tk: "立面",
      bl: 120,
      keyInJSON: "tjgblm",
      draw: false,
      rowSpan: 2
    },
    {
      tzmc: "钢主梁支座调节钢板构造图",
      tk: "大样",
      bl: 25,
      keyInJSON: "tjgbdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁预拱度示意图",
      tk: "立面",
      bl: 120,
      keyInJSON: "ygdlm",
      draw: false,
      rowSpan: 1
    },
    {
      tzmc: "箱梁排水构造图",
      tk: "平面",
      bl: 20,
      keyInJSON: "pspm",
      draw: false,
      rowSpan: 3
    },
    {
      tzmc: "箱梁排水构造图",
      tk: "断面",
      bl: 10,
      keyInJSON: "psdm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁排水构造图",
      tk: "大样",
      bl: 5,
      keyInJSON: "psdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁检修门构造图",
      tk: "立面",
      bl: 10,
      keyInJSON: "jxmlm",
      draw: false,
      rowSpan: 3
    },
    {
      tzmc: "箱梁检修门构造图",
      tk: "详图",
      bl: 5,
      keyInJSON: "jxmxt",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "箱梁检修门构造图",
      tk: "大样",
      bl: 5,
      keyInJSON: "jxmdy",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "钢梁支座布置图",
      tk: "平面",
      bl: 120,
      keyInJSON: "zzbzpm",
      draw: false,
      rowSpan: 1
    },
    {
      tzmc: "钢梁剪力钉布置图",
      tk: "平面",
      bl: 120,
      keyInJSON: "jldpm",
      draw: false,
      rowSpan: 3
    },
    {
      tzmc: "钢梁剪力钉布置图",
      tk: "立面",
      bl: 120,
      keyInJSON: "jldlm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "钢梁剪力钉布置图",
      tk: "断面",
      bl: 40,
      keyInJSON: "jlddm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "桥面板钢筋构造图",
      tk: "立面",
      bl: 20,
      keyInJSON: "qmbgjlm",
      draw: false,
      rowSpan: 3
    },
    {
      tzmc: "桥面板钢筋构造图",
      tk: "断面",
      bl: 40,
      keyInJSON: "qmbgjdm",
      draw: false,
      rowSpan: 0
    },
    {
      tzmc: "桥面板钢筋构造图",
      tk: "大样",
      bl: 20,
      keyInJSON: "qmbgjdy",
      draw: false,
      rowSpan: 0
    }
  ];

  $refs!: {
    table: ElTable2;
  };

  // 重复合并
  mergeRow(ctx: { row: DrawingSettingTableEntry; columnIndex: number }) {
    if (ctx.columnIndex > 1) {
      return [1, 1];
    } else {
      return [ctx.row.rowSpan, 1];
    }
  }

  // 复选框单个禁用
  checkBoxDisable(row: DrawingSettingTableEntry) {
    if (row.tzmc === "桥面板钢筋构造图") {
      return false;
    } else {
      return true;
    }
  }

  serialize() {
    this.tableData.forEach(value => (value.draw = false));
    this.$refs.table.selection.forEach((value: DrawingSettingTableEntry) => {
      if (value.rowSpan) {
        const index = this.tableData.indexOf(value);
        for (let i = 0; i < value.rowSpan; ++i) {
          this.tableData[index + i].draw = true;
        }
      }
    });
    console.log("序列化 绘图设置 开始");
    const htbl: HTBL[] = [];
    this.tableData.forEach(value => {
      const tmp: HTBL = new HTBL();
      tmp.aaaid = value.keyInJSON;
      tmp.mean = value.tzmc;
      tmp.scale = String(value.bl);
      tmp.note = value.tk;
      tmp.draw = String(value.draw);
      htbl.push(tmp);
    });

    this.jsonDataService.htszJSON.HTBL = htbl;
    console.log("序列化 绘图设置 完成");
  }

  deserialize() {
    console.log("反序列化 绘图设置 开始");
    this.$refs.table.clearSelection();
    let index = 0;
    this.jsonDataService.htszJSON.HTBL.forEach(value => {
      const row = this.tableData[index];
      // row.keyInJSON = value.aaaid;
      // row.tzmc = value.mean;
      // row.tk = value.note;
      row.bl = Number(value.scale);
      row.draw = value.draw === "true";
      if (row.rowSpan) {
        this.$refs.table.toggleRowSelection(row, true);
      }
      ++index;
    });
    console.log("反序列化 绘图设置 完成");
  }
}
</script>

<style lang="scss" scoped>
div.HuiTuSheZhi {
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
<style lang="scss">
.el-table td.top {
  vertical-align: top;
}
</style>

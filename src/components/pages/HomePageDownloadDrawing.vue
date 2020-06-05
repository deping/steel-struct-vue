<template>
  <splitter
    split="vertical"
    :min-percent="10"
    :max-percent="25"
    :default-percent="20"
  >
    <template v-slot:paneL>
      <div id="tree-title">
        <div>
          工程-构件-树
        </div>
      </div>
      <el-tree
        ref="tree"
        node-key="id"
        :props="treePropMap"
        :load="loadNode"
        lazy
        @node-click="loadComponentDrawings"
        highlight-current
      >
      </el-tree>
    </template>
    <template v-slot:paneR>
      <el-table
        id="table"
        ref="drawingTable"
        :data="drawings"
        stripe
        style="width: 100%"
        height="calc(100% - 58px)"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="文件" min-width="180px">
        </el-table-column>
        <el-table-column prop="createTime" label="购买日期"> </el-table-column>
      </el-table>
      <div id="download">
        <el-button @click="download" type="primary">下载</el-button>
      </div>
    </template>
  </splitter>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import { ElTable2 } from "@/typings/element-ui";
import VueSplitter from "vue-splitpane";
import * as FileSaver from "file-saver";
import { TreeNode } from "element-ui/types/tree";

interface ProjCompNode {
  id: number;
  name: string;
  type: "proj" | "comp";
  children?: ProjCompNode[];
  isLeaf: boolean;
}

interface DownloadDrawing {
  name: string;
  url: string;
  fileType: string;
  createTime: string;
}

@Component({
  components: {
    splitter: VueSplitter
  }
})
export default class HomePageDownloadDrawing extends Vue {
  name = "download-drawing";

  drawings: DownloadDrawing[] = [];

  treePropMap = {
    label: "name"
  };

  $refs!: {
    drawingTable: ElTable2;
  };

  treeNodes: ProjCompNode[] = [];

  async loadNode(
    node: TreeNode<number, ProjCompNode>,
    resolve: (nodes: ProjCompNode[]) => void
  ) {
    if (node.level === 0) {
      const projects = await this.loadPaidProjects();
      this.treeNodes = projects;
      resolve(projects);
    } else if (node.level === 1) {
      const components = await this.loadComponents(node.data);
      node.data.children = components;
      resolve(components);
    } else {
      resolve([]);
    }
  }

  async download() {
    for (const drawing of this.$refs.drawingTable.selection) {
      const res = await fetch(drawing.url, {
        method: "GET" /*, credentials: 'include' */
      });
      const blob = await res.blob();
      FileSaver.saveAs(blob, drawing.name + "." + drawing.fileType);
    }
  }

  async loadPaidProjects(): Promise<ProjCompNode[]> {
    try {
      const res = await axios.post(
        getAjaxUrl("/calc/paid/queryPaidProjectList")
      );
      if (res.data.code === "00100") {
        const projects: ProjCompNode[] = [];
        for (const proj of res.data.data) {
          projects.push({
            id: proj.id,
            name: proj.projectName,
            type: "proj",
            isLeaf: false
          });
        }
        return projects;
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "查询购买的工程时发生错误"
      });
      console.error(err);
    }
    return [];
  }

  async loadComponents(node: ProjCompNode): Promise<ProjCompNode[]> {
    try {
      const res = await axios.get(
        getAjaxUrl("/calc/paid/queryPaidComponentList"),
        { params: { projectId: node.id } }
      );
      if (res.data.code === "00100") {
        const components: ProjCompNode[] = [];
        for (const construct of res.data.data) {
          components.push({
            id: construct.id,
            name: construct.componentName,
            type: "comp",
            isLeaf: true
          });
        }

        return components;
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "查询购买的工程构件时发生错误"
      });
      console.error(err);
    }
    return [];
  }

  async loadComponentDrawings(
    node: ProjCompNode
  ): Promise<DownloadDrawing[] | undefined> {
    if (node.type === "proj") return;
    try {
      const res = await axios.get(
        getAjaxUrl("/calc/paid/queryPaidDrawingList"),
        // 陈乃强说componentId是跨工程唯一的，不需要projectId
        { params: { componentId: node.id } }
      );
      if (res.data.code === "00100") {
        const drawings: DownloadDrawing[] = [];
        for (const drawing of res.data.data) {
          drawings.push({
            name: drawing.fileName,
            url: drawing.fileUrl,
            fileType: drawing.fileType,
            createTime: drawing.createTime
          });
        }
        this.drawings = drawings;
        return drawings;
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "查询购买的构件图纸时发生错误"
      });
      console.error(err);
    }
    return [];
  }

  headerCellStyle(indicator: any) {
    if (indicator.rowIndex === 0) {
      return "background-color: rgb(84, 92, 100);color: white;font-weight: 700;";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}

#tree-title {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgb(84, 92, 100);
  color: white;
  font-weight: 700;
  font-size: 14px;
  font-family: "microsoft yahei";
  height: 48px;
}

#download {
  margin-top: 9px;
}
</style>

<style lang="scss">
</style>

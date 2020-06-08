<template>
  <el-table
    :data="projects"
    height="100%"
    stripe
    style="width: 100%"
    :header-cell-style="headerCellStyle"
  >
    <el-table-column prop="projectName" label="名称" min-width="180px">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="openProject(scope.row)"
          >打开</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteProject(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  /* State, Getter, Action, */ Mutation /* namespace */
} from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";

interface ProjectInfo {
  id: number;
  userId: string;
  projectName: string;
  description: string | undefined;
  createTime: string;
  updateTime: string;
}

@Component
export default class HomePageRecentProject extends Vue {
  name = "home-page";

  projects: ProjectInfo[] = [];

  @Mutation setProjectId!: (projectId: number) => void;

  headerCellStyle(indicator: any) {
    if (indicator.rowIndex === 0) {
      return "background-color: rgb(84, 92, 100);color: white;font-weight: 700;";
    }
  }

  async created() {
    try {
      const res = await axios.get(getAjaxUrl("/calc/queryProjectInfo"));
      if (res.data.success) {
        this.projects = res.data.data;
      } else {
        this.$message(res.data.msg);
      }
    } catch (err) {
      this.$message({
        type: "error",
        message: "查询工程时发生错误"
      });
      console.error(err);
    }
  }

  async openProject(project: ProjectInfo) {
    this.setProjectId(project.id);
  }

  async deleteProject(index: number, project: ProjectInfo) {
    const needConfirm =
      localStorage.getItem("settings.confirmDelProj") !== "false";
    let ans = true;
    if (needConfirm) {
      try {
        // eslint-disable-next-line quotes
        await this.$confirm(`确定删除工程 ${project.projectName}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } catch (err) {
        ans = false;
      }
    }
    if (ans) {
      try {
        const formData: FormData = new FormData();
        formData.append("projectId", project.id.toString());

        // backend doesn't support json and "application/x-www-form-urlencoded"
        const res = await axios.post(getAjaxUrl("/calc/delProject"), formData);
        if (res.data.code === "00100") {
          this.projects.splice(index, 1);
        }
        this.$message({
          type: "info",
          message: res.data.msg
        });
      } catch (err) {
        this.$message({
          type: "error",
          message: "删除工程时发生错误"
        });
        console.error(err);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
</style>

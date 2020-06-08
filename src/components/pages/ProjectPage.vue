<template>
  <div class="content">
    <splitter
      split="vertical"
      :min-percent="10"
      :max-percent="25"
      :default-percent="20"
    >
      <template v-slot:paneL>
        <div class="flex-container">
          <el-button
            type="primary"
            class="close-button"
            @click="closeProject"
            style="flex-grow: 0;"
          >
            关闭工程
          </el-button>
          <el-table
            :data="constructs"
            style="width: 100%"
            ref="table"
            row-class-name="construct-row"
          >
            <el-table-column label="构件">
              <template v-slot="scope">
                <span style="margin-left: 4px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="110px">
              <template v-slot="scope">
                <el-button
                  class="table-button"
                  size="mini"
                  type="primary"
                  @click="openConstruct(scope.$index, scope.row)"
                  >打开</el-button
                >
                <el-button
                  class="table-button"
                  size="mini"
                  type="danger"
                  @click="deleteConstruct(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="flex-grow: 0;">
            <fieldset class="scheduler-border" id="create-construct">
              <legend class="scheduler-border">创建构件</legend>
              <div class="flex-container">
                <el-select
                  v-model="construct.type"
                  placeholder="请选择"
                  class="flex-item"
                >
                  <el-option
                    v-for="(meta, index) of constructMetas"
                    :label="meta.label"
                    :value="index"
                    :key="index"
                  >
                  </el-option>
                </el-select>

                <el-input
                  v-model="construct.name"
                  placeholder="构件名称"
                  class="flex-item"
                />

                <el-input
                  v-model="construct.desc"
                  placeholder="构件描述"
                  class="flex-item"
                />

                <el-button
                  class="flex-item"
                  type="primary"
                  @click="createConstruct(false)"
                >
                  创建空白构件
                </el-button>
                <el-button
                  class="flex-item"
                  type="primary"
                  @click="createConstruct(true)"
                >
                  创建示例构件
                </el-button>
              </div>
            </fieldset>
          </div>
        </div>
      </template>
      <template v-slot:paneR>
        <component
          v-if="constructName"
          :is="constructName"
          ref="currentComponent"
        />
        <div v-else>请打开某个构件进行编辑。</div>
      </template>
    </splitter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Persist } from "@/components/ConstructBase";
import {
  State,
  /* Getter, Action, */ Mutation /*, namespace */
} from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";
import VueSplitter from "vue-splitpane";
import { Table } from "element-ui";
import CaoxingZuheliang from "@/components/CaoXingZuHeLiang/main";

interface ConstructNode {
  id: number;
  name: string;
  desc?: string;
  type: string;
  needFill?: boolean;
}

interface ConstructVue extends Vue {
  save: () => Promise<undefined>;
  load: () => Promise<undefined>;
}

@Component({
  components: {
    splitter: VueSplitter,
    "cao-xing-zu-he-liang": CaoxingZuheliang
  }
})
export default class ProjectPage extends Vue {
  name = "project-page";

  construct = {
    type: 1,
    name: "",
    desc: ""
  };

  constructMetas = [
    { label: "", value: "" },
    { label: "槽型组合梁", value: "cao-xing-zu-he-liang" },
    { label: "钢板梁", value: "gang-ban-liang" },
    { label: "窄箱梁", value: "zhai-xiang-liang" },
    { label: "钢箱梁", value: "gang-xiang-liang" }
  ];

  constructName = "";
  currentConstruct: ConstructNode | undefined = undefined;
  constructs: ConstructNode[] = [];

  @State user!: any;
  @State project_id!: string;
  @Mutation setProjectId!: (payload: any) => void;

  $refs!: {
    table: Table;
    currentComponent: Vue & Persist;
  };

  convertType(type: number): string {
    if (type < this.constructMetas.length) {
      return this.constructMetas[type].value;
    }
    return "";
  }

  mounted() {
    this.openProject();
  }

  async openProject() {
    try {
      const res = await axios.get(getAjaxUrl("/calc/queryComponentList"), {
        params: { projectId: this.project_id }
      });
      if (res.data.code === "00100") {
        this.constructs = [];
        for (const construct of res.data.data) {
          this.constructs.push({
            id: construct.id,
            name: construct.componentName,
            desc: construct.remark,
            type: this.convertType(construct.type)
          });
        }
        if (this.constructs.length > 0) {
          this.openConstruct(0, this.constructs[0]);
        }
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "查询工程时发生错误"
      });
      console.error(err);
    }
  }

  async closeProject() {
    if (this.$refs.currentComponent) {
      await this.$refs.currentComponent.save();
    }
    // this will close project page, and open home page.
    this.setProjectId("");
  }

  async createConstruct(needFill: boolean) {
    this.construct.name = this.construct.name.trim();
    if (this.construct.name === "") {
      this.$alert("构件名称不可以为空");
      return;
    }
    if (
      this.constructs.findIndex(el => {
        return el.name === this.construct.name;
      }) !== -1
    ) {
      this.$alert(`构件名${name}已经存在`);
      return;
    }
    switch (this.construct.type) {
      case 1:
        await this.createCaoxingZuheliang(needFill);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        alert("未知的构件类型");
        break;
    }
  }

  async createCaoxingZuheliang(needFill: boolean) {
    try {
      const formData: FormData = new FormData();
      formData.append("projectId", this.project_id);
      formData.append("componentName", this.construct.name);
      formData.append("type", String(this.construct.type));
      formData.append("remark", this.construct.desc);

      // backend doesn't support json and "application/x-www-form-urlencoded"
      const res = await axios.post(
        getAjaxUrl("/calc/createComponent"),
        formData
      );
      if (res.data.code === "00100") {
        const constructId: number = res.data.data;
        this.constructs.push({
          id: constructId,
          name: this.construct.name,
          desc: this.construct.desc,
          type: this.convertType(this.construct.type),
          needFill
        });
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "创建构件时发生错误"
      });
      console.error(err);
    }
  }

  setCurrentRow(index: number) {
    // Table.setCurrentRow(node) doesn't work
    if (!this.$refs.table.$el) return;
    const trs = this.$refs.table.$el.querySelectorAll("tr.construct-row");
    for (let i = 0; i < trs.length; ++i) {
      const tr = trs[i];
      if (i === index) {
        tr.classList.add("current-row");
      } else {
        tr.classList.remove("current-row");
      }
    }
  }

  async openConstruct(index: number, node: ConstructNode) {
    if (this.$refs.currentComponent) {
      await this.$refs.currentComponent.save();
    }
    this.currentConstruct = node;
    this.constructName = node.type;
    setTimeout(() => {
      this.setCurrentRow(index);
    }, 0);
    await this.$nextTick();
    // DOM 更新了
    if (this.$refs.currentComponent) {
      await this.$refs.currentComponent.load();
    }
  }

  async deleteConstruct(index: number, construct: ConstructNode) {
    if (construct) {
      const needConfirm =
        localStorage.getItem("settings.confirmDelCons") !== "false";
      let delIt = true;
      if (needConfirm) {
        try {
          // eslint-disable-next-line quotes
          await this.$confirm(`确定删除构件 ${construct.name}?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          });
        } catch (err) {
          delIt = false;
        }
      }

      if (delIt) {
        try {
          const formData: FormData = new FormData();
          formData.append("componentId", construct.id.toString());

          // backend doesn't support json and "application/x-www-form-urlencoded"
          const res = await axios.post(
            getAjaxUrl("/calc/delComponent"),
            formData
          );
          if (res.data.code === "00100") {
            this.constructs.splice(index, 1);
            if (construct === this.currentConstruct) {
              this.currentConstruct = undefined;
              this.constructName = "";
            }
          }
          this.$message({
            type: "info",
            message: res.data.msg
          });
        } catch (err) {
          this.$message({
            type: "error",
            message: "删除构件时发生错误"
          });
          console.error(err);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.content {
  width: 100vw;
  height: 100vh;
}

.flex-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.flex-item {
  display: block;
  margin: 5px 0px 0px 0px;
}

.table-button {
  padding: 7px;
}

.el-button.flex-item {
  width: 100%;
  margin-left: 0px;
}
</style>

<style lang="scss">
</style>

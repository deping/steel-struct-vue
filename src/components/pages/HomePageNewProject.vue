<template>
  <div id="container">
    <el-form
      id="box"
      :model="project"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="0px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="project.name"
          placeholder="工程名称"
          @keyup.enter.native="createProject"
        ></el-input>
      </el-form-item>
      <el-form-item prop="desc">
        <el-input
          v-model="project.desc"
          placeholder="工程描述"
          @keyup.enter.native="createProject"
        ></el-input>
      </el-form-item>
      <el-form-item prop="create">
        <el-button type="primary" @click="createProject()">创建工程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  /* State, Getter, Action, */ Mutation /* namespace */
} from "vuex-class";
import { Form } from "element-ui";
import { getAjaxUrl } from "@/utils/path";
import axios from "axios";

@Component
export default class HomePageNewProject extends Vue {
  name = "new-project";

  project = {
    name: "",
    desc: ""
  };

  rules = {
    name: [{ required: true, message: "请输入工程名", trigger: "blur" }]
  };

  $refs!: {
    form: Form;
  };

  @Mutation setProjectId!: (projectId: number) => void;

  async createProject() {
    const valid = await this.$refs.form.validate();
    if (!valid) {
      return;
    }

    try {
      const formData: FormData = new FormData();
      formData.append("projectName", this.project.name);
      formData.append("description", this.project.desc);

      // backend doesn't support json and "application/x-www-form-urlencoded"
      const res = await axios.post(getAjaxUrl("/calc/createProject"), formData);
      if (res.data.code === "00100") {
        // this will open project page
        this.setProjectId(res.data.data);
      }
      this.$message({
        type: "info",
        message: res.data.msg
      });
    } catch (err) {
      this.$message({
        type: "error",
        message: "新建工程时发生错误"
      });
      console.error(err);
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
</style>

<style lang="scss">
</style>

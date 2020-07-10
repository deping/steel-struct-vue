<template>
  <el-dialog :visible="visible" width="400px" @update:visible="updateVisible($event)">
    <el-form ref="form" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetPassword" type="primary">重置密码</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form } from "element-ui";
import axios from "axios";
import { getAjaxUrl } from "@/utils/path";

interface ValidateFieldCallback {
  /**
   * The callback to tell the field validation result
   *
   * @param errorMessage The error message. It will be empty if there is no error
   */
  (errorMessage?: Error): void;
}

@Component({
  components: {}
})
export default class ResetPasswordDlg extends Vue {
  @Prop({ default: false }) visible!: boolean;

  user = {
    email: ""
  };

  rules = {
    email: [{ type: "email", message: "邮箱格式不对", trigger: "blur" }]
  };

  $refs!: {
    form: Form;
  };

  async resetPassword() {
    const valid = await this.$refs.form.validate();
    if (!valid) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append("email", this.user.email);
    try {
      const res = await axios.get(getAjaxUrl("/noticeResetPwd"));
      if (res.data.code === "00100") {
        this.$emit("update:visible", false);
      } else {
        this.$alert(res.data.msg);
      }
    } catch (err) {
      this.$message({
        type: "error",
        message: err.message
      });
    }
  }

  close() {
    this.$emit("update:visible", false);
  }

  updateVisible(visible: boolean) {
    this.$emit("update:visible", visible);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
</style>

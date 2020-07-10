<template>
  <el-dialog :visible="visible" width="400px">
    <el-form ref="form" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="user.code">
          <el-button slot="append" @click="getCode" :disabled="countDown > 0">{{buttonValue}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="user.password2" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="registerUser" type="primary">注册</el-button>
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
export default class RegisterUserDlg extends Vue {
  @Prop({ default: false }) visible!: boolean;

  user = {
    phone: "",
    code: "",
    password: "",
    password2: "",
    email: ""
  };

  rules = {
    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      { validator: this.validatePhone, trigger: "blur" }
    ],
    email: [{ type: "email", message: "邮箱格式不对", trigger: "blur" }],
    code: [
      { required: true, message: "请输入验证码", trigger: "blur" },
      { validator: this.validateCode, trigger: "blur" }
    ],
    password: [{ validator: this.validatePass, trigger: "blur" }],
    password2: [{ validator: this.validatePass2, trigger: "blur" }]
  };

  timerId?: number; // inreactive is OK
  countDown = 0;
  buttonValue = "获取验证码";

  $refs!: {
    form: Form;
  };

  validatePhone(rule: any, value: string, callback: ValidateFieldCallback) {
    const reg = /[0-9]{11}/;
    if (!reg.test(value)) {
      callback(new Error("手机号码必须是11位数字"));
    } else {
      callback();
    }
  }

  validateCode(rule: any, value: string, callback: ValidateFieldCallback) {
    const reg = /[0-9a-zA-Z]{4}/;
    if (!reg.test(value)) {
      callback(new Error("验证码必须是由4位数字和字母组合"));
    } else {
      callback();
    }
  }

  validatePass(rule: any, value: string, callback: ValidateFieldCallback) {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (this.user.password2 !== "") {
        this.$refs.form.validateField("password2");
      }
      callback();
    }
  }

  validatePass2(rule: any, value: string, callback: ValidateFieldCallback) {
    if (value === "") {
      callback(new Error("请输入确认密码"));
    } else if (value !== this.user.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }

  destroyed() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  getCode() {
    this.$refs.form.validateField("phone", async err => {
      if (err) {
        return;
      }
      const formData: FormData = new FormData();
      formData.append("phone", this.user.phone);
      try {
        const res = await axios.post(
          getAjaxUrl("/sms/getVerifyCode"),
          formData
        );
        if (res.data.code === "00100") {
          this.countDown = 5 * 60; // 秒
          const setButtonValue = () => {
            this.buttonValue = "等待" + this.countDown + "秒获取验证码";
          };
          setButtonValue();
          this.timerId = window.setInterval(() => {
            --this.countDown;
            if (this.countDown === 0) {
              this.buttonValue = "获取验证码";
              clearInterval(this.timerId);
              this.timerId = undefined;
            } else {
              setButtonValue();
            }
          }, 1000);
        } else {
          this.$message(res.data.msg);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
      }
    });
  }

  async registerUser() {
    const valid = await this.$refs.form.validate();
    if (!valid) {
      return;
    }

    clearInterval(this.timerId);
    this.timerId = undefined;
    this.countDown = 0;
    const formData: FormData = new FormData();
    formData.append("phone", this.user.phone);
    formData.append("code", this.user.code);
    formData.append("password", this.user.password);
    formData.append("email", this.user.email);
    try {
      const res = await axios.post(getAjaxUrl("/register"), formData);
      if (res.data.code === "00100") {
        this.$alert("注册成功！");
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
</style>

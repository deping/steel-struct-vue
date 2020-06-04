<template>
  <div>
    <div id="container">
      <!-- header -->
      <div id="header">
        <div>
          <img src="@/assets/images/logo.png" alt="同豪LOGO" />
        </div>
        <h4>欢 迎 使 用 同 豪 钢 结 构 BIM（V1.0）系 统</h4>
      </div>

      <div id="columns">
        <!-- Sidebar -->
        <div id="sidebar">
          <ul class="nav0">
            <li>
              钢结构BIM设计
            </li>
            <li>
              设计(建模)简单、快速
            </li>
            <li>
              出图高效
            </li>
            <li>
              图纸完整、美观
            </li>
            <li>
              可以查看3D模型
            </li>
            <li>
              建议使用 Google Chrome 浏览器
            </li>
          </ul>
        </div>

        <!-- Main Content area -->
        <div id="content">
          <el-form
            id="box"
            :model="user"
            :rules="rules"
            ref="loginForm"
            label-position="left"
            label-width="0px"
          >
            <el-form-item prop="name">
              <el-input
                v-model="user.name"
                placeholder="手机号"
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="user.password"
                placeholder="密码"
                show-password
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input
                v-model="user.captcha"
                placeholder="验证码"
                @keyup.enter.native="login"
              >
                <img
                  ref="captchaImg"
                  src=""
                  @click="changeCaptcha()"
                  title="更换验证码"
                  slot="append"
                />
              </el-input>
            </el-form-item>
            <el-form-item prop="login">
              <el-button type="primary" @click="login()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div id="footer">
        <div>
          © 2019 上海同豪土木工程咨询有限公司
        </div>
      </div>
    </div>
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
export default class LoginPage extends Vue {
  name = "login-page";

  user = {
    name: "",
    password: "",
    captcha: ""
  };

  rules = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    captcha: [
      { required: true, message: "请输入验证码", trigger: "blur" },
      { length: 5, message: "长度在4个字符", trigger: "blur" }
    ]
  };

  $refs!: {
    loginForm: Form;
    captchaImg: HTMLImageElement;
  };

  @Mutation setUser!: (payload: any) => void;

  mounted() {
    // delay because this.$refs.captchaImg is null at this timepoint.
    setTimeout(this.changeCaptcha.bind(this), 0);
  }

  async login() {
    const valid = await this.$refs.loginForm.validate();
    if (!valid) {
      return;
    }

    try {
      const formData: FormData = new FormData();
      formData.append("phone", this.user.name);
      formData.append("password", this.user.password);
      formData.append("verifyCode", this.user.captcha);
      // backend doesn't support json and "application/x-www-form-urlencoded"
      const res = await axios.post(
        getAjaxUrl("/login"),
        // {
        //   phone: this.user.name,
        //   password: this.user.password,
        //   verifyCode: this.user.captcha
        // },
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data" // "application/x-www-form-urlencoded"
          }
        }
      );
      if (res.data.code === "00100") {
        this.setUser({
          access_token: res.data.data
        });
      } else {
        this.$message(res.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static captchaCounter = 0;
  changeCaptcha() {
    ++LoginPage.captchaCounter;
    this.$refs.captchaImg.src = getAjaxUrl(
      "/getVerifyCode?v=" + LoginPage.captchaCounter
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100wh;

  margin: 0;
  padding: 0;
  background: url("~@/assets/images/timg.jpg");
  color: rgba(255, 255, 255, 0.95);
}

#header {
  text-align: center;
  h4 {
    font-size: 29.5px;
    margin: 0px 0px 8px 0px;
    font-family: Segoe, "Segoe UI", "DejaVu Sans", "Trebuchet MS", Verdana,
      "sans-serif";
  }
}

#columns {
  width: 100%;
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  flex-grow: 1;
  border-top: 3px solid rgb(163, 154, 151);
}

#columns > #content {
  padding: 3%;
}

#columns > #sidebar {
  padding: 3%;
  font-size: 15.6px;
  font-family: monospace;
}

#footer {
  width: 100%;
  flex-grow: 1;
  text-align: center;
  border-top: 3px solid rgb(163, 154, 151);
  margin: 0;
  padding: 0;
  font-size: 14px;
}

ul.nav0 > li {
  white-space: nowrap;
  color: white;
  margin: 0px 0px 18px 0px;
}

#box {
  // width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-input {
  width: 220px;
  margin: 5px;
}
</style>

<style lang="scss">
div.el-input-group__append {
  padding: 0px;
}
input.el-input__inner {
  padding: 0px 10px;
}
label.el-form-item__label {
  padding: 0px 10px;
}
</style>

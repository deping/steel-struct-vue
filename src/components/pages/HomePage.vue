<template>
  <el-container id="content">
    <el-aside id="aside" style="width: 150px">
      <el-menu
        id="menu"
        default-active="order"
        class="menu"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="new-project">
          <i class="el-icon-menu"></i>
          <span>新建项目</span>
        </el-menu-item>
        <el-menu-item index="recent-project">
          <i class="el-icon-setting"></i>
          <span>最近项目</span>
        </el-menu-item>
        <el-menu-item index="download-drawing">
          <i class="el-icon-menu"></i>
          <span>下载图纸</span>
        </el-menu-item>
        <el-menu-item index="local-setting">
          <i class="el-icon-menu"></i>
          <span>本地设置</span>
        </el-menu-item>
        <el-menu-item index="help">
          <i class="el-icon-menu"></i>
          <span>帮助文档</span>
        </el-menu-item>
        <el-menu-item index="useless">
          <i class="el-icon-menu"></i>
          <button @click="logout">退出登录</button>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main id="subpage">
      <keep-alive>
        <component :is="subpage" />
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  /* State, Getter, Action, */ Mutation /* namespace */
} from "vuex-class";
// import { getAjaxUrl } from "@/utils/path";
// import axios from "axios";
import HomePageNewProject from "@/components/pages/HomePageNewProject.vue";
import HomePageRecentProject from "@/components/pages/HomePageRecentProject.vue";
import HomePageLocalSettings from "@/components/pages/HomePageLocalSettings.vue";
@Component({
  components: {
    "new-project": HomePageNewProject,
    "recent-project": HomePageRecentProject,
    "local-setting": HomePageLocalSettings
  }
})
export default class HomePage extends Vue {
  name = "home-page";

  subpage = "new-project";

  @Mutation setUser!: (payload: any) => void;

  handleSelect(key: string /*, keyPath */) {
    if (key === "useless") return;
    this.subpage = key;
  }

  async logout() {
    this.setUser({
      access_token: ""
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#content {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

#menu {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  border: 0px;
}

button {
  color: #f00;
  background-color: rgba(0, 0, 0, 0);
  border: 0px none;
  cursor: pointer;
}

#subpage {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0px;
  margin: 0px;
}
</style>

<style lang="scss">
</style>

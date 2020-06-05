<template>
  <div id="help-container" ref="container"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getFilePath } from "@/utils/path";
import axios from "axios";
import marked from "marked";

@Component
export default class HomePageNewProject extends Vue {
  name = "new-project";

  $refs!: {
    container: HTMLDivElement;
  };

  async mounted() {
    try {
      const res = await axios.get("help/help.md", {
        responseType: "text"
      });

      const div = document.createElement("div");
      div.innerHTML = marked(res.data);
      const imgs = div.querySelectorAll("img");
      const currentPath = getFilePath(location.href);
      imgs.forEach(element => {
        const img = element as HTMLImageElement;
        const tmp = img.src.replace(currentPath, "");
        img.src = "help" + tmp;
      });
      // 减少一批失败的请求
      this.$refs.container.appendChild(div);
    } catch (err) {
      this.$message({
        type: "error",
        message: "获取帮助文件失败"
      });
      console.error(err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#help-container {
  text-align: left;
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}
</style>

<style lang="scss">
</style>

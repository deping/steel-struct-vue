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
      <el-form-item>
        <el-button type="primary" @click="createProject">创建工程</el-button>
      </el-form-item>
    </el-form>
    <!-- <div style="width=350px;height=200px"> -->
    <fabric-canvas :showCoord="true" ref="canvas" />
    <!-- </div> -->
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
import FabricCanvas from "@/components/FabricCanvas.vue";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace rightHand {
  interface Point {
    x: number;
    y: number;
  }
  function loadObjects(ar: any[]): any[]; // fabric.Object[]
  function makeLine(points: number[], options: object): any; // fabric.Line2
  function makePolyline(points: Point[], options: object): any; // fabric.Polyline2
  function makePolygon(points: Point[], options: object): any; // fabric.Polygon2
  function makeText(text: string, options: object): any; // fabric.Text2
  function makeDimAln(options: object): any; // fabric.DimAln2
  function makeDimAng(options: object): any; // fabric.DimAng2
  function makeRect(options: object): any; // fabric.Rect2
  function makeCircle(options: object): any; // fabric.Circle2
}

@Component({
  components: {
    "fabric-canvas": FabricCanvas
  }
})
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
    canvas: FabricCanvas;
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

  mounted() {
    // create a rectangle object
    const rect = rightHand.makeRect({
      left: 10,
      top: 50,
      fill: "#D81B60",
      width: 40,
      height: 40,
      strokeWidth: 2,
      stroke: "#880E4F",
      rx: 5,
      ry: 5,
      // angle: 45,
      // scaleX: 3,
      // scaleY: 3,
      strokeUniform: true
    });
    this.$refs.canvas.add(rect);

    const line = rightHand.makeLine([10, 50, 50, 10], {
      stroke: "red",
      strokeUniform: true
      // angle: 45,
      // scaleX: 3,
      // scaleY: 3,
    });
    this.$refs.canvas.add(line);

    const circle = rightHand.makeCircle({
      radius: 20,
      fill: "green",
      left: 10,
      top: 50,
      stroke: "blue",
      strokeWidth: 2,
      strokeUniform: true
      // angle: 45,
      // scaleX: 3,
      // scaleY: 3,
    });
    this.$refs.canvas.add(circle);

    const text = rightHand.makeText(
      "白日依山尽，\n黄河入海流，\n欲穷千里目，\n更上一层楼。",
      {
        left: 60,
        top: 50,
        fill: "#039BE5",
        fontSize: 12
        // angle: 45,
      }
    );
    this.$refs.canvas.add(text);

    setTimeout(() => {
      this.$refs.canvas.zoomToFit();
    }, 500);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.el-input {
  width: 400px;
  margin: 5px;
}
</style>

<style lang="scss">
</style>

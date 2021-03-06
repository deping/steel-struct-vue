<template>
  <div id="box">
    <div id="left">
      <div>
        <span style="margin-right: 8px">选中颜色</span>
        <el-color-picker v-model="hightlightColor" size="mini" color-format="hex"></el-color-picker>
      </div>
      <div style="width:100%;height:100%;overflow:auto">
        <el-tree ref="tree" :data="object3D" :props="propMap" :render-content="renderContent" height="100%"
                 :expand-on-click-node="false" :highlight-current="false" node-key="id" default-expand-all>
        </el-tree>
      </div>
    </div>
    <three-js ref="three" :hightlightMaterial="hightlightMaterial" @current-key="onCurrentKeyChange"
              @modelChange="onModelChange" :file="'model/sample.fbx'"></three-js>
  </div>
</template>

<script lang="tsx">
import * as THREE from "three";
import { Component, Vue, Watch } from "vue-property-decorator";
import { ElTree, TreeNode, TreeStore } from "element-ui/types/tree";
import { Object3D, Mesh, Material } from "three";
import { CreateElement, VNode } from "vue";
import ThreeJs, { ThreeModelFile } from "@/components/ThreeJs.vue";
import onLight from "../imgs/light-on.png";
import offLight from "../imgs/light-off.png";

interface MeshMaterial {
  material: Material | Material[];
  mesh: Mesh;
}

@Component({
  components: {
    "three-js": ThreeJs,
  },
})
export default class ModelViewer extends Vue {
  name = "model-viewer";

  object3D: Object3D[] = [];
  propMap = { label: "id" };
  hightlightColor = "#409EFF";
  hightlightMaterial = new THREE.MeshLambertMaterial({ color: "#409EFF" });

  $refs!: {
    tree: ElTree<any, Object3D>;
    three: ThreeJs;
  };

  @Watch("hightlightColor")
  onColorChanged() {
    this.hightlightMaterial.color.setStyle(this.hightlightColor);
    // redraw 3D scene.
    this.$refs.three.render2();
  }

  renderContent(
    h: CreateElement,
    ctx: {
      node: TreeNode<any, Object3D>;
      data: Object3D;
      store: TreeStore<any, Object3D>;
    }
  ): VNode {
    return (
      <span>
        <span
          class="text"
          onclick={() => {
            this.highlightObject3D(ctx.data);
          }}
        >
          {ctx.data.id}
        </span>
        <img
          src={ctx.data.visible ? onLight : offLight}
          onclick={(e: MouseEvent) => {
            ctx.data.visible = !ctx.data.visible;
            // :highlight-current="false" doesn't work. So I hack it.
            e.stopPropagation();
            // redraw 3D scene.
            this.$refs.three.render2();
          }}
        ></img>
      </span>
    );
  }

  onCurrentKeyChange(id: number) {
    this.$refs.tree.setCurrentKey(id);
  }

  highlightObject3D(data: Object3D) {
    this.$refs.three.highlightObject3D(data);
  }

  onModelChange(obj: Object3D) {
    this.object3D = [obj];
  }

  setModelFile(model: ThreeModelFile) {
    this.$refs.three.setModelFile(model);
  }
}
</script>

<style lang="scss" scoped>
#box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  #left {
    width: 200px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
<style lang="scss">
// :highlight-current="false" doesn't work. so hack it.
#left .el-tree-node.is-current > .el-tree-node__content {
  background-color: white;
}
#left .el-tree-node.is-current > .el-tree-node__content span.text {
  background-color: red;
}
</style>

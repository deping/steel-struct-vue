<template>
  <div id="box">
    <div style="width:200px;height:100%;overflow:auto">
      <el-tree
        ref="tree"
        :data="meshTree"
        :render-content="renderContent"
        height="100%"
      >
      </el-tree>
    </div>
    <three-js
      ref="three"
      @modelChange="onModelChange"
      :file="'model/sample.fbx'"
    ></three-js>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import { ElTree, TreeNode, TreeStore } from "element-ui/types/tree";
import { Object3D, Mesh, Material } from "three";
import { CreateElement, VNode } from "vue";
import ThreeJs, { ThreeModelFile } from "@/components/ThreeJs.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const onLight = require("../imgs/light-on.png");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const offLight = require("../imgs/light-off.png");

interface MeshData {
  label: string;
  children?: MeshData[];
  mesh: Mesh;
}

interface Opacity {
  opacity: number;
  transparent: boolean;
}

@Component({
  components: {
    "three-js": ThreeJs
  }
})
export default class ModelViewer extends Vue {
  name = "model-viewer";

  meshTree: MeshData[] = [];
  currentMesh?: Mesh;
  opacity: Opacity[] = [];

  $refs!: {
    tree: ElTree<any, MeshData>;
    three: ThreeJs;
  };

  renderContent(
    h: CreateElement,
    ctx: {
      node: TreeNode<any, MeshData>;
      data: MeshData;
      store: TreeStore<any, MeshData>;
    }
  ): VNode {
    return (
      <span>
        <span
          onclick={() => {
            this.highlightMesh(ctx.data);
          }}
        >
          {ctx.node.label}
        </span>
        <img
          src={ctx.data.mesh.visible ? onLight : offLight}
          onclick={() => {
            ctx.data.mesh.visible = !ctx.data.mesh.visible;
            this.$refs.three.render2();
          }}
        ></img>
      </span>
    );
  }

  highlightMesh(data: MeshData) {
    if (data.mesh === this.currentMesh) {
      return;
    }
    // restore opacity
    if (this.currentMesh) {
      let ms: Material[];
      const m = this.currentMesh.material;
      if (m instanceof Material) {
        ms = [m];
      } else {
        ms = m;
      }
      for (let i = 0; i < ms.length; ++i) {
        ms[i].transparent = this.opacity[i].transparent;
        ms[i].opacity = this.opacity[i].opacity;
      }
    }

    this.currentMesh = data.mesh;
    // set opacity
    let ms: Material[];
    const m = data.mesh.material;
    if (m instanceof Material) {
      ms = [m];
    } else {
      ms = m;
    }
    this.opacity = [];
    for (let i = 0; i < ms.length; ++i) {
      this.opacity.push({ transparent: false, opacity: 1 });
      this.opacity[i].transparent = ms[i].transparent;
      this.opacity[i].opacity = ms[i].opacity;
      ms[i].transparent = true;
      ms[i].opacity /= 2;
    }
    this.$refs.three.render2();
  }

  pushMesh(meshTree: MeshData[], obj: Object3D) {
    if (obj instanceof Mesh) {
      const label = obj.id.toString();
      const meshData: MeshData = {
        label,
        children: [],
        mesh: obj
      };
      meshTree.push(meshData);
      meshTree = meshData.children as MeshData[];
    }

    for (const child of obj.children) {
      this.pushMesh(meshTree, child);
    }
  }

  onModelChange(obj: Object3D) {
    this.meshTree = [];
    this.pushMesh(this.meshTree, obj);
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
}
</style>
<style lang="scss">
</style>

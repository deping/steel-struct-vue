<template>
  <div id="canvas-container">
    <canvas> </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ResizeSensor } = require("css-element-queries");

@Component({
  components: {}
})
export default class FabricCanvas extends Vue {
  name = "fabric-canvas";

  canvas: any;
  resizeSensor: any = undefined;

  @Prop({ default: false })
  showCoord!: boolean;

  @Prop({ default: true })
  rightHand!: boolean;

  add(obj: any) {
    this.canvas.add(obj);
  }

  loadObjects(objs: any[]) {
    for (const obj of objs) {
      this.canvas.add(obj);
    }
  }

  clear() {
    this.canvas.clear();
  }

  zoomToFit() {
    this.canvas.zoomToFit();
  }

  onDivResize(size: { width: number; height: number }) {
    this.canvas.setWidth(size.width - 2);
    this.canvas.setHeight(size.height - 2);
  }

  mounted() {
    const canvas = this.$el.querySelector("canvas");
    this.canvas = new fabric.Canvas2(canvas, {
      showCoord: this.showCoord,
      rightHand: this.rightHand
    });
    const div = this.$el as HTMLDivElement;
    this.resizeSensor = new ResizeSensor(div, this.onDivResize.bind(this));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#canvas-container {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  margin: 0px;
  padding: 0px;
  border: 1px solid black;
}
</style>

<style lang="scss">
#canvas-container.canvas-container {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  border: 0px;
}
</style>

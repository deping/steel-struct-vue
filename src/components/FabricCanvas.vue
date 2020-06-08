<template>
  <div id="canvas-container">
    <canvas> </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ResizeSensor } = require("css-element-queries");
declare let fabric: any;

@Component({
  components: {}
})
export default class FabricCanvas extends Vue {
  name = "fabric-canvas";

  canvas: any;
  resizeSensor: any = undefined;

  onDivResize(size: { width: number; height: number }) {
    console.log(size);
    this.canvas.setWidth(this.$el.clientWidth);
    this.canvas.setHeight(this.$el.clientHeight);
  }

  mounted() {
    const canvas = this.$el.querySelector("canvas");
    this.canvas = new fabric.Canvas2(canvas);
    setTimeout(() => {
      const div = this.$el as HTMLDivElement;
      console.log(div.id);
      this.resizeSensor = new ResizeSensor(div, this.onDivResize.bind(this));
    }, 0);
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

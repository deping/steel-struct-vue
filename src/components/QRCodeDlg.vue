<template>
  <el-dialog :visible="visible" width="400px" @update:visible="updateVisible($event)">
    <canvas ref="canvas"></canvas>
    <br />
    <h4>请使用支付宝扫码支付</h4>
    <br />
    <div id="button-container">
      <el-button type="primary" @click="afterPaid">已经支付</el-button>
      <el-button @click="close">取消</el-button>
    </div>
    <div id="explanation">
      <ul>
        <li>本页图纸不会重复购买。</li>
        <li>重新出图算新的图纸，即使参数没有修改。请注意不要重复购买。</li>
        <li>已经购买的图纸，关闭工程后可以在下载图纸页面看到。</li>
      </ul>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import QRCode from "qrcode";

@Component({
  components: {}
})
export default class QRCodeDlg extends Vue {
  name = "qr-code-dlg";

  @Prop({ default: false }) visible!: boolean;

  @Prop({ default: "" }) buyUrl!: string;

  @Prop({ default: 10 }) version!: number;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  draw() {
    console.log(this.buyUrl);
    if (!this.$refs.canvas) {
      setTimeout(() => {
        console.log(this.$refs.canvas);
        QRCode.toCanvas(
          this.$refs.canvas,
          this.buyUrl,
          { errorCorrectionLevel: "L", version: this.version },
          function(err: Error) {
            if (err) {
              console.error(err.message);
            }
          }
        );
      }, 0);
    }
  }

  @Watch("buyUrl")
  onChildChanged() {
    this.draw();
  }

  afterPaid() {
    this.$emit("paid", this.buyUrl);
    this.$emit("update:visible", false);
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
#button-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
}

#explanation {
  text-align: left;
}
</style>

<style lang="scss">
</style>

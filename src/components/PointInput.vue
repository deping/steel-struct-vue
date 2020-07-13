<template>
  <el-tooltip :disabled="error===''" :content="error" placement="bottom-start">
    <el-input v-bind="$attrs" :value="value" @input="input" :class="{error: error!==''}">
    </el-input>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { isPoint } from "@/utils/misc";

@Component({
  components: {}
})
export default class PointInput extends Vue {
  error = "";
  readonly tip = "无效的输入。格式: 数字,数字";

  @Prop()
  value!: string;

  validate(value: string) {
    if (isPoint(value)) {
      this.error = "";
    } else {
      this.error = this.tip;
    }
  }

  input(value: string) {
    this.validate(value);
    this.$emit("input", value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<style lang="scss">
.el-tooltip.el-input.error input {
  background: #ff8080;
}
</style>

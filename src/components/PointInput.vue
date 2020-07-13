<template>
  <el-tooltip :disabled="error===''" :content="error" placement="bottom-start">
    <el-input v-bind="$attrs" v-model="value" @blur="validate" @input="filter" :class="{error: error!==''}"></el-input>
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

  validate() {
    if (isPoint(this.value)) {
      this.error = "";
    } else {
      this.error = this.tip;
    }
  }

  filter(value: string) {
    this.value = value.replace(/[^0-9,.+Ee-]/g, "");
    this.$emit("input", this.value);
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

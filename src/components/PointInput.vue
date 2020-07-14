<template>
  <el-tooltip :disabled="error===''" :content="error" placement="bottom-start">
    <el-input v-bind="$attrs" :value="value" @input="input" :class="{error: error!==''}">
    </el-input>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { isPoint, isSize } from "@/utils/misc";
import * as _ from "lodash";

@Component({
  components: {}
})
export default class PointInput extends Vue {
  error = "";
  readonly tips = {
    point: "无效的输入。格式: 数字,数字",
    size: "无效的输入。格式: 数字*数字"
  };

  readonly validators = {
    point: isPoint,
    size: isSize
  };

  @Prop()
  value!: string;

  @Prop({ default: "point" })
  type!: "point" | "size";

  get attrs() {
    const attrs = _.clone(this.$attrs);
    delete attrs.type;
    return attrs;
  }

  validate(value: string) {
    if (this.validators[this.type](value)) {
      this.error = "";
    } else {
      this.error = this.tips[this.type];
    }
  }

  input(value: string) {
    this.validate(value);
    this.$emit("input", value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<style lang="scss">
.el-tooltip.el-input.error input {
  background: #ff8080;
}
</style>

<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class EmptyComp extends Vue {
  @Prop({ default: "没有内容" }) text!: string;
}
</script>

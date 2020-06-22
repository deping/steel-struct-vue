import VueOrg, { VueConstructor } from "vue";
import EmptyComp from "@/components/Empty.vue";
import store from "@/store";

export function createVue(container: HTMLElement, CompClass: VueConstructor<VueOrg>, props: any = undefined) {
  const instance = new CompClass({ store, propsData: props });
  // If elementOrSelector argument is not provided, the template will be rendered
  // as an off-document element, and you will have to use native DOM API to
  // insert it into the document yourself.
  instance.$mount();
  container.appendChild(instance.$el);
  return instance;
}

export function createEmpty(container: HTMLElement) {
  return createVue(container, EmptyComp, { text: "请打开某个构件进行编辑。" });
}

export function createNotRegist(container: HTMLElement, type: string) {
  return createVue(container, EmptyComp, { text: `<div>请注册${type}构件。</div>` });
}

<template>
  <div id="canvas-container">
    <canvas ref="canvas"> </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { getFileExt } from "@/utils/path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ResizeSensor } = require("css-element-queries");
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const FBXLoader = require("three-fbx-loader");

import Scene = THREE.Scene;
import Object3D = THREE.Object3D;
import PerspectiveCamera = THREE.PerspectiveCamera;
import WebGLRenderer = THREE.WebGLRenderer;

export interface ThreeModelFile {
  modelUrl: string; // *.obj or *.fbx
  mtlUrl?: string; // *.mtl(used by *.obj)
  picUrls?: string[];
}

@Component({
  components: {}
})
export default class ThreeJs extends Vue {
  name = "three-js";

  resizeSensor: any = undefined;

  modelFile: ThreeModelFile | undefined;
  fileModel: Object3D | undefined;
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  controls!: TrackballControls;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  @Prop()
  file: string | undefined;

  @Watch("file", { immediate: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChildChanged(name: string, oldName: string) {
    name = name ? name.trim() : name;
    if (!this.modelFile || this.modelFile.modelUrl !== name) {
      const modelFile = { modelUrl: name };
      this.setModelFile(modelFile);
    }
  }

  setModelFile(modelFile: ThreeModelFile) {
    // // TODO: remove this line
    // modelFile = {
    //   modelUrl: 'assets/model/streetlamp/streetlamp.obj',
    //   mtlUrl: 'assets/model/streetlamp/streetlamp.mtl',
    //   picUrls: ['assets/model/streetlamp/grey-concrete-texture.jpg']
    // };
    if (!modelFile) {
      return;
    }
    let name = modelFile.modelUrl;
    name = name ? name.trim() : name;
    if (!name) {
      return;
    }
    if (!this.modelFile || this.modelFile.modelUrl !== name) {
      this.modelFile = modelFile;
      const ext = getFileExt(name).toLowerCase();
      switch (ext) {
        case "obj":
          this.loadOBJ();
          break;
        case "fbx":
          this.loadFBX();
          break;
        default:
          break;
      }
    }
  }

  replaceModel(object3d: any /* THREE.Group */) {
    if (!object3d) return;
    if (this.fileModel && this.scene) {
      this.scene.remove(this.fileModel);
    }
    this.fileModel = object3d;
    this.scene.add(object3d);
    if (this.camera) {
      const bbox = new THREE.Box3().setFromObject(
        this.fileModel as THREE.Object3D
      );
      const sphere: THREE.Sphere = new THREE.Sphere();
      bbox.getBoundingSphere(sphere);
      this.camera.position.copy(sphere.center);
      this.camera.position.y -= 1.5 * sphere.radius;
      this.camera.far = 15 * sphere.radius;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(sphere.center);
      this.camera.up.set(0, 0, 1);
      this.controls.target.copy(sphere.center);
      this.controls.update();
    }
  }

  loadFBX() {
    if (!this.modelFile) {
      return;
    }
    const loader = new FBXLoader();
    loader.load(this.modelFile.modelUrl, (object3d: any) => {
      this.replaceModel(object3d);
    });
  }

  loadOBJ() {
    if (!this.modelFile) {
      return;
    }
    if (this.modelFile.mtlUrl) {
      const mtlLoader = new MTLLoader();
      // if (!!this.modelFile.picUrls && !!this.modelFile.picUrls[0]) {
      //   const picPath = getFilePath(this.modelFile.picUrls[0]) + "/";
      //   mtlLoader.setTexturePath(picPath);
      // }
      mtlLoader.load(this.modelFile.mtlUrl, materials => {
        materials.preload();
        const objLoader = new OBJLoader();
        // objLoader.setMaterials(materials);
        objLoader.load(
          (this.modelFile as ThreeModelFile).modelUrl,
          (object3d: any) => {
            this.replaceModel(object3d);
          }
        );
      });
    } else {
      const objLoader = new OBJLoader();
      objLoader.load(this.modelFile.modelUrl, object3d => {
        this.replaceModel(object3d);
      });
    }
  }

  init3D() {
    const canvas = this.$refs.canvas;
    // renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.add(new THREE.AmbientLight(0x222222));

    // camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );
    this.camera.aspect = canvas.width / canvas.height;
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(0, -1, 0);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera); // required, because we are adding a light as a child of the camera

    // controls
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );

    // lights
    const light = new THREE.PointLight(0xffffff, 0.8);
    this.camera.add(light);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // this.replaceModel(cube);

    this.animate();
  }

  /**
   * render the scene and request the window animation frame
   */
  animate() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.animate();
    });
  }

  onDivResize(size: { width: number; height: number }) {
    const width = size.width - 2;
    const height = size.height - 2;
    this.$refs.canvas.width = width;
    this.$refs.canvas.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    const box = this.$refs.canvas.getBoundingClientRect();
    if (box.width > 0 && box.height > 0) {
      this.controls.handleResize();
    }
  }

  mounted() {
    this.init3D();
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
</style>

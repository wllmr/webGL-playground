import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class Scenery {
  // Core
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;

  // Camera settings
  fov: number = 45;
  nearPlane: number = 1;
  farPlane: number = 1000;
  canvasId: string;

  // Additional components.
  controls?: OrbitControls;
  stats?: Stats;

  // Lighting
  ambientLight?: THREE.AmbientLight;
  directionalLight?: THREE.DirectionalLight;

  updatables: (() => void)[] = [];
  followTarget?: THREE.Object3D; // ✅ The object the camera will follow

  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.initialize();
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.y = 30;
    this.camera.position.z = 200;

    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Add FPS stats
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  registerFollowTarget(target: THREE.Object3D) {
    this.followTarget = target;
  }

  updateCamera() {
    if (!this.followTarget || !this.camera) return;

    // Set an offset behind the element
    const offset = new THREE.Vector3(0, 20, -50); // X, Y, Z offset
    const targetPosition = this.followTarget.position
      .clone()
      .add(offset.applyQuaternion(this.followTarget.quaternion));

    // Smoothly move the camera to the new position
    this.camera.position.lerp(targetPosition, 0.1);

    // Look at the car
    this.camera.lookAt(this.followTarget.position);
  }

  registerUpdatable(fn: () => void) {
    this.updatables.push(fn);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.updatables.forEach((updateFn) => updateFn());

    this.updateCamera();

    this.render();
    this.stats?.update();
    this.controls?.update();
  }

  render() {
    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera);
    }
  }

  onWindowResize() {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera?.updateProjectionMatrix();
    }
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}

import { GUI } from "dat.gui";
import * as THREE from "three";

export class Box {
  geometrySettings: {
    width?: number;
    height?: number;
    depth?: number;
  } = {
    width: 16,
    height: 16,
    depth: 16,
  };
  geometry: THREE.BoxGeometry;
  material: THREE.MeshPhongMaterial;
  mesh: THREE.Mesh;

  constructor() {
    this.geometry = new THREE.BoxGeometry(
      this.geometrySettings.width,
      this.geometrySettings.height,
      this.geometrySettings.depth
    );
    this.material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  addGui(gui: GUI) {
    const rotationFolder = gui.addFolder("Rotation");
    rotationFolder
      .add(this.mesh.rotation, "x", 0, Math.PI)
      .name("Rotate X Axis");
    rotationFolder
      .add(this.mesh.rotation, "y", 0, Math.PI)
      .name("Rotate Y Axis");
    rotationFolder
      .add(this.mesh.rotation, "z", 0, Math.PI)
      .name("Rotate Z Axis");

    const scaleFolder = gui.addFolder("Scale");
    scaleFolder.add(this.mesh.scale, "x", 0, 2).name("Scale X Axis");
    scaleFolder.add(this.mesh.scale, "y", 0, 2).name("Scale Y Axis");
    scaleFolder.add(this.mesh.scale, "z", 0, 2).name("Scale Z Axis");

    const meshFolder = gui.addFolder("Mesh material");
    meshFolder.add(this.material, "wireframe").name("Wireframe");
    const materialParams = {
      boxMeshColor: this.material.color.getHex(),
    };
    meshFolder.addColor(materialParams, "boxMeshColor").onChange((color) => {
      this.material.color.set(color);
    });
  }
}

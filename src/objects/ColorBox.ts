import * as THREE from "three";
import { BaseBox } from "./BaseBox";

export class ColorBox extends BaseBox {
  material: THREE.MeshPhongMaterial;

  constructor() {
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    super(material);

    this.material = material;
    this.geometry = new THREE.BoxGeometry(
      this.geometrySettings.width,
      this.geometrySettings.height,
      this.geometrySettings.depth
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  addGui() {
    super.addGui();

    const meshFolder = this.gui.addFolder("Mesh material");
    meshFolder.add(this.material, "wireframe").name("Wireframe");
    const materialParams = {
      boxMeshColor: this.material.color.getHex(),
    };
    meshFolder.addColor(materialParams, "boxMeshColor").onChange((color) => {
      this.material.color.set(color);
    });
  }
}

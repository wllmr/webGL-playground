import * as THREE from "three";
import { GUIManager } from "../../utils/GuiManager";
import { BaseElement } from "../BaseElement";

export abstract class BaseBox extends BaseElement {
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
  material: THREE.Material;
  mesh: THREE.Mesh;

  constructor(id: string, material: THREE.Material) {
    super(id);

    this.material = material;
    this.geometry = new THREE.BoxGeometry(
      this.geometrySettings.width,
      this.geometrySettings.height,
      this.geometrySettings.depth
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  protected addBoxGUI() {
    const rotationFolder = this.gui.addFolder("Rotation");
    rotationFolder
      .add(this.mesh.rotation, "x", 0, Math.PI)
      .name("Rotate X Axis");
    rotationFolder
      .add(this.mesh.rotation, "y", 0, Math.PI)
      .name("Rotate Y Axis");
    rotationFolder
      .add(this.mesh.rotation, "z", 0, Math.PI)
      .name("Rotate Z Axis");

    const scaleFolder = this.gui.addFolder("Scale");
    scaleFolder.add(this.mesh.scale, "x", 0, 2).name("Scale X Axis");
    scaleFolder.add(this.mesh.scale, "y", 0, 2).name("Scale Y Axis");
    scaleFolder.add(this.mesh.scale, "z", 0, 2).name("Scale Z Axis");
  }

  cleanup() {
    GUIManager.instance.removeFolder(this.id);
  }
}

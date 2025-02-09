import * as THREE from "three";
import { BaseBox } from "./BaseBox";

export class TextureBox extends BaseBox {
  texture: THREE.Texture;
  material: THREE.MeshStandardMaterial;

  constructor(id: string) {
    const texture = new THREE.TextureLoader().load("./assets/uv.jpeg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshStandardMaterial({ map: texture });

    super(id, material);

    this.texture = texture;
    this.material = material;
    this.geometry = new THREE.BoxGeometry(
      this.geometrySettings.width,
      this.geometrySettings.height,
      this.geometrySettings.depth
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.addTextureGUI();
  }

  private addTextureGUI() {
    this.addBoxGUI();

    const textureSettings = {
      repeatX: 1,
      repeatY: 1,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
    };

    const updateTexture = () => {
      this.texture.repeat.set(textureSettings.repeatX, textureSettings.repeatY);
      this.texture.offset.set(textureSettings.offsetX, textureSettings.offsetY);
      this.texture.rotation = textureSettings.rotation;
      this.texture.needsUpdate = true;

      this.mesh.updateMatrix();
    };

    const textureFolder = this.gui.addFolder("Texture");
    textureFolder
      .add(textureSettings, "repeatX", 0, 3, 0.1)
      .onChange(updateTexture);
    textureFolder
      .add(textureSettings, "repeatY", 0, 3, 0.1)
      .onChange(updateTexture);
    textureFolder
      .add(textureSettings, "offsetX", 0, 1, 0.01)
      .onChange(updateTexture);
    textureFolder
      .add(textureSettings, "offsetY", 0, 1, 0.01)
      .onChange(updateTexture);
    textureFolder
      .add(textureSettings, "rotation", 0, Math.PI * 2, 0.01)
      .onChange(updateTexture);
    textureFolder.add(this.material, "wireframe").name("Wireframe");
  }
}

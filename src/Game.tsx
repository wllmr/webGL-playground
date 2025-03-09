import { useEffect } from "react";
import * as THREE from "three";
import { Car } from "./elements/Car";
import { Scenery } from "./scene/Scenery";

export function Game() {
  useEffect(() => {
    const scenery = new Scenery("game-root");
    scenery.animate();

    // Ground
    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshStandardMaterial({
      color: 0x008000,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scenery.scene?.add(ground);

    const car = new Car("Car 1", scenery);

    // const colorBox = new ColorBox("Color Box");
    // scenery.scene?.add(colorBox.mesh);

    // const textureBox = new TextureBox("Texture Box");
    // scenery.scene?.add(textureBox.mesh);

    // colorBox.mesh.position.x = -10;
    // textureBox.mesh.position.x = 10;

    return () => {
      car.cleanup();
      //   colorBox.cleanup();
      //   textureBox.cleanup();
    };
  }, []);

  return <canvas id="game-root" />;
}

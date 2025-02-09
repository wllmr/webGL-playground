import { useEffect } from "react";
import { ColorBox } from "./elements/box/ColorBox";
import { TextureBox } from "./elements/box/TextureBox";
import { Scenery } from "./scene/Scenery";

export function Game() {
  useEffect(() => {
    const scenery = new Scenery("game-root");
    scenery.initialize();
    scenery.animate();

    const colorBox = new ColorBox("Color Box");
    const textureBox = new TextureBox("Texture Box");

    colorBox.mesh.position.x = -10;
    textureBox.mesh.position.x = 10;

    scenery.scene?.add(colorBox.mesh, textureBox.mesh);

    return () => {
      colorBox.cleanup();
      textureBox.cleanup();
    };
  }, []);

  return <canvas id="game-root" />;
}

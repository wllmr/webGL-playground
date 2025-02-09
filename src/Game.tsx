import { useEffect } from "react";
import { ColorBox } from "./objects/ColorBox";
import { TextureBox } from "./objects/TextureBox";
import { Scenery } from "./scene/Scenery";

export function Game() {
  useEffect(() => {
    const scenery = new Scenery("game-root");
    scenery.initialize();
    scenery.animate();

    const colorBox = new ColorBox();
    const textureBox = new TextureBox();

    colorBox.mesh.position.x = -10;
    textureBox.mesh.position.x = 10;

    scenery.scene?.add(colorBox.mesh, textureBox.mesh);

    colorBox.addGui();
    textureBox.addGui();

    return () => {
      colorBox.cleanup();
      textureBox.cleanup();
    };
  }, []);

  return <canvas id="game-root" />;
}

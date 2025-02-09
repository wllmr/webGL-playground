import { GUI } from "dat.gui";
import { useEffect } from "react";
import { Box } from "./objects/Box";
import { Scenery } from "./scene/Scenery";

export function Game() {
  useEffect(() => {
    const scenery = new Scenery("game-root");
    scenery.initialize();
    scenery.animate();

    const box = new Box();
    scenery.scene?.add(box.mesh);

    const gui = new GUI();
    box.addGui(gui);
  }, []);

  return <canvas id="game-root" />;
}

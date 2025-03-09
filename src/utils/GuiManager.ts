import { GUI } from "dat.gui";

export class GUIManager {
  private static _instance: GUIManager;
  private gui: GUI;

  private constructor() {
    this.gui = new GUI();
  }

  static get instance(): GUIManager {
    if (!GUIManager._instance) {
      GUIManager._instance = new GUIManager();
    }
    return GUIManager._instance;
  }

  folder(name: string) {
    if (!this.gui.__folders[name]) {
      this.gui.addFolder(name);
    }

    return this.gui.__folders[name];
  }

  removeFolder(name: string) {
    if (this.gui.__folders[name]) {
      Object.values(this.gui.__folders[name].__folders).forEach((folder) => {
        this.gui.__folders[name].removeFolder(folder);
      });

      this.gui.removeFolder(this.gui.__folders[name]);
    }
  }
}

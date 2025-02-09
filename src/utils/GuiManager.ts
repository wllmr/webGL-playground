import { GUI } from "dat.gui";

export class GUIManager {
  private static _instance: GUIManager;
  private gui: GUI;
  private folders: Record<string, GUI> = {};

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
    if (!this.folders[name]) {
      this.folders[name] = this.gui.addFolder(name);
    }

    return this.folders[name];
  }

  removeFolder(name: string) {
    if (this.folders[name]) {
      this.gui.removeFolder(this.folders[name]);
      delete this.folders[name];
    }
  }
}

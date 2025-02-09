import { GUI } from "dat.gui";
import { GUIManager } from "../utils/GuiManager";

export abstract class BaseElement {
  constructor(protected id: string) {}

  get gui(): GUI {
    return GUIManager.instance.folder(this.id);
  }

  abstract cleanup(): void;
}

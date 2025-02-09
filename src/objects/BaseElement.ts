import { GUI } from "dat.gui";

export interface BaseElement {
  gui: GUI;
  cleanup(): void;
}

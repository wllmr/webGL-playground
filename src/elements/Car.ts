import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { Scenery } from "../scene/Scenery";
import { GUIManager } from "../utils/GuiManager";
import { BaseElement } from "./BaseElement";

export class Car extends BaseElement {
  fbx: THREE.Group = new THREE.Group(); // Main car group
  wheels: THREE.Object3D[] = []; // Store all wheels

  movement = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

  speed = 0;
  acceleration = 0.005;
  maxSpeed = 0.5;
  rotationSpeed = 0.03;
  velocity = 0;

  constructor(id: string, scenery: Scenery) {
    super(id);
    this.loadCarModel(scenery);
    this.addEventListeners();
  }

  /**
   * Loads the FBX Car Model and Extracts the Correct Parts
   */
  private loadCarModel(scenery: Scenery) {
    new FBXLoader().load(
      "./models/generic-passenger-car-pack/source/fab.fbx",
      (fbx) => {
        if (!fbx) {
          console.error("FBX Model is undefined");
          return;
        }

        console.log("Loaded FBX Model:", fbx);

        this.fbx = fbx;
        scenery.scene?.add(this.fbx);

        // // Extract Car Body
        // const carBody = fbx.getObjectByName("Hatchback_Body");
        // if (carBody) {
        //   this.fbx.add(carBody);
        // } else {
        //   console.warn("Car body not found!");
        // }

        // // Extract Wheels
        // fbx?.traverse((child) => {
        //   if (child instanceof THREE.Mesh && child.name.includes("Wheel")) {
        //     this.wheels.push(child);
        //     this.fbx?.add(child);
        //   }
        // });

        // if (this.wheels.length === 0) {
        //   console.warn("No wheels found in the model!");
        // }

        // Scale & Position Adjustments
        this.fbx.scale.set(0.01, 0.01, 0.01);
        this.fbx.position.set(0, 1.2, 0);

        // Enable Shadows
        this.fbx?.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scenery.updatables.push(this.updateMovement.bind(this));
        this.addCarGUI();
      },
      (xhr) => {
        console.log(
          `Loading Model: ${Math.round((xhr.loaded / xhr.total) * 100)}%`
        );
      },
      (error) => {
        console.error("Error loading car model:", error);
      }
    );
  }

  /**
   * Handles Movement Input
   */
  private addEventListeners() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") this.movement.forward = true;
    if (event.key === "ArrowDown") this.movement.backward = true;
    if (event.key === "ArrowLeft") this.movement.left = true;
    if (event.key === "ArrowRight") this.movement.right = true;
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") this.movement.forward = false;
    if (event.key === "ArrowDown") this.movement.backward = false;
    if (event.key === "ArrowLeft") this.movement.left = false;
    if (event.key === "ArrowRight") this.movement.right = false;
  };

  /**
   * Updates Car Movement & Wheel Rotation
   */
  private updateMovement() {
    if (!this.fbx) return;

    // Apply Acceleration & Friction
    if (this.movement.forward) {
      this.velocity = Math.min(
        this.velocity + this.acceleration,
        this.maxSpeed
      );
    } else if (this.movement.backward) {
      this.velocity = Math.max(
        this.velocity - this.acceleration,
        -this.maxSpeed / 2
      );
    } else {
      this.velocity *= 0.98; // Apply friction
      if (Math.abs(this.velocity) < 0.001) this.velocity = 0;
    }

    // Move the Car Forward/Backward
    this.fbx.translateZ(this.velocity);

    // Rotate Car When Moving
    if (Math.abs(this.velocity) > 0.01) {
      if (this.movement.left) {
        this.fbx.rotation.y +=
          this.rotationSpeed * (this.velocity / this.maxSpeed);
      }
      if (this.movement.right) {
        this.fbx.rotation.y -=
          this.rotationSpeed * (this.velocity / this.maxSpeed);
      }
    }

    //  Rotate Wheels Based on Movement
    if (this.wheels.length > 0) {
      const wheelRotationSpeed = this.velocity * 10;
      this.wheels.forEach((wheel) => wheel.rotateX(wheelRotationSpeed));
    }
  }

  /**
   * Adds GUI Controls for Car Speed & Steering
   */
  private addCarGUI() {
    this.gui.add(this, "velocity", 0, this.maxSpeed).name("Speed");
    this.gui.add(this, "acceleration", 0.001, 0.02).name("Acceleration");
    this.gui.add(this, "maxSpeed", 0.1, 1).name("Max Speed");
    this.gui.add(this, "rotationSpeed", 0.01, 0.1).name("Turn Speed");
  }

  /**
   * Cleanup Event Listeners & GUI
   */
  cleanup() {
    this.removeEventListeners();
    GUIManager.instance.removeFolder(this.id);
  }
}

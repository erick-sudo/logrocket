import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color("skyblue"); // #222831

  return scene;
}

export { createScene };

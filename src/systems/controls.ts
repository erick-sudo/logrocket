import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas);

  return controls;
}

export { createControls };

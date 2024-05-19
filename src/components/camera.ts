import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75, // fov = Field of View,
    1, // aspect ratio
    0.1, // Near clipping plane
    10000 // Far clipping plane
  );

  // camera.tick = (delta) => {
  //   camera.position.z += delta * 10
  // }

  return camera;
}

export { createCamera };

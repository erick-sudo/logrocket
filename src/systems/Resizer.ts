import { PerspectiveCamera, WebGLRenderer } from "three";

const setSize = (
  container: HTMLDivElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  // Set the camera's aspect ration
  camera.aspect = container.clientWidth / container.clientHeight;

  // Update the camera's frustrum
  camera.updateProjectionMatrix();

  // Update the size of the renderer and the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Set the pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }

  onResize() {}
}

export { Resizer };

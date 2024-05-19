import {
  DirectionalLight,
  HemisphereLight,
} from "three";

function createLights() {
  // Create ambient light
  // const ambientLight = new AmbientLight("white", 2);
  const ambientLight = new HemisphereLight("white", "darkslategrey", 5);

  // Create a directional light
  const mainLight = new DirectionalLight("white", 1);
  // const mainLight = new PointLight("red", 4);

  // Move the light right, up, and towards us
  mainLight.position.set(0, 0, 5);
  mainLight.castShadow = true;
  mainLight.shadow.bias = -0.001;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.1;
  mainLight.shadow.camera.far = 1000;
  mainLight.shadow.camera.left = 100;
  mainLight.shadow.camera.right = -100;
  mainLight.shadow.camera.top = 100;
  mainLight.shadow.camera.bottom = -100;

  return { ambientLight, mainLight };
}

export { createLights };

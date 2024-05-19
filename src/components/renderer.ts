import { PCFSoftShadowMap, WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  // turn on the physically correct lighting model
  //renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };

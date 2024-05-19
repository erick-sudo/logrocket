import { Sky } from "three/examples/jsm/Addons.js";

function createSky() {
  const sky = new Sky();
  // Dimensions of the skybox
  sky.scale.setScalar(10000);

  // Set up variables to control the look of the sky
  const skyUniforms = sky.material.uniforms;
  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;

  return sky;
}

export { createSky };

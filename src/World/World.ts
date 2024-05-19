import {
  BoxGeometry,
  DirectionalLightHelper,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { createCamera } from "../components/camera";
import { createScene } from "../components/scene";
import { createRenderer } from "../components/renderer";
import { Loop } from "../systems/Loop";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { createControls } from "../systems/controls";
import { createLights } from "../components/lights";
import { Resizer } from "../systems/Resizer";
import { createWater } from "../components/meshes/water";
import { createSky } from "../components/meshes/sky";

let camera: PerspectiveCamera,
  scene: Scene,
  renderer: WebGLRenderer,
  loop: Loop,
  controls: OrbitControls;

class World {
  // An instance of the World app
  constructor(container: HTMLDivElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    const sun = new Vector3();

    // Set camera position
    camera.position.set(0, 5, 100);

    // Initializing the game loop
    loop = new Loop(camera, scene, renderer);

    // Check if there exists any first element and ensure it is removed
    if (container.firstElementChild) {
      container.firstElementChild.remove();
    }

    // Insert the canvas element into the DOM
    container.append(renderer.domElement);

    // Initiaize OrbitControlls helpers
    controls = createControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.update();

    // OrbitControlls Render on demand
    controls.addEventListener("change", () => {
      this.render();
    });

    controls.update();

    // Get the ambient and directional light
    const { ambientLight, mainLight } = createLights();
    // Add lights to the scene
    scene.add(ambientLight, mainLight);

    // Create water and add to scene
    const water = createWater(scene);
    water.rotation.x = -Math.PI / 2;
    water.rotation.z = 0;
    scene.add(water);

    // Create sky and add to scene
    const sky = createSky();
    scene.add(sky);

    const configureSunAndWater = () => {
      const parameters = {
        elevation: 3,
        azimuth: 115,
      };

      const pmremGenerator = new PMREMGenerator(renderer);

      const phi = MathUtils.degToRad(90 - parameters.elevation);
      const theta = MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms["sunPosition"].value.copy(sun);
      (water.material as ShaderMaterial).uniforms["sunDirection"].value
        .copy(sun)
        .normalize();
      scene.environment = pmremGenerator.fromScene(sky as any).texture;

      // (water.material as ShaderMaterial).uniforms["speed"].value = 0.0;
    };

    configureSunAndWater();

    const box = new Mesh(
      new SphereGeometry(2),
      new MeshStandardMaterial({ color: "maroon" })
    );

    scene.add(box);

    const directionalLightHelper = new DirectionalLightHelper(mainLight, 5);
    //const pointLightHelper = new PointLightHelper(mainLight);
    scene.add(directionalLightHelper);

    // Initialize window resize listener
    const resizer = new Resizer(container, camera, renderer);

    resizer.onResize = () => {
      this.render();
    };
  }

  async init() {}

  // Render the scene
  render() {
    renderer.render(scene, camera);
  }

  // Start loop
  start() {
    loop.start();
  }

  // Stop loop
  stop() {
    loop.stop();
  }
}

export { World };

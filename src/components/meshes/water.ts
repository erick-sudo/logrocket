import {
  MirroredRepeatWrapping,
  PlaneGeometry,
  Scene,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { Water } from "../../objects/Water.js";

function createWater(scene: Scene) {
  const waterGeometry = new PlaneGeometry(10000, 10000);

  return new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new TextureLoader().load(
      "static/normals/waternormals.jpeg",
      function (texture: Texture) {
        texture.wrapS = texture.wrapT = MirroredRepeatWrapping;
      }
    ),
    sunDirection: new Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
}

export { createWater };

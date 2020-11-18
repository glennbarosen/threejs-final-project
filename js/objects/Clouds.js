import {Object3D, Sprite, SpriteMaterial, TextureLoader} from "../lib/three.module.js";

export default class Clouds extends Object3D {
    constructor(scene) {

        super();

        function generateClouds() {

            let random = (min, max) => Math.random() * (max - min) + min;

            for (let i=0; i<50; i++) {
                const cloudTexture = new TextureLoader().load('resources/textures/cloud.png');

            let cloudMaterial = new SpriteMaterial(
                {
                    map: cloudTexture,


                }
            )
                let skyPlane = new Sprite(cloudMaterial)

                let pX = random(-2000, 2000);
                let pZ = random(-400, -1000);
                let pY = random(200, 100);
                let s1 = random(2000, 1000);

                skyPlane.position.set(pX, pY, pZ);
                skyPlane.scale.multiplyScalar(random(100, 500))

                scene.add(skyPlane);

            }
        }
        generateClouds()
    }
}

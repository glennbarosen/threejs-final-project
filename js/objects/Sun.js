"use strict"

import {
    SphereGeometry,
    TextureLoader,
    MeshPhongMaterial,
    Mesh,
    AmbientLight,
    PointLight,
    Object3D,
    Color
} from "../lib/three.module.js";
import CustomShader from "../materials/CustomShader.js";


export default class Sun {
    constructor(scene) {
        let radius = 5;
        let widthSegments = 64;
        let heightSegments = 64;
        let sunGeometry = new SphereGeometry(radius, widthSegments, heightSegments)
        let sunTextureUrl = 'resources/textures/texture_sun.jpg';
        let sunTexture = new TextureLoader().load(sunTextureUrl);

        let sunMaterial = new CustomShader({
            mapInParameters: sunTexture,
            colorInParameters: new Color(0x00FF00)
        })


        this.orbit = new Object3D()
        scene.add(this.orbit)

        this.orbit.position.y = 50

        this.sun = new Mesh(sunGeometry, sunMaterial)
        this.orbit.add(this.sun)
        this.sun.position.x = 80

        this.sunLight = new PointLight(0xffffff, 0.7);
        //Legger lyset som barn av solen
        this.sun.add(this.sunLight);
        this.sunLight.castShadow = true




        this.ambientLight = new AmbientLight(0xffffff, 0.2);
        scene.add(this.ambientLight); //Legg bakgrunnslyset til i scenen.


    }
    animate() {

        this.rotateObject(this.orbit, [0.0, 0.005, 0.0]);
        this.rotateObject(this.sun, [0.0, 0.05, 0.0])


    }

    rotateObject(object, rotation){
        //Hjelpe-metode for å rotere et objekt
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
    }
}
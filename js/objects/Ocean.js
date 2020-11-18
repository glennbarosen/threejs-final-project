"use strict";

import { Water } from "./Water.js";
import {
    PlaneBufferGeometry,
    RepeatWrapping,
    TextureLoader,
} from "../lib/three.module.js";

// Cleaner ocean setup borrowed from fellow student.
export default class Ocean extends Water{
    constructor(width=1000, height=1000, textureUrl) {
        let geometry = new PlaneBufferGeometry(width, height);
        let options = {
            waterNormals: new TextureLoader().load(textureUrl, (texture) => {
                texture.wrapS = texture.wrapT = RepeatWrapping;
            }),
            alpha: 1.0,
            distortionScale: 3.7,
            fog: false,
        }

        super(geometry, options);

        this.rotation.x = -Math.PI/2;
        this.position.y = 4;

    }

    animateOcean = () => {
        this.material.uniforms["time"].value += 1.0 / 360.0;
    }

}
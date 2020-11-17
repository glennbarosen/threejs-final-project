"use strict";

import {
    Object3D
} from "./lib/three.module.js";
import {GLTFLoader} from "./loaders/GLTFLoader.js";

export default class FlyingParrot {
    constructor(scene) {

        //Oppretter et usynlig Object3D som parrot skal fly rundt
        this.orbitNode = new Object3D();

        this.orbitNode.position.x = -30
        this.orbitNode.position.y = 10
        this.orbitNode.position.z = 30
        scene.add(this.orbitNode)


        let loader = new GLTFLoader()
        loader.load(
            // resource URL
            'resources/models/Parrot.glb',
            // called when resource is loaded
            (object) => {
                const parrotObj = object.scene.children[0]


                this.orbitNode.add(parrotObj)
                parrotObj.rotation.y = -Math.PI
                parrotObj.rotation.z = -Math.PI/4
                parrotObj.position.x = 10
                parrotObj.scale.multiplyScalar(0.06)

                parrotObj.castShadow = true;


            },
            (xhr) => {
                console.log(((xhr.loaded / xhr.total) * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading model.', error);
            }
        );
    }

    animate() {

        this.rotateObject(this.orbitNode, [0.0, 0.01, 0.0]);


    }

    rotateObject(object, rotation){
        //Hjelpe-metode for å rotere et objekt
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
    }

}
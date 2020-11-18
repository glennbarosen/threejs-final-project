"use strict";

import {
    Object3D
} from "../lib/three.module.js";
import {GLTFLoader} from "../loaders/GLTFLoader.js";

export default class Boats {
    constructor(scene) {

        //Oppretter et usynlig Object3D som båt skal rotere rundt
        this.boatOrbit = new Object3D();

        this.boatOrbit.position.x = 0
        this.boatOrbit.position.y = 4
        this.boatOrbit.position.z = 0
        scene.add(this.boatOrbit)


        let loaders = new GLTFLoader()
        loaders.load(
            // resource URL
            'resources/models/Viking_boat/scene.gltf',
            // called when resource is loaded
            (objects) => {
                const boatObj = objects.scene.children[0]


                this.boatOrbit.add(boatObj)
                boatObj.rotation.x = -Math.PI/2
                boatObj.rotation.y = 0
                boatObj.rotation.z = 110
                boatObj.position.x = 90
                boatObj.scale.multiplyScalar(0.04)

                boatObj.castShadow = true;


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

        this.rotateObject(this.boatOrbit, [0.0, 0.001, 0.0]);


    }

    rotateObject(objects, rotation){
        //Hjelpe-metode for å rotere et objekt
        objects.rotation.x += rotation[0];
        objects.rotation.y += rotation[1];
        objects.rotation.z += rotation[2];
    }

}
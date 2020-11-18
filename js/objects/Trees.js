"use strict";

import { TextureLoader, SpriteMaterial, Sprite } from "../lib/three.module.js";
import Utilities from "../lib/Utilities.js";
import { GLTFLoader } from "../loaders/GLTFLoader.js";

// trees
export default class Trees {

    constructor(scene, textureUrl, terrainGeometry) {
        this.scene = scene;
        this.textureUrl = textureUrl;
        this.terrainGeometry = terrainGeometry;
    }

    generateTrees = (grid, minDist, maxDist, minHeight, maxHeight) => {
        const offset = this.terrainGeometry.width / 2;
        const loader = new GLTFLoader();
        let pds = new PoissonDiskSampling({
            shape: grid,
            minDistance: minDist,
            maxDistance: maxDist,
            tries: 10,
        });

        let points = pds.fill();
        console.log(points);

        loader.load(
            this.textureUrl,
            (object) => {
                for (const point of points) {
                    const px = point[0] - offset;
                    const pz = point[1] - offset;

                    const height = this.terrainGeometry.getHeightAt(px, pz);
                    const model = object.scene.children[0].clone();

                    if (height > minHeight && height < maxHeight) {
                        model.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = false;
                                child.receiveShadow = false;
                            }
                        });

                        model.position.x = px;
                        model.position.y = height - 0.01;
                        model.position.z = pz;

                        model.rotation.y = Math.random() * (2 * Math.PI);

                        model.scale.multiplyScalar(2 + Math.random() * 2);

                        model.castShadow = true;
                        model.receiveShadow = true;

                        this.scene.add(model);
                    }
                }
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error("Error loading model.", error);
            }
        );
    };
}
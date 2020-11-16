"use strict";

import { TextureLoader, SpriteMaterial, Sprite } from "./lib/three.module.js";
import Utilities from "./lib/Utilities.js";
import { GLTFLoader } from "./loaders/GLTFLoader.js";

/**
 * Class to generate trees in our terrain.
 */
export default class Trees {
    /**
     *
     * @param {*} scene the scene the trees will belong to
     * @param {*} textureUrl url of the texture to be used for trees
     * @param {*} terrainGeometry the terrain that the trees will be placed on.
     */
    constructor(scene, textureUrl, terrainGeometry) {
        this.scene = scene;
        this.textureUrl = textureUrl;
        this.terrainGeometry = terrainGeometry;
    }

    /**
     * The PoissonDiskSampling is licensed by MIT. Borrowed from the internet!
     * A method to generate trees using Poisson Disk Sampling.
     * The function will attempt to generate trees within the grid as long as the height is accepted.
     * @param {Array} grid size of the grid in which to generate trees in.
     * @param {Number} minDist minimum distance between trees.
     * @param {Number} maxDist maximum distance between trees.
     * @param {Number} minHeight the minimum height at which to put trees in the terrain
     * @param {Number} minHeight the maximum height at which to put trees in the terrain
     */
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
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });

                        model.position.x = px;
                        model.position.y = height - 0.01;
                        model.position.z = pz;

                        model.rotation.y = Math.random() * (2 * Math.PI);

                        model.scale.multiplyScalar(2 + Math.random() * 2);

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
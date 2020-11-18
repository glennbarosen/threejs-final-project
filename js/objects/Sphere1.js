"use strict"

import {
    SphereGeometry,
    MeshBasicMaterial,
    Mesh, Object3D, Color, Raycaster, TextureLoader, MeshPhongMaterial

} from "../lib/three.module.js";


export default class Sphere1 {

    constructor(scene) {
        let radius = 4;
        let widthSegments = 40;
        let heightSegments = 40;
        let geometry = new SphereGeometry(radius, widthSegments, heightSegments);

        let sphere1Texture = new TextureLoader().load('resources/textures/rock_01.png');
        let sphere1Bump = new TextureLoader().load('resources/textures/texture_sphere.jpg');

        let material = new MeshPhongMaterial({map: sphere1Texture, bumpMap: sphere1Bump});
        this.sphere1 = new Mesh(geometry, material)

        this.sphere1.position.x = -44
        this.sphere1.position.y = 6
        this.sphere1.position.z = 17
        this.sphere1.castShadow = true;
        this.sphere1.receiveShadow = true;

        this.sphere1.rotation.z = -Math.PI/1

        scene.add(this.sphere1)


    }

}



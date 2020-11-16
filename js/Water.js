"use strict"

import {BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry} from "./lib/three.module.js";

export default class Water {
    constructor(scene) {

        this.vertexHeight = .7

        this.waterGeometry = new PlaneGeometry(1000, 1000, 100, 100)
        this. waterMaterial = new MeshBasicMaterial({
            color: 0x2389da,

            transparent: true,
            opacity: 0.8
        })
        this.water = new Mesh(this.waterGeometry, this.waterMaterial)

        scene.add(this.water)
        this.water.rotation.x = -Math.PI * 0.5
        this.water.position.set(0,4,0)



    }
    updateWater() {
        for (let i = 0; i < this.waterGeometry.vertices.length; i++) {
            this.waterGeometry.vertices[i].z += Math.random() * this.vertexHeight - this.vertexHeight;
            this.waterGeometry.vertices[i]._myZ = this.waterGeometry.vertices[i].z
        }

    }

    createWave() {
        let count = 0
            for (let i = 0; i < this.waterGeometry.vertices.length; i++) {
            let z = +this.waterGeometry.vertices[i].z;
            this.waterGeometry.vertices[i].z = Math.sin(( i + count * 0.00002)) *
                (this.waterGeometry.vertices[i]._myZ - (this.waterGeometry.vertices[i]._myZ* 0.6))
        this.water.geometry.verticesNeedUpdate = true;

        count += 0.1
}
}
}
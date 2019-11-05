import "scss/stars.scss";

import "pepjs";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { GridMaterial } from "@babylonjs/materials/grid";

import "@babylonjs/core/Meshes/meshBuilder";

const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;

const engine = new Engine(canvas);
let scene = new Scene(engine);

let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

let material = new GridMaterial("grid", scene);

let sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
sphere.position.y = 2;
sphere.material = material;

let ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
ground.material = material;

engine.runRenderLoop(() => {
    scene.render();
});

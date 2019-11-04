import "scss/index.scss";

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
var scene = new Scene(engine);

var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

var material = new GridMaterial("grid", scene);

var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
sphere.position.y = 2;
sphere.material = material;

var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
ground.material = material;

engine.runRenderLoop(() => {
    scene.render();
});

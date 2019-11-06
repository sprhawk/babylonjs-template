import "scss/earth.scss";

import "pepjs";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { GridMaterial } from "@babylonjs/materials/grid";

import "@babylonjs/core/Meshes/meshBuilder";

class EarthScene {
    scene: Scene;
    private _camera: FreeCamera;
    private _light: HemisphericLight;
    private _material: GridMaterial;
    private _solarMesh: Mesh;
    private _planetMesh: Mesh;
    private _ground: Mesh;
    
    constructor(engine: Engine) {
        this.scene = new Scene(engine);

        let canvas = engine.getRenderingCanvas();
        this._camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);
        this._camera.setTarget(Vector3.Zero());
        if (canvas) {
            this._camera.attachControl(canvas, true);
        }

        this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        this._light.intensity = 0.7;

        this._material = new GridMaterial("grid", this.scene);

        this._solarMesh = Mesh.CreateSphere("sphere1", 16, 2, this.scene);
        this._solarMesh.position.y = 2;
        this._solarMesh.material = this._material;

        this._planetMesh = Mesh.CreateSphere("spherePlanet", 6, 2, this.scene);
        this._planetMesh.position.y = 2;
        this._planetMesh.position.x = -2;
        this._planetMesh.material = this._material;

        this._ground = Mesh.CreateGround("ground1", 16, 16, 2, this.scene);
        this._ground.material = this._material;
    }

    render() {
        this.scene.render();
    }
}

class EarthDemo {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: EarthScene | null = null;
    
    constructor(canvasElementId: string) {
        this._canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas);
    }

    createScene() : void {
        this._scene = new EarthScene(this._engine);
    }

    doRender() : void {
        this._engine.runRenderLoop(() => {
            if(this._scene != null) {
                this._scene.render();
            }
        });

        window.addEventListener('resize', ()=>{
            this._engine.resize();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let demo = new EarthDemo("mainCanvas");
    demo.createScene();
    demo.doRender();
});

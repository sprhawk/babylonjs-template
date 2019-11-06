import "scss/stars.scss";

import "pepjs";
import { Engine, Scene, SceneLoader } from "@babylonjs/core";
import "cannon";

class StarsDemo {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene | null = null;
    
    constructor(canvasElementId: string) {
        this._canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas);

        window.addEventListener('resize', ()=>{
            this._engine.resize();
        });
    }

    createScene() : void {
        SceneLoader.Load("./scenes/", "scene.babylon", this._engine, (scene: Scene) => {
            this._scene = scene;
            if(null != this._scene) {
                let scn: Scene = this._scene;
                if(!scn.activeCamera) {
                    scn.createDefaultCamera(false, true, true);
                }
                else {
                    scn.activeCamera.attachControl(this._canvas, true);
                }

                this._engine.runRenderLoop(() => {
                    scn.render();
                });
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let demo = new StarsDemo("mainCanvas");
    demo.createScene();
});

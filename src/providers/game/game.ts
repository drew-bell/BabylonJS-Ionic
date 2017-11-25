import {
    Engine, Scene, Light, Viewport, Color4,
    Vector3, HemisphericLight, MeshBuilder, Quaternion,
    DeviceOrientationCamera, ArcRotateCamera, StandardMaterial, Texture, Color3
} from 'babylonjs';
import { Marker } from '../../app/classes/marker';
import { Injectable } from '@angular/core';
import { DeviceProvider } from '../device/device';

@Injectable()
export class GameProvider {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: DeviceOrientationCamera;
    private _minimap: ArcRotateCamera;
    private _light: Light;

    constructor(canvasElement: string) {

        // canvasElement = (canvasElement === undefined ? 'renderCanvas' : canvasElement);
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new Engine(this._canvas, true);
    }

    createScene(): void {

        // create a basic BJS Scene object
        this._scene = new Scene(this._engine);

        /** Main Camera **/

        // movement camera
        this._camera = new DeviceOrientationCamera("DevOr_camera", new Vector3(0, 0, 0), this._scene);

        // FOV
        this._camera.fov = 0.8;

        // add to camera array
        this._scene.activeCameras.push(this._camera);

        // This targets the camera to scene origin
        this._camera.layerMask = 1;

        // set the sensitivity
        this._camera.angularSensibility = 10;

        // This attaches the camera to the canvas
        this._camera.attachControl(this._canvas, false);

        // prevent screen touches moving the camera
        this._camera.inputs.remove(this._camera.inputs.attached.mouse);
        this._camera.inputs.remove(this._camera.inputs.attached.keyboard);

        // set viewport
        this._camera.viewport = new Viewport(0, 0, 1, 1);

        // clear background
        this._scene.clearColor = new Color4(0, 0, 0, 0.0000000000000001);

        // animate
        this.animate();
    }

    // animation loops
    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

    // add minimap
    minimap(zoom?: number): void {

        zoom = (zoom === undefined ? 100 : zoom);

        // minimap camera
        this._minimap = new ArcRotateCamera("minimap_cam", 0, 0, 0, new Vector3(0, zoom + 1, 0), this._scene);

        // add to camera array
        this._scene.activeCameras.push(this._minimap);

        // set facing direction
        this._minimap.target = new Vector3(0, 0, 0.1);

        // layer mask
        this._minimap.layerMask = 2;

        // set viewport
        this._minimap.viewport = new Viewport(0, 0, (2) / (this._canvas.width / 100) / 1.3, (2) / (this._canvas.height / 100) / 1.3);

        // radar ring
        let groundTexture = new BABYLON.Texture("assets/imgs/radar_north.png", this._scene);
        var groundMaterial = new BABYLON.StandardMaterial("texturePlane", this._scene);
        groundMaterial.emissiveTexture = groundTexture;
        groundMaterial.opacityTexture = groundTexture;
        groundMaterial.backFaceCulling = true;

        // background for the radar
        var ground = BABYLON.MeshBuilder.CreateGround("radar_ring", {
            height: zoom - 5,
            width: zoom - 5,
            subdivisions: 4
        }, this._scene);
        ground.material = groundMaterial;
        ground.position.y = 1;
        ground.layerMask = 2;
        ground.isPickable = false;

        // radar ring
        var planeTexture = new BABYLON.Texture("assets/imgs/radar_bg.png", this._scene);
        var planeMaterial = new BABYLON.StandardMaterial("texturePlane", this._scene);
        planeMaterial.emissiveTexture = planeTexture;
        planeMaterial.opacityTexture = planeTexture;
        planeMaterial.backFaceCulling = true;

        var plane = BABYLON.MeshBuilder.CreateGround("radar_background", {
            height: zoom - 5,
            width: zoom - 5,
            subdivisions: 4
        }, this._scene);
        plane.material = planeMaterial;
        plane.layerMask = 2;
        plane.isPickable = false;

        // This applies a mask to the minimap to make it a cutout circle
        var cutlayer = new BABYLON.Layer("top", null, this._scene, true);
        var laytex = new BABYLON.Texture("assets/imgs/roundmask.png", this._scene);
        cutlayer.texture = laytex;
        cutlayer.alphaTest = true;

        cutlayer.onBeforeRender = () => {
            this._engine.setColorWrite(false);
            if (this._scene.activeCamera == this._minimap) {
                this._engine.setDepthBuffer(true);
            }
        }

        cutlayer.onAfterRender = () => {
            this._engine.setColorWrite(true);
        };

        // before drawing the minimap
        plane.onBeforeDraw = () => {

            // get camera rotation
            var r = this._camera.rotationQuaternion.toEulerAngles()

            // Apply rotation
            plane.rotation.y = r.y;
        }
    }

    addLight() {

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new HemisphericLight("light", new Vector3(0, 30, 0), this._scene);

        // set light strength
        this._light.intensity = 0.4;

        this._light.excludedMeshes = [];
        this._light.excludeWithLayerMask = 1;
        for (var i = 0; i < this._scene.meshes.length; i++) {
            if (this._scene.meshes[i].layerMask == 1) {
                this._light.excludedMeshes.push(this._scene.meshes[i]);
            }
        }

    }

    resize() {

        // resize canvas
        this._canvas.width = window.screen.width;
        this._canvas.height = window.screen.height;

        // viewport
        this._minimap.viewport = new Viewport(0, 0, (2) / (this._canvas.width / 100) / 1.3, (2) / (this._canvas.height / 100) / 1.3);
    }

    resetToNewYRotation(rotation: string): void {

        //can only work if this camera has a rotation quaternion already.
        if (!this._camera.rotationQuaternion) return;

        if (!this._camera._initialQuaternion) {
            this._camera._initialQuaternion = new Quaternion();
        }

        this._camera._initialQuaternion.copyFrom(this._camera._quaternionCache || this._camera.rotationQuaternion);

        // Find north
        this._camera._initialQuaternion.x = 0;
        this._camera._initialQuaternion.z = 0;
        this._camera._initialQuaternion.y *= -1;

        var rot;

        switch (rotation) {
            case 'north': // works as expected
                break;
            case 'east': // offset to east
                this._camera._initialQuaternion.normalize();
                rot = this._camera._initialQuaternion.toEulerAngles()
                rot.y += this.toRadians(90);
                Quaternion.RotationYawPitchRollToRef(rot.y, rot.x, rot.z, this._camera._initialQuaternion);
                break;
            case 'south': //offset to sout
                this._camera._initialQuaternion.normalize();
                rot = this._camera._initialQuaternion.toEulerAngles()
                rot.y += this.toRadians(180);
                Quaternion.RotationYawPitchRollToRef(rot.y, rot.x, rot.z, this._camera._initialQuaternion);
                break;
            case 'west': // offset to west
                this._camera._initialQuaternion.normalize();
                rot = this._camera._initialQuaternion.toEulerAngles()
                rot.y += this.toRadians(-90);
                Quaternion.RotationYawPitchRollToRef(rot.y, rot.x, rot.z, this._camera._initialQuaternion);
                break;
        }

        this._camera._initialQuaternion.normalize();
        this._camera._initialQuaternion.multiplyToRef(this._camera.rotationQuaternion, this._camera.rotationQuaternion);
    }

    toRadians(num): number {
        return num * Math.PI / 180;
    }

    addMinimapMarker(marker: Marker, device: DeviceProvider): void {

        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 3
        }, this._scene);

        let material = new BABYLON.StandardMaterial("minimaterial", this._scene);

        material.emissiveColor = Color3.White();

        // apply position
        let position = marker.location.relativeLatLonTo(device.location);

        sphere.position = new Vector3(position.latitude(), position.altitude(), position.longitude());

        sphere.position.y = 0.1;

        // apply material
        sphere.material = material;

        // set to minimap camera
        sphere.layerMask = 2;

        // doesn't respond to touches
        sphere.isPickable = false;
    }

    addNameMarker(marker: Marker, device: DeviceProvider): void {

        let texture = new Texture(marker.img, this._scene)

        let material = new BABYLON.StandardMaterial("mainmaterial", this._scene);

        material.opacityTexture = texture; // transparency

        material.emissiveTexture = texture; // texture

        material.backFaceCulling = true; // don't need the back

        let mark = BABYLON.MeshBuilder.CreatePlane("box", {
            width: 2,
            height: 1
        }, this._scene);

        mark.id = String(marker.id);

        // main camera layer
        mark.layerMask = 1;

        // direction to point from device
        let bearing = marker.location.bearingTo(device.location);

        // get a Device coord along the bearing at 900 units
        let p = marker.location.getlocationAtDistanceFrom(device.location, 1000, bearing);

        // location to world
        let position = p.relativeLatLonTo(device.location);

        // apply position to marker
        mark.position = new Vector3(position.latitude(), position.altitude(), position.longitude());

        // prevent meshes overlapping
        mark.position.y = -1;

        // apply material
        mark.material = material;

        // face the camera
        mark.lookAt(Vector3.Zero());
    }

    cardinals(): void {
        var nth = new Texture("assets/imgs/north.png", this._scene)
        var n_material = new StandardMaterial("minimaterial", this._scene);
        n_material.emissiveTexture = nth;
        n_material.opacityTexture = nth; // transparency
        n_material.backFaceCulling = true; // don't need the back
        n_material.alpha = 0.5;

        var eth = new Texture("assets/imgs/east.png", this._scene)
        var e_material = new StandardMaterial("minimaterial", this._scene);
        e_material.emissiveTexture = eth;
        e_material.opacityTexture = eth; // transparency
        e_material.backFaceCulling = true; // don't need the back
        e_material.alpha = 0.5;

        var sth = new Texture("assets/imgs/south.png", this._scene)
        var s_material = new StandardMaterial("minimaterial", this._scene);
        s_material.emissiveTexture = sth;
        s_material.opacityTexture = sth; // transparency
        s_material.backFaceCulling = true; // don't need the back
        s_material.alpha = 0.5;

        var wth = new Texture("assets/imgs/west.png", this._scene)
        var w_material = new StandardMaterial("minimaterial", this._scene);
        w_material.emissiveTexture = wth;
        w_material.opacityTexture = wth; // transparency
        w_material.backFaceCulling = true; // don't need the back
        w_material.alpha = 0.5;

        var north = MeshBuilder.CreatePlane("north", {
            width: 3, height: 3
        }, this._scene);
        north.position = new Vector3(0, -2, 15);
        north.layerMask = 1;
        north.material = n_material;
        north.isPickable = false;
        // north.type = "main";
        north.lookAt(Vector3.Zero());

        var east = MeshBuilder.CreatePlane("east", {
            width: 3, height: 3
        }, this._scene);
        east.position = new Vector3(15, -2, 0);
        east.layerMask = 1;
        east.material = e_material;
        east.isPickable = false;
        // east.type = "main";
        east.lookAt(Vector3.Zero());

        var south = MeshBuilder.CreatePlane("south", {
            width: 3, height: 3
        }, this._scene);
        south.position = new Vector3(0, -2, -15);
        south.layerMask = 1;
        south.material = s_material;
        south.isPickable = false;
        // south.type = "main";
        south.lookAt(Vector3.Zero());

        var west = MeshBuilder.CreatePlane("west", {
            width: 3, height: 3
        }, this._scene);
        west.position = new Vector3(-15, -2, 0);
        west.material = w_material;
        west.isPickable = false;
        west.layerMask = 1;
        // west.type = "main";
        west.lookAt(Vector3.Zero());
    }

    onClick(e): number {
        let pickResult = this._scene.pick(e.clientX, e.clientY, null, null, this._camera);
        if (pickResult.hit) {
            return parseInt(pickResult.pickedMesh.id);
        }
    }
}

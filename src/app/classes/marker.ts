import { Point } from './point';
import { Vector3, Mesh, Color3, Scene } from 'babylonjs';

export class Marker {
    private _location: Point;
    private _img: string;
    private _name: String;
    private _desc: String;
    private _id: number;
    private _minimapMesh: Mesh;
    private _markerMesh: Mesh;

    constructor(id: number, point: Point, name: String, desc: String, img: string) {

        this._id = (id === undefined) ? 0 : Number(id);
        this._desc = (desc === undefined) ? "Default desc" : String(desc);
        this._name = (name === undefined) ? "Default title" : String(name);
        this._img = "assets/imgs/" + img;

    }

    miniMapMarker(scene: Scene, device: Point) {
        this._minimapMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 3
        }, scene);
        let position = this._location.relativeLatLonTo(device);

        this._markerMesh.position = new Vector3(position.latitude(), position.longitude(), position.altitude());

        this._minimapMesh.position.y = 1;

        // apply material
        let material = new BABYLON.StandardMaterial("minimaterial", scene);
        material.emissiveColor = Color3.White();
        this._minimapMesh.material = material

        // set to minimap camera
        this._minimapMesh.layerMask = 1;
        this._minimapMesh.isPickable = false;

    }

    pointMarker(scene: Scene, device: Point) {
        let texture = new BABYLON.Texture(this._img, scene)
        let material = new BABYLON.StandardMaterial("mainmaterial", scene);

        material.opacityTexture = texture; // transparency
        material.emissiveTexture = texture; // texture
        material.backFaceCulling = true; // don't need the back

        this._markerMesh = BABYLON.MeshBuilder.CreatePlane("box", {
            width: 2,
            height: 1
        }, scene);

        this._markerMesh.layerMask = 1;

        // direction to point from device
        var bearing = device.bearingTo(this._location);

        // get a Device coord along the bearing at 900 units
        var p = this._location.getlocationAtDistanceFrom(device, 900, bearing);

        // location to world
        let position = p.relativeLatLonTo(device);

        // apply new position
        this._markerMesh.position = new Vector3(position.latitude(), position.longitude(), position.altitude());

        // prevent meshes overlapping
        this._markerMesh.position.y = 1;

        // apply material
        this._markerMesh.material = material;

        // face the camera
        this._markerMesh.lookAt(Vector3.Zero());

    }
}

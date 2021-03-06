import { Point } from './point';
import { Vector3, Mesh, Color3, Scene, StandardMaterial, Texture } from 'babylonjs';

export class Marker {

    private _minimapMesh: Mesh;
    private _markerMesh: Mesh;
    public dist: string;

    constructor(public id: number, public location: Point, public name: String, public desc: String, public img: string, public device: Point) {

        this.id = (id === undefined) ? 0 : Number(id);
        this.desc = (desc === undefined) ? "Default desc" : String(desc);
        this.name = (name === undefined) ? "Default title" : String(name);
        this.img = "assets/imgs/" + img;
        this.distance();
    }

    distance() {
        let d = this.location.distanceTo(this.device);
        this.dist = "ここから: " + (d < 1000 ? Math.floor(d) + " m" : Math.round((d / 1000) * 100) / 100 + " Km");
    }

    miniMapMarker(scene: Scene, device: Point) {
        this._minimapMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 3
        }, scene);
        let position = this.location.relativeLatLonTo(device);

        this._markerMesh.position = new Vector3(position.latitude(), position.longitude(), position.altitude());

        this._minimapMesh.position.y = 1;

        // apply material
        let material = new StandardMaterial("minimaterial", scene);
        material.emissiveColor = Color3.White();
        this._minimapMesh.material = material

        // set to minimap camera
        this._minimapMesh.layerMask = 1;
        this._minimapMesh.isPickable = false;

    }

    pointMarker(scene: Scene, device: Point) {
        let texture = new Texture(this.img, scene)
        let material = new StandardMaterial("mainmaterial", scene);

        material.opacityTexture = texture; // transparency
        material.emissiveTexture = texture; // texture
        material.backFaceCulling = true; // don't need the back

        this._markerMesh = BABYLON.MeshBuilder.CreatePlane("box", {
            width: 2,
            height: 1
        }, scene);

        this._markerMesh.layerMask = 1;

        // direction to point from device
        var bearing = device.bearingTo(this.location);

        // get a Device coord along the bearing at 900 units
        var p = this.location.getlocationAtDistanceFrom(device, 900, bearing);

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

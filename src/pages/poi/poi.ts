import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationsProvider } from '../../providers/locations/locations';
import { Point } from '../../app/classes/point';
import { Marker } from '../../app/classes/marker';
import { DeviceProvider } from '../../providers/device/device';
import { CameraInputTypes } from 'babylonjs';
import { Platform } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
// import { AndroidPermissions } from '@ionic-native/android-permissions';
// import { CameraPreview } from '@ionic-native/camera-preview';

/**
 * Generated class for the PoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var CameraPreview: any;

@IonicPage()
@Component({
    selector: 'page-poi',
    templateUrl: 'poi.html',
})

export class PoiPage implements AfterViewInit {

    private _markers: Marker[] = [];
    private _game: GameProvider;

    public getWidth: number;
    public getHeight: number;
    public cameraPreview;
    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        private screenOrientation: ScreenOrientation,
        private locations: LocationsProvider,
        private platform: Platform,
        // public cameraPreview: CameraPreview,
        public device: DeviceProvider) {

        this.cameraPreview = CameraPreview;
    }

    ionViewWillEnter() :void{

        // start camera
        this.startCamera();

        //
        document.getElementById('renderCanvas').addEventListener('click', this.click.bind(this), true);

        window.addEventListener('orientationchange', this.resize.bind(this), false);
    }

    ionViewCanLeave() :void{

        // stop the camera 
        this.stopCamera();

        // remove the event listener 
        document.getElementById('renderCanvas').removeEventListener('click', this.click, true);

        window.addEventListener('orientationchange', this.resize, false);
    }

    ngAfterViewInit() :void{
        
        this._game = new GameProvider('renderCanvas');
        this._game.createScene();
        
        for (var i = 0; i < this.locations.locations.length; ++i) {
            let position = new Point(
                Number(this.locations.locations[i].latitude),
                Number(this.locations.locations[i].longitude),
                0);
            let marker = new Marker(
                Number(this.locations.locations[i].id),
                position,
                this.locations.locations[i].name,
                this.locations.locations[i].description,
                this.locations.locations[i].img,
                this.device.location);
            this._markers.push(marker);
        }

        // add minimap
        this._game.minimap(200);

        // add cardinal markers
        this._game.cardinals();

        for (var n = 0; n < this._markers.length; ++n) {
            this._game.addNameMarker(this._markers[n], this.device);
            this._game.addMinimapMarker(this._markers[n], this.device);
        }
    }

    calibrateTo(direction: string): void {
        this._game.resetToNewYRotation(direction);
    }

    stopCamera():void {
            // this.cameraPreview.hide();
            this.cameraPreview.stopCamera();
    }

    startCamera() :void{
            this.cameraPreview.startCamera({
                x: 0,
                y: 0,
                width: window.screen.width,
                height: window.screen.height,
                toBack: true,
                camera: 'rear',
                previewDrag: false,
                tapPhoto: false
            });
            // this.cameraPreview.show();
    }

    resize() :void{
        this.stopCamera();
        this._game.resize();
        this.startCamera();
    }

    click(e) :void{
        let pickResult = this._game.onClick(e);

        // find the marker with the correct id 
        let picked = this._markers.find((x) => x.id === pickResult);
        if (picked) {
            this.openModal(picked);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    openModal(data: any): void {
        let modal = this.modalCtrl.create(ModalPage, { 'name': data.name, 'desc': data.desc, 'dist': data.dist });
        modal.present().then((resp) => { console.log(resp) }).catch((error) => { console.log(error) });
    }
}

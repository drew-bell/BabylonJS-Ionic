import { Component, AfterViewInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationsProvider } from '../../providers/locations/locations';
import { Point } from '../../app/classes/point';
import { Marker } from '../../app/classes/marker';
import { DeviceProvider } from '../../providers/device/device';
import { CameraInputTypes } from 'babylonjs';


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
    public calcWidth: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private screenOrientation: ScreenOrientation,
        private locations: LocationsProvider,
        public device: DeviceProvider, private zone: NgZone) {

        // allow rotation
        this.screenOrientation.unlock();

        this.zone.run(() => {
            this.getWidth = window.innerWidth;
            this.getHeight = window.innerHeight;
        });       
    }
    
    ionViewWillEnter(){
        this.startCamera();
        document.addEventListener('click',(e)=> {
            let pickResult = this._game.onClick(e);
            console.log("click *******************: "+pickResult);
        });        
    }
    
    ionViewWillUnload(){
        this.stopCamera();               
    }
    
    resize(){
        this.stopCamera();
        this._game.resize();
        this.startCamera();
    }

    ngAfterViewInit() {
         window.addEventListener('orientationchange', this.resize.bind(this), false);
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
                this.locations.locations[i].img);
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

        // this._game.animate();
    }

    calibrateTo(direction: string): void {
        console.log(direction);
        this._game.resetToNewYRotation(direction);
    }

    stopCamera(){
        CameraPreview.stopCamera();
    }

    startCamera() {
        CameraPreview.startCamera({
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            toBack: true,
            camera: 'rear',
            previewDrag: false,
            tapPhoto: false
        });
    }
}

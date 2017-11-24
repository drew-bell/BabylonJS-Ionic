import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationsProvider } from '../../providers/locations/locations';
import { Point } from '../../app/classes/point';
import { Marker } from '../../app/classes/marker';
import { DeviceProvider } from '../../providers/device/device';
/**
 * Generated class for the PoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-poi',
    templateUrl: 'poi.html',
})

export class PoiPage implements AfterViewInit {

    private _markers: Marker[] = [];
    private _game: GameProvider;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private screenOrientation: ScreenOrientation,
        private locations: LocationsProvider, 
        public device: DeviceProvider) {

        // allow rotation
        this.screenOrientation.unlock();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PointsPage');
    }

    ngAfterViewInit() {
        this._game = new GameProvider('renderCanvas');
        this._game.createScene();
        // this._game.addLight();

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

        this._game.minimap(200);

        for (var n = 0; n < this._markers.length; ++n) {
            this._game.addNameMarker(this._markers[n],this.device);
            this._game.addMinimapMarker(this._markers[n], this.device);
        }

        this._game.animate();
    }
}

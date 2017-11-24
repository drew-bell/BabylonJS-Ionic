import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Game } from '../../app/classes/game';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocationsProvider } from '../../providers/locations/locations';
import { Marker } from '../../app/classes/marker';
import { Point } from '../../app/classes/point';
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

    private _game: Game;
    private _markers: Marker[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private locations: LocationsProvider) {

        // allow rotation
        this.screenOrientation.unlock();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PointsPage');
    }

    ngAfterViewInit() {
        this._game = new Game('renderCanvas');
        this._game.createScene();

        for (var i = 0; i < this.locations.locations.length; ++i) {
            let position = new Point(
                Number(this.locations.locations[i].latitude),
                Number(this.locations.locations[i].longitude),
                0);
            let marker = new Marker(Number(this.locations.locations[i].id),
                this.locations.locations[i].);
            this._markers.push(marker);
        }
        this._game.animate();
    }
}

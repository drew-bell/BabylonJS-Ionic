import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PointsPage } from '../points/points';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public plt: Platform) {

        // lock rotation on supported platforms
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(result => console.log(result)).catch(error => console.log(error));

    }

    // navigate to page
    points(event, item) {
        this.navCtrl.push(PointsPage);
    }
}

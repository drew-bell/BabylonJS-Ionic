import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';
import { MainPage } from '../main/main';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public plt: Platform) {
        // lock rotation on supported platforms
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(result => console.log(result)).catch(error => console.log(error.message));
    }

    ionViewWillEnter() {
        if (this.plt.is("android")) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(result => console.log(result)).catch(error => console.log(error.message));
        }
        setTimeout(() => {
            this.navCtrl.push(MainPage);
            this.navCtrl.setRoot(MainPage);
        }, 3000);
    }

    ionViewWillLeave() {
        if (this.plt.is("android")) {
            this.screenOrientation.unlock();
        }
    }
}

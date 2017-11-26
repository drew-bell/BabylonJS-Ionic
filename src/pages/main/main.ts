import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PoiPage } from '../poi/poi';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-main',
    templateUrl: 'main.html',
})
export class MainPage {

    constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public plt: Platform) {
        // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(result => console.log(result)).catch(error => console.log(error.message));
    }

    points(event, item) {
        this.navCtrl.push(PoiPage);
    }
    ionViewWillEnter() { 
        if (this.plt.is("android")) { 
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(result => console.log(result)).catch(error => console.log(error.message)); 
        } 
    } 
 
    ionViewWillLeave() { 
        if (this.plt.is("android")) { 
            this.screenOrientation.unlock(); 
        } 
    } 
}

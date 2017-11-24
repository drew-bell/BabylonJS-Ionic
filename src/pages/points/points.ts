import { Component ,AfterViewInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Game } from '../../app/classes/game';

/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage implements AfterViewInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsPage');
  }

  ngAfterViewInit() {
    let game = new Game('renderCanvas');
    game.createScene();
    game.animate();
  }
}

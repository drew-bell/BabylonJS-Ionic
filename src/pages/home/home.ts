import { Component,AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Game } from '../../app/classes/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements AfterViewInit {

  constructor(public navCtrl: NavController) {

  }
  
  ngAfterViewInit() {
    let game = new Game('renderCanvas');
    game.createScene();
    game.animate();
  }
}

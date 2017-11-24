import { Component,AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PointsPage } from '../points/points';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  points(event, item) {
      this.navCtrl.push(PointsPage);
  }
}

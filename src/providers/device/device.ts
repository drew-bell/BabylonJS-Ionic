import {Point} from '../../app/classes/point';
import { Injectable } from '@angular/core';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  constructor(private location:Point) {
    console.log('Hello DeviceProvider Provider');
  }

}

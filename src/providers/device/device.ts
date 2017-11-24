import { Point } from '../../app/classes/point';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

    // gps of JRTower
    private _JRTower: Point = new Point(43.068333, 141.351111, 0);
    private _locationsub;

    constructor(private _location: Point, private geolocation: Geolocation) {
        console.log('Hello DeviceProvider Provider');
        this.geolocation.getCurrentPosition().then((position) => {
            if (Math.abs(position.coords.latitude - this._JRTower.latitude()) > 0.0003
                || Math.abs(position.coords.longitude - this._JRTower.longitude()) > 0.0003) {
                this._location = this._JRTower;
            } else {
                this._location = new Point(position.coords.latitude, position.coords.longitude, position.coords.altitude);
            }
        }).catch((error) => {
            console.log('Error getting location', error);
        });


        this._locationsub = this.geolocation.watchPosition()
            .subscribe(position => {

                if (Math.abs(position.coords.latitude - this._JRTower.latitude()) > 0.0003
                    || Math.abs(position.coords.longitude - this._JRTower.longitude()) > 0.0003) {
                    return;
                } else if (Math.abs(position.coords.latitude - this._location.latitude()) < 0.0001
                    || Math.abs(position.coords.longitude - this._location.longitude()) < 0.0001) {
                    return;
                }

                this._location.latitude(position.coords.latitude);
                this._location.longitude(position.coords.longitude);
                this._location.altitude(position.coords.altitude);
                console.log(position.coords.longitude + ' ' + position.coords.latitude);
            });
    }

}

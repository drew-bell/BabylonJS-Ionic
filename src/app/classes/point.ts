import { Vector3 } from 'babylonjs';

/**
 * GPS coordinates
 */
export class Point {

    private scale: number = 1000;

    constructor(
        private _latitude?: number,
        private _longitude?: number,
        private _altitude?: number) {

        // 0 values if undefined
        this._latitude = (_latitude === undefined) ? 0 : _latitude;
        this._longitude = (_longitude === undefined) ? 0 : _longitude;
        this._altitude = (_altitude === undefined) ? 0 : _altitude;
    }

	/**
	 * @returns latitude of point
	 */
    latitude(latitude?: number): number {
        if (latitude === undefined) {
            return this._latitude;
        } else {
            this._latitude = latitude;
        }
    }

	/**
	 * @returns longitude of point
	 */
    longitude(longitude?: number): number {
        if (longitude === undefined) {
            return this._longitude;
        } else {
            this._longitude = longitude;
        }
    }

	/**
	 * @returns altitude of point
	 */
    altitude(altitude?: number): number {
        if (altitude === undefined) {
            return this._altitude;
        } else {
            this._altitude = altitude;
        }
    }

	/**
	 * GPS coordinate relative to supplied point
	 * @param device : Point
	 * @returns Point (relative gps coordinate)
	 */
    relativeLatLonTo(device: Point): Point {
        let lat = this.scale * (this._latitude - device.latitude());
        let lon = this.scale * (this._longitude - device.longitude());
        return new Point(lat, this._altitude, lon);
    }

	/**
	 * get the distance between 2 gps coordinates on the earth
	 * @param point
	 * @returns number in meters
	 */
    distanceTo(point): number {
        let R = 6371e3;

        let lat1 = this.toRadians(this.latitude());
        let lon1 = this.toRadians(this.longitude());

        let lat2 = this.toRadians(point.latitude());
        let lon2 = this.toRadians(point.longitude());

        let deltalat = lat2 - lat1;
        let deltalon = lon2 - lon1;

        let a = Math.sin(deltalat / 2) * Math.sin(deltalat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltalon / 2) * Math.sin(deltalon / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;

    }

	/**
	 * Convert to Degrees from Radians
	 * @param num
	 * @returns degrees
	 */
    toDegrees(num) {
        return num * 180 / Math.PI;
    }

	/**
	 * Convert to radians from degrees
	 * @param num
	 * @returns radians
	 */
    toRadians(num) {
        return num * Math.PI / 180;
    }

    // bearing toward point from this
    bearingTo(point) {

        let lat1 = this.toRadians(this.latitude());
        let lat2 = this.toRadians(point.latitude());

        let deltalon = this.toRadians(point.longitude() - this.longitude());

        let y = Math.sin(deltalon) * Math.cos(lat2);
        let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltalon);

        let bng = this.toDegrees(Math.atan2(y, x));

        //normalised to compass
        return (bng + 360) % 360;
    }
    getlocationAtDistanceFrom(point: Point, distance: number, bearing: number): Point {
        return new Point();
    }
}

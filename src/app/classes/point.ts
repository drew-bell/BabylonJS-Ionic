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
	latitude() {
		return this._latitude;
	}

	/**
	 * @returns longitude of point
	 */
	longitude() {
		return this._longitude;
	}

	/**
	 * @returns altitude of point
	 */
	altitude() {
		return this._altitude;
	}

	/**
	 * GPS coordinate relative to supplied point
	 * @param device : Point
	 * @returns Point (relative gps coordinate)
	 */
	relativeTo(device: Point): Point {
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
		var R = 6371e3;
		var lat1 = this.toRadians(this.latitude()),
			lon1 = this.toRadians(this.longitude());
		var lat2 = this.toRadians(point.latitude()),
			lon2 = this.toRadians(point.longitude());
		var deltalat = lat2 - lat1;
		var deltalon = lon2 - lon1;

		var a = Math.sin(deltalat / 2) * Math.sin(deltalat / 2) +
			Math.cos(lat1) * Math.cos(lat2) *
			Math.sin(deltalon / 2) * Math.sin(deltalon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;

		return d;
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
}

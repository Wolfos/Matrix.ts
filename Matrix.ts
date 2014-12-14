/* 
	Matrix.ts
	Author:		Robin van Ee
	Date:		14-12-2014
	License:	Apache license 2.0

	Code ported from examples by WebGL Academy and Wikipedia
*/
class Matrix {
	public values: number[];

	// Creates a new identity matrix
	public constructor() {
		this.SetIdentity();
	}

	// Set the matrix to an identity matrix
	public SetIdentity() : void {
		this.values = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}

	// Converts degrees to radians
	public DegToRad(angle) : number {
		return (angle * Math.PI / 180);
	}

	// Sets a perspective projection matrix
	public SetPerspective(angle: number, aspect: number, zMin: number, zMax: number) : void {
		var tan = Math.tan(this.DegToRad(angle / 2));
		var A = -(zMax + zMin) / (zMax - zMin);
		var B = (-2 * zMax * zMin) / (zMax - zMin);

		this.values = [
			0.5 / tan, 0, 0, 0,
			0, 0.5 * aspect / tan, 0, 0,
			0, 0, A, -1,
			0, 0, B, 0
		];
	}

	// Sets an orthographic projection matrix
	public SetOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) : void {
		this.values = [
			2 / (right - left), 0, 0, 0,
			0, 2 / (top - bottom), 0, 0,
			0, 0, -2 / (far - near), 0,
			0, 0, 0, 1
		];
	}

	// Rotates the matrix on the X axis
	public XRotate(angle: number) : void {
		if (!this.values) this.SetIdentity();

		var cos = Math.cos(angle);
		var sine = Math.sin(angle);

		var v1 = this.values[1];
		var v5 = this.values[5];
		var v9 = this.values[9];

		this.values[1] = this.values[1] * cos - this.values[2] * sine;
		this.values[5] = this.values[5] * cos - this.values[6] * sine;
		this.values[9] = this.values[9] * cos - this.values[10] * sine;

		this.values[2] = this.values[2] * cos + v1 * sine;
		this.values[6] = this.values[6] * cos + v5 * sine;
		this.values[10] = this.values[10] * cos + v9 * sine;
	}

	// Rotates the matrix on the Y axis
	public YRotate(angle: number): void {
		if (!this.values) this.SetIdentity();

		var cos = Math.cos(angle);
		var sine = Math.sin(angle);

		var v0 = this.values[0];
		var v4 = this.values[4];
		var v8 = this.values[8];

		this.values[0] = cos * this.values[0] + sine * this.values[2];
		this.values[4] = cos * this.values[4] + sine * this.values[6];
		this.values[8] = cos * this.values[8] + sine * this.values[10];

		this.values[2] = cos * this.values[2] - sine * v0;
		this.values[6] = cos * this.values[6] - sine * v4;
		this.values[10] = cos * this.values[10] - sine * v8;
	}

	// Rotates the matrix on the Z axis
	public ZRotate(angle: number): void {
		if (!this.values) this.SetIdentity();

		var cos = Math.cos(angle);
		var sine = Math.sin(angle);

		var v0 = this.values[0];
		var v4 = this.values[4];
		var v8 = this.values[8];

		this.values[0] = cos * this.values[0] - sine * this.values[1];
		this.values[4] = cos * this.values[4] - sine * this.values[5];
		this.values[8] = cos * this.values[8] - sine * this.values[9];

		this.values[1] = cos * this.values[1] + sine * v0;
		this.values[5] = cos * this.values[5] + sine * v4;
		this.values[9] = cos * this.values[9] + sine * v8;
	}

	// Translate by amount on the X axis
	public XTranslate(amount: number) {
		this.values[12] += amount;
	}

	// Translate by amount on the Y axis
	public YTranslate(amount: number) {
		this.values[13] += amount;
	}

	// Translate by amount on the Z axis
	public ZTranslate(amount: number) {
		this.values[14] += amount;
	}
} 

import { Direction } from "./interfaces";

// import * as PIXI from 'pixi.js'
// window.PIXI = PIXI

// declare global {
// 	interface Window {
// 		PIXI: any
// 	}
// }

export const angle = (x: number, y: number) => {
	return degrees(Math.atan2(y, x));
};

export const degrees = (a: number) => {
	return a * (180 / Math.PI);
};

export const direction = (x: number, y: number):Direction => {
	const rAngle = angle(x, y)
	const angle45 = 45

	const mx = Math.abs(x) >= 1 ? 1 : x
	const my = Math.abs(y) >= 1 ? 1 : y

	let direction:'up' | 'down' | 'left' | 'right'

	if (
		rAngle > angle45 &&
		rAngle < (angle45 * 3)
	) {
		direction = 'down';
	} else if (
		rAngle > -angle45 &&
		rAngle <= angle45
	) {
		direction = 'right';
	} else if (
		rAngle > (-angle45 * 3) &&
		rAngle <= -angle45
	) {
		direction = 'up';
	} else {
		direction = 'left';
	}
	return {
		direction,
		xForse: mx,
		yForse: my
	}
}

// declare var require: any

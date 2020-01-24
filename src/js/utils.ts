import * as PIXI from 'pixi.js'
window.PIXI = PIXI

declare global {
	interface Window { 
		PIXI: any
	}
}

// declare var require: any

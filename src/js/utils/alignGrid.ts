import * as PIXI from 'pixi.js'
import { App, Joy } from "../interfaces";

interface Config {
	rows: number
	cols: number
	height?: number
	width?: number
}

export default class AlignGrid {
	app: App
	config: Config
	boxWidth: number
	boxHeight: number
	graphics?: PIXI.Graphics

	constructor(app: App, config: Config) {
		this.app = app

		if (!config.cols) {
			config.cols = 5
		}
		if (!config.rows) {
			config.rows = 5
		}
		if (!config.height) {
			config.height = app.screen.height
		}
		if (!config.width) {
			config.width = app.screen.width
		}

		this.boxWidth = config.width / config.cols;
		this.boxHeight = config.height / config.rows

		this.config = config

	}

	show() {
		this.graphics = new PIXI.Graphics
		this.graphics.lineStyle(2, 0xff0000, 1)

		for (let i = 0; i < this.config.width!; i += this.boxWidth) {
			this.graphics.moveTo(i, 0)
				.lineTo(i, this.config.height!)
		}

		for (let i = 0; i < this.config.height!; i += this.boxHeight) {
			this.graphics
				.moveTo(0, i)
				.lineTo(this.config.width!, i)
		}

		this.app.stage.addChild(this.graphics)

		return this
	}

	placeAtIndex(index:number, gameObject: any) {
		const y = Math.floor(index / this.config.cols);
		const x = index - (y * this.config.cols);

		this.placeByCoord(x, y, gameObject);
	}

	placeByCoord(xx: number, yy: number, gameObject: PIXI.Container) {
		const x = this.boxWidth * xx + this.boxWidth / 2;
		const y = this.boxHeight * yy + this.boxHeight / 2;

		gameObject.x = x;
		gameObject.y = y;
	}

	showNumbers() {
		let count = 0

		for (let col = 0; col < this.config.cols; col++) {
			for (let row = 0; row < this.config.rows; row++) {
				const textNumber = new PIXI.Text(count.toString(), 
					new PIXI.TextStyle({
						fontSize: 36,
						fill: ['#ffffff', '#00ff99']
					})
				)
				textNumber.anchor.set(.5)

				this.placeAtIndex(count, textNumber)

				this.app.stage.addChild(textNumber)

				count++
			}
		}

		return this
	}

}
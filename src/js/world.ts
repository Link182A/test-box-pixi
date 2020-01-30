import * as PIXI from 'pixi.js'
import Building from './entities/buildings'
import { App } from './interfaces';

export default class World extends PIXI.Container {
	app: App;

	constructor(app: App) {
		super();
		this.app = app
		app.stage.on('loaded', () => {
			this.populate()
			app.stage.addChild(this)
		})
	}

	populate() {
		for (let row = 0; row < 17; row++) {
			for (let col = 0; col < 17; col++) {
				if ((row + col) % 2 === 1) {
					continue
				}

				const img = new Building(this.app.visual.buildings[row % 3], this.app)

				img.x = (col + 1) * img.width / 2
				img.y = (row + 1) * img.height / 2.4

				this.addChild(img)
			}

		}



		// for (let i = 0; i < 25; i++) {
		// 	const img = new Building(this.app.visual.buildings[i % 3], this.app)

		// 	img.x = (i % 5 + 1) * img.width
		// 	img.y = Math.floor(i / 5 + 1) * img.height

		// 	this.addChild(img)
		// }
	}
}

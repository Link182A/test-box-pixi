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
		for (let i = 0; i < 25; i++) {
			const img = new Building(this.app.visual.buildings[i % 3], this.app)
			
			img.x = (i % 5 + 1) * img.width
			img.y = Math.floor(i / 5 + 1) * img.height
			
			this.addChild(img)
		}
	}
}

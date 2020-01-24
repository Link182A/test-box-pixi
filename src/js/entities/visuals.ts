// import * as PIXI from 'pixi.js'
import { App } from '../interfaces'

export default class VisualModels {
	app: App
	constructor(app: App) {
		this.app = app
		app.stage.on('loaded', () => {
			this.createModels()
		})
	}

	createModels() {
		const resources = this.app.loader!.resources

		Object.assign(this, {
			building1: {
				texture: resources['water1'].texture
			},
			building2: {
				texture: resources['water2'].texture
			},
			building3: {
				texture: resources['water3'].texture
			}
		})
		this.buildings = [this.building1,this.building2,this.building3]
	}
}
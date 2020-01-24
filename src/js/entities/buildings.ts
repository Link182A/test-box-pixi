import * as PIXI from 'pixi.js'
import { App, Visual } from '../interfaces'

export default class Building extends PIXI.Container {
	sprite: PIXI.Sprite
	phase: number
	app: App
	constructor(visualModel: Visual, app: App) {
		super()

		this.app = app
		this.sprite = new PIXI.Sprite(visualModel.texture)
		this.addChild(this.sprite)
		this.phase = Math.random()

		app.ticker.add((delta: number) => {
			this.update(delta)
		})
	}

	update(delta: number) {
		this.phase += delta * 0.1
		this.phase %= 2.0
		const par:number = this.phase - 1
		this.sprite.y = -50 * (1 - par * par)
	}
}

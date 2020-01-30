import * as PIXI from 'pixi.js'
import { App, Visual } from '../interfaces'

const labelStyle = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 14,
})

const names:Array<string> = [
	'name1',
	'name2',
	'name3',
	'name4',
]

export default class Building extends PIXI.Container {
	sprite: PIXI.Sprite
	phase: number
	app: App
	label: PIXI.Text
	constructor(visualModel: Visual, app: App) {
		super()

		this.app = app
		this.sprite = new PIXI.Sprite(visualModel.texture)
		this.addChild(this.sprite)
		this.phase = 10*Math.random()

		this.label = new PIXI.Text(names[Math.random()*names.length|0],labelStyle)
		
		// this.label.anchor.set(0.5, 1.0)
		// this.label.zIndex = 1
		this.addChild(this.label)

		app.ticker.add((delta: number) => {
			this.update(delta)
		})
	}

	update(delta: number) {
		this.phase += delta * 0.1
		this.phase %= 10.0
		this.sprite.y = 0
		if(this.phase<2.0){
			const par:number = this.phase - 1
			this.sprite.y = -50 * (1 - par * par)
		}
	}
}

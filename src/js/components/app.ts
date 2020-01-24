import * as PIXI from 'pixi.js'
import { App } from '../interfaces'

export class Application implements App {
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container

	constructor() {
		this.renderer = new PIXI.Renderer({
			width: window.innerWidth,
			height: window.innerHeight,
			resolution: 1
		})

		document.body.appendChild(this.renderer.view)

		this.ticker = new PIXI.Ticker()
		this.stage = new PIXI.Container()
		this.ticker.add(
			this.render.bind(this),
			PIXI.UPDATE_PRIORITY.LOW
		)
		this.ticker.start()
	}

	get screen(){
		return this.renderer.screen
	}

	render() {
		this.renderer.render(this.stage)
	}
}
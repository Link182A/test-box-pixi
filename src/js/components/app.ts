import * as PIXI from 'pixi.js'
import { App, Joy } from '../interfaces'
import Joystick from './joystick'

window.PIXI = PIXI

class Application implements App {
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container
	joy: Joy
	constructor() {
		const container = document.getElementById('gameContainer')!;

		this.renderer = new PIXI.Renderer({
			width: container.offsetWidth,
			height: container.offsetHeight,
			antialias: true,
			resolution: 1
		})

		container.appendChild(this.renderer.view)

		this.ticker = new PIXI.Ticker()
		this.stage = new PIXI.Container()
		this.ticker.add(
			this.render.bind(this),
			PIXI.UPDATE_PRIORITY.LOW
		)
		this.ticker.start()

		this.joy = new Joystick(this)

		window.addEventListener('resize', ()=>{
			this.changeSize(container.offsetWidth, container.offsetHeight)
		})
	}

	get screen() {
		return this.renderer.screen
	}

	changeSize( width:number, height:number ): void {
		this.renderer.view.style.width = width + 'px'
		this.renderer.view.style.height = height + 'px'
	}

	render() {
		this.renderer.render(this.stage)
		// console.log(this.joy.directionData);
		
	}
}

export default new Application
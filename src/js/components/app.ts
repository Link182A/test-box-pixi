import * as PIXI from 'pixi.js'
import { App, Joy, JoystickOptions } from '../interfaces'
import Joystick from './joystick'
import AlignGrid from '../utils/alignGrid'

window.PIXI = PIXI

class Application implements App {
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container
	joy: Joy
	container: HTMLElement
	constructor() {
		this.container = document.getElementById('gameContainer')!;

		this.renderer = new PIXI.Renderer({
			width: this.container.clientWidth,
			height: this.container.clientHeight,
			antialias: true,
			resolution: 1
		})

		this.container.appendChild(this.renderer.view)

		this.ticker = new PIXI.Ticker()
		this.stage = new PIXI.Container()
		this.ticker.add(
			this.render.bind(this),
			PIXI.UPDATE_PRIORITY.LOW
		)
		this.ticker.start()

		this.joy = new Joystick(this, this.joystickOptions())

		window.addEventListener('resize', () => {
			this.changeSize()
		})

		const gridConfig = {
			rows: 5,
			cols: 10
		}
		const grid =  new AlignGrid(this, gridConfig)
			.show()
			.showNumbers()
			.placeAtIndex(31, this.joy)
	}

	get screen(): PIXI.Rectangle {
		return this.renderer.screen
	}

	joystickOptions(): JoystickOptions {
		const radius = 70
		return {
			x: radius * 3,
			y: this.renderer.height - radius * 2.5,
			radius: radius
		}
	}

	changeSize(): void {
		const option = this.joystickOptions()

		this.renderer.resize(this.container.clientWidth, this.container.clientHeight)
		this.joy.position.set(option.x, option.y)
	}

	render() {
		this.renderer.render(this.stage)
		// console.log(this.joy.directionData);

	}
}

export default new Application
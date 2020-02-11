import * as PIXI from 'pixi.js'
import { App, Direction, Joy, JoystickOptions } from '../interfaces'
import { direction } from '../utils'

const resetDirection = {
	direction: null,
	xForse: 0,
	yForse: 0
}

export default class Joystick extends PIXI.Container implements Joy {
	app: App
	container: PIXI.Graphics
	nipple: PIXI.Graphics
	radius: number
	dragging: boolean
	data: null | PIXI.interaction.InteractionData
	directionData: Direction

	constructor(App: App, options: JoystickOptions) {
		super()

		this.app = App
		this.container = new PIXI.Graphics
		this.nipple = new PIXI.Graphics
		this.radius = options.radius || 70
		this.dragging = false
		this.data = null
		this.directionData = resetDirection

		// this.x = options.x || this.radius * 3
		// this.y = options.y || this.app.screen.height - (this.radius * 2.5)

		this.nipple
			// .lineStyle(2, 0xb2b2b2, 1)
			.beginFill(0xffffff, 1)
			.drawCircle(0, 0, this.radius / 2.5)
			.endFill()

		this.container
			// .lineStyle(2, 0xb2b2b2, 1)
			.beginFill(0xffffff, 1)
			.drawCircle(0, 0, this.radius)
			.endFill()
			.on('pointerdown', this.onDragStart.bind(this))
			.on('pointermove', this.setNippleCoordinates.bind(this))
			.on('pointerup', this.onDragEnd.bind(this))
			.on('pointerupoutside', this.onDragEnd.bind(this))
			.interactive = true

		this.container.alpha = .5
		this.container.addChild(this.nipple)

		this.addChild(this.container)
		this.app.stage.addChild(this)
	}

	setNippleCoordinates() {
		if (this.dragging && this.data) {

			const { x, y } = this.data.getLocalPosition(this.container)

			const scale = this.radius / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

			if (scale < 1) {
				this.nipple.x = Math.round(scale * x)
				this.nipple.y = Math.round(scale * y)
			} else {
				this.nipple.x = x
				this.nipple.y = y
			}
			this.directionData = direction(x / this.radius, y / this.radius)
		}
	}

	onDragStart(e: PIXI.interaction.InteractionEvent) {
		this.container.alpha = .75
		this.data = e.data
		this.dragging = true
		const { x, y } = this.data.getLocalPosition(this.container)
		this.nipple.x = x
		this.nipple.y = y
		this.directionData = direction(x / this.radius, y / this.radius)
	}

	onDragEnd() {
		this.container.alpha = .5
		this.nipple.x = 0
		this.nipple.y = 0
		this.data = null
		this.dragging = false
		this.directionData = resetDirection
	}
}
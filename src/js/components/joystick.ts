import * as PIXI from 'pixi.js'
import { App } from '../interfaces'

export default class Joystick extends PIXI.Container {
	app: App
	container: PIXI.Graphics
	nipple: PIXI.Graphics
	containerRadius: number
	dragging: boolean
	data: null | PIXI.interaction.InteractionData

	constructor(App: App) {
		super()
		this.app = App
		this.container = new PIXI.Graphics
		this.nipple = new PIXI.Graphics
		this.containerRadius = 70
		this.dragging = false
		this.data = null

		this.x = this.containerRadius * 3
		this.y = this.app.screen.height - (this.containerRadius * 2.5)

		this.nipple
			.lineStyle(2, 0xb2b2b2, 1)
			.beginFill(0x650A5A, 1)
			.drawCircle(0, 0, this.containerRadius / 3)
			.endFill()

		this.container
			.lineStyle(2, 0xb2b2b2, 1)
			.beginFill(0x650A5A, .5)
			.drawCircle(0, 0, this.containerRadius)
			.endFill()
			.on('pointerdown', this.onDragStart.bind(this))
			.on('pointermove', this.setNippleCoordinates.bind(this))
			.on('pointerup', this.onDragEnd.bind(this))
			.interactive = true

		this.container.addChild(this.nipple)

		this.addChild(this.container)
		this.app.stage.addChild(this)
	}

	setNippleCoordinates(e: PIXI.interaction.InteractionEvent) {
		if(this.dragging && this.data){
			const { x, y } = this.data.getLocalPosition(this.container)
			this.nipple.x = x
			this.nipple.y = y
		}
	}

	onDragStart(e: PIXI.interaction.InteractionEvent) {
		this.data = e.data;
		this.dragging = true;
		const { x, y } = this.data.getLocalPosition(this.container)
		this.nipple.x = x
		this.nipple.y = y
	}

	onDragEnd() {
		this.nipple.x = 0
		this.nipple.y = 0
		this.data = null;
		this.dragging = false;
	}
}
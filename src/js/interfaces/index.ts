export interface App {
	container: HTMLElement
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container
	screen: {
		width: number
		height: number
	}
	joy?: Joy
	joystickOptions(): JoystickOptions
	changeSize(width: number, height: number): void
	render(): void
}

export interface Direction {
	direction: 'up' | 'down' | 'left' | 'right' | null
	xForse: number
	yForse: number
}

export interface Joy {
	app: App
	container: PIXI.Graphics
	nipple: PIXI.Graphics
	radius: number
	dragging: boolean
	data: null | PIXI.interaction.InteractionData
	directionData: Direction
	position?: any
}

export interface JoystickOptions {
	x: number
	y: number
	radius: number
}
export interface App {
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container
	loader?: PIXI.Loader
	screen?: any
	world?: any
	visual?: any
	render(): void
}

export interface Visual {
	 texture: PIXI.Texture
}
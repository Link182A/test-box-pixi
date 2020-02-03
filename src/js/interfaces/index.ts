export interface App {
	renderer: PIXI.Renderer
	ticker: PIXI.Ticker
	stage: PIXI.Container
	screen: {
		width:number
		height:number
	}
	changeSize(width:number, height:number): void
	// loader?: PIXI.Loader
	// world?: any
	// visual?: any
	render(): void
}

// export interface Visual {
// 	 texture: PIXI.Texture
// }
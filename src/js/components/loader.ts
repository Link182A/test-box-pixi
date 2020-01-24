import * as PIXI from 'pixi.js'
import { App } from '../interfaces'


export default function Loader(app: App) {
	const loader: PIXI.Loader = new PIXI.Loader()
	let options = {
        crossOrigin: true
    };
	app.loader = loader

	loader
		.add('water1', require('../../assets/waterS.png'), options)
		.add('water2', require('../../assets/waterSW.png'), options)
		.add('water3', require('../../assets/waterW.png'), options)

	loader.load(() => {
		app.stage.emit('loaded')
		console.log('loaded');
		
	})

	loader.onError.add((e:ErrorEvent) => {
		console.log('error:', e);
	});
}
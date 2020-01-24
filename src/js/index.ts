import '../styles/index.scss'
import './utils'
import { App } from './interfaces'
import { Application } from './components/app'
import Loader from './components/loader'
import VisualModels from './entities/visuals'
import World from './world'

const app: App = new Application()
Loader(app)
app.visual = new VisualModels(app)


app.world = new World(app)

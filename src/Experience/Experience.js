import * as THREE from 'three'
import { Pane } from 'tweakpane'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Config from './Config.js'
import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Events from './Events.js'

import assets from './assets.js'

export default class Experience {
	static instance

	constructor(_options = {}) {
		this.setHtmlTimer('0%')

		if (Experience.instance) { return Experience.instance }
		Experience.instance = this

		// Options
		this.targetElement = _options.targetElement
		if (!this.targetElement) {
			console.warn('Missing \'targetElement\' property')
			return
		}
		this.config = new Config(this.targetElement)
		this.time = new Time()
		this.sizes = new Sizes()

		this.setDebug()
		this.setStats()
		this.setScene()
		this.setCamera()
		this.setRenderer()
		this.setResources()
		this.setLoader()
		this.setWorld()
		this.setRaycaster()
		this.setEvents()

		this.sizes.on('resize', () => {
			this.resize()
		})

		this.update()
	}

	setDebug() {
		if (this.config.debug) {
			this.debug = new Pane({
				title: 'Wait for the Website to Load',
				expanded: false
			})
			this.debug.containerElem_.style.width = '320px'
		}
		if (this.debug) {
			this.debug.worldFolder = this.debug.addFolder({ title: 'World' })
			this.debug.cameraFolder = this.debug.addFolder({ title: 'Camera' })
			this.debug.renderFolder = this.debug.addFolder({
				title: 'Post-Processing',
				expanded: false
			})
		}
	}

	setStats() {
		if (this.config.debug) this.stats = new Stats(true)
	}

	setScene() { this.scene = new THREE.Scene() }

	setCamera() { this.camera = new Camera() }

	setRenderer() {
		this.renderer = new Renderer({ rendererInstance: this.rendererInstance })
		this.targetElement.appendChild( this.renderer.instance.domElement )
	}

	setResources() { this.resources = new Resources(assets) }

	setHtmlTimer(value) { htmlLoaderTimer.innerHTML = value }
	setLoader() {
		this.resources.on('progress', (_progress) => {
			this.setHtmlTimer((Math.round(_progress.loaded / _progress.toLoad * 100)) + '%')
		})
		this.resources.on('end', (_progress) => {
			window.setTimeout(() => {
				this.config.html_loader.classList.add('unvisible')
				this.config.html_credits.classList.remove('unvisible')
				this.setHtmlTimer('')
				this.config.loaderIsHidden = true
				this.debug.title = 'Play With Me'
				this.debug.expanded = true
			}, 1000)
		})
	}

	setWorld() { this.world = new World() }

	setRaycaster() { this.raycaster = new THREE.Raycaster() }
	setEvents() { this.events = new Events() }

	update() {
		if (this.stats) this.stats.update()

		this.camera.update()

		if (this.world) this.world.update()
		if (this.renderer) this.renderer.update()
		if (this.events) this.events.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		// Config
		const boundings = this.targetElement.getBoundingClientRect()
		this.config.width = boundings.width
		this.config.height = boundings.height
		this.config.smallestSide = Math.min(this.config.width, this.config.height)
		this.config.largestSide = Math.max(this.config.width, this.config.height)

		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

		if (this.camera) this.camera.resize()
		if (this.renderer) this.renderer.resize()
		if (this.world) this.world.resize()
	}

	destroy() { }
}

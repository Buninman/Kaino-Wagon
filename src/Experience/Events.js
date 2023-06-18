import * as THREE from 'three'
import Experience from './Experience.js'

export default class Events {
	constructor(_options) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.camera = this.experience.camera
		this.config = this.experience.config
		this.world = this.experience.world
		this.raycaster = this.experience.raycaster
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		// this.setIKeyEvent()
		this.setLoaderViewer()
		this.setCursorPosition()
		this.setIconActiveEvent()
	}

	setIKeyEvent() {
		this.config.html_iKey.onmouseenter = () => {
			console.log('iKey enter');
		}
		this.config.html_iKey.onmouseleave = () => {
			console.log('iKey leave');
		}
		this.config.html_iKey.onclick = () => {
			console.log('iKey click');
		}
	}

	setLoaderViewer() {
		this.config.html_loaderKey.onclick = () => {
			if (this.config.loaderIsHidden) {
				this.config.html_loader.classList.remove('unvisible')
				this.config.loaderIsHidden = false
				this.debugMemory = this.debug.expanded
				this.debug.expanded = false
			} else {
				this.config.html_loader.classList.add('unvisible')
				this.config.loaderIsHidden = true
				if (this.debugMemory) {
					this.debug.expanded = true
				}
			}
		}
	}

	setCursorPosition() {
		this.cursorPosition = new THREE.Vector2()
		window.addEventListener('mousemove', (event) => {
			this.cursorPosition.x = event.clientX / this.sizes.width * 2 - 1
			this.cursorPosition.y = -(event.clientY / this.sizes.height * 2 - 1)
		}, { passive: true })
	}

	setIconActiveEvent() {
		window.addEventListener('click', () => {
			if (this.config.hoverTarget)
			{
				if (this.config.activeTarget) {
					this.world.informers[`${this.config.activeTarget}`].material.uniforms.uActiveMix.value = 1
				}
				this.config.activeTarget = this.config.hoverTarget

				this.world.informers[`${this.config.activeTarget}`].material.uniforms.uActiveMix.value = 0
				htmlInformer.innerHTML = this.config[`${this.config.activeTarget}`]
				this.config.html_textBlock.classList.add('visible')
				this.config.html_textBlock.classList.add('active')
			}

			if (!this.config.hoverTarget)
			{
				if (this.config.activeTarget) {
					this.world.informers[`${this.config.activeTarget}`].material.uniforms.uActiveMix.value = 1
					this.config.html_textBlock.classList.remove('visible')
					this.config.html_textBlock.classList.remove('active')

					this.config.activeTarget = null
				}
			}
		})
	}

	update() {
		if (this.config.loaderIsHidden) {
			this.raycaster.setFromCamera(this.cursorPosition, this.camera.instance)
			this.intersects = this.raycaster.intersectObjects(
				[
				this.world.informers.models,
				this.world.informers.targets,
				this.world.wagon.model.pack1,
				this.world.trees.model,
				this.world.portal.model,
				], true)

			if (this.intersects.length && this.intersects[0].object.name !== 'wagon')
			{
				this.config.hoverTarget = this.intersects[0].object.name

				this.world.informers[`${this.config.hoverTarget}`].material.uniforms.uActiveMix.value = 0

				if (!this.config.activeTarget) {
					htmlInformer.innerHTML = this.config[`${this.config.hoverTarget}`]
					this.config.html_textBlock.classList.add('visible')
				}
			}
			else
			{
				if (this.config.hoverTarget && this.config.hoverTarget !== this.config.activeTarget) {
					this.world.informers[`${this.config.hoverTarget}`].material.uniforms.uActiveMix.value = 1
				}

				if (!this.config.activeTarget) {
					this.config.html_textBlock.classList.remove('visible')
				}

				this.config.hoverTarget = null
			}

			// Activate portal
			if (this.intersects.length && this.intersects[0].object.name === 'icoGithub') {
				this.config.portalActive = true
			} else { this.config.portalActive = false }
		}
	}
}
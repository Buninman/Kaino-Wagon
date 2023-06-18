import * as THREE from 'three'
import Experience from './Experience.js'

import Helpers from './World/Helpers.js'
import Wagon from './World/Wagon.js'
import OwlEyes from './World/OwlEyes.js'
import Grass from './World/Grass.js'
import Trees from './World/Trees.js'
import Fire from './World/Fire.js'
import Portal from './World/Portal.js'
import Windows from './World/Windows.js'
import WordsShadow from './World/WordsShadow.js'
import GradientShadow from './World/GradientShadow.js'
import Fireflies from './World/Fireflies.js'
import Informers from './World/Informers.js'

export default class World {
	constructor(_options) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.config = this.experience.config
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		this.resources.on('groupEnd', (_group) => {
			if (_group.name === 'asset') {
				
				// this.setHelpers()
				
				this.setWagon()
				this.setOwlEyes()
				this.setGrass()
				this.setTrees()
				this.setFire()
				this.setPortal()
				this.setWindows()
				this.setWordsShadow()
				this.setGradientShadow()
				this.setFireflies()
				this.setInformers()
				this.addStar()
				
				this.addDebug()
			}
		})
	}

	setHelpers() { this.helpers = new Helpers() }
	setWagon() { this.wagon = new Wagon() }
	setOwlEyes() { this.owlEyes = new OwlEyes() }
	setGrass() { this.grass = new Grass() }
	setTrees() { this.trees = new Trees() }
	setFire() { this.fire = new Fire() }
	setPortal() { this.portal = new Portal() }
	setWindows() { this.windows = new Windows() }
	setWordsShadow() { this.wordsShadow = new WordsShadow() }
	setGradientShadow() { this.gradientShadow = new GradientShadow() }
	setFireflies() { this.fireflies = new Fireflies() }
	setInformers() { this.informers = new Informers() }

	addStar() {
		this.star = new THREE.Mesh(
			new THREE.SphereGeometry(0.1, 3, 3),
			new THREE.MeshBasicMaterial({ color: '#fff' }),
			)
		this.star.position.set(10, 7, 7)
		this.star.scale.set(0.3, 0.3, 0.3)

		this.scene.add(this.star)
	}

	update() {
		if (this.fireflies) this.fireflies.update()
		if (this.grass) this.grass.update()
		if (this.trees) this.trees.update()
		if (this.owlEyes) this.owlEyes.update()
		if (this.fire) this.fire.update()
		if (this.portal) this.portal.update()
		if (this.informers) this.informers.update()
	}

	addDebug() {
		if (this.debug) {

			this.debug.worldFolder
				.addInput(this.config, 'wireframe', { label: 'Wireframe' })
				.on('change', () => {
					for (const child of this.scene.children) {
						// console.log(child);
						if (child.material) {
							child.material.wireframe = this.config.wireframe
						}
					}
					for (const child of this.informers.models.children) {
						// console.log(child);
						if (child.material) {
							child.material.wireframe = this.config.wireframe
						}
					}
				})
			this.debug.worldFolder
				.addInput(this.config, 'neutral', { min: 0, max: 1, step: 0.1, label: 'Wagon' })
				.on('change', () => {
					this.wagon.model.pack1.material.uniforms.uNeutralMix.value = this.config.neutral
					this.wagon.model.pack2.material.uniforms.uNeutralMix.value = this.config.neutral
					this.trees.model.material.uniforms.uNeutralMix.value = this.config.neutral
					this.grass.model.material.uniforms.uNeutralMix.value = this.config.neutral
					this.owlEyes.model.material.uniforms.uNeutralMix.value = this.config.neutral
				})
			this.debug.worldFolder
				.addInput(this.config, 'neutral', { min: 0, max: 1, step: 0.1, label: 'Lights' })
				.on('change', () => {
					this.windows.model.material.uniforms.uNeutralMix.value = this.config.neutral
					this.fire.model.material.uniforms.uNeutralMix.value = this.config.neutral
					this.portal.model.material.uniforms.uNeutralMix.value = this.config.neutral
				})

			this.debug.worldFolder.addSeparator()

			this.debug.worldFolder
				.addInput(this.config, 'backgroundColor', { view: 'color', label: 'Background' })
				.on('change', () => {
					this.gradientShadow.model.material.uniforms.uColorBg.value.set(this.config.backgroundColor)
					this.experience.renderer.instance.setClearColor(this.config.backgroundColor, 1)
				})
			this.debug.worldFolder
				.addInput(this.config, 'backgroundColor', { view: 'color', label: 'Portal Inside' })
				.on('change', () => {
					this.portal.model.material.uniforms.uColorCenter.value.set(this.config.backgroundColor)
				})
			this.debug.worldFolder
				.addInput(this.config, 'lightColor', { view: 'color', label: 'Portal Outside' })
				.on('change', () => {
					this.portal.model.material.uniforms.uColorBorder.value.set(this.config.lightColor)
				})
			this.debug.worldFolder
				.addInput(this.config, 'lightColor', { view: 'color', label: 'Windows Light' })
				.on('change', () => {
					this.windows.model.material.uniforms.uColor.value.set(this.config.lightColor)
				})
			this.debug.worldFolder
				.addInput(this.config, 'firefliersColor', { view: 'color', label: 'Fireflies' })
				.on('change', () => {
					this.fireflies.model.material.uniforms.uColor.value.set(this.config.firefliersColor)
				})
			this.debug.worldFolder
				.addInput(this.config, 'fireColorUp', { view: 'color', label: 'Fire Top' })
				.on('change', () => {
					this.fire.model.material.uniforms.uColorUp.value.set(this.config.fireColorUp)
				})
			this.debug.worldFolder
				.addInput(this.config, 'fireColorDown', { view: 'color', label: 'Fire Bottom' })
				.on('change', () => {
					this.fire.model.material.uniforms.uColorDown.value.set(this.config.fireColorDown)
				})
			this.debug.worldFolder
				.addInput(this.config, 'shadowColor', { view: 'color', label: 'Shadow' })
				.on('change', () => {
					this.gradientShadow.model.material.uniforms.uColorShadow.value.set(this.config.shadowColor)
				})
			this.debug.worldFolder
				.addInput(this.config, 'wordsShadowColor', { view: 'color', label: 'Text Shadow' })
				.on('change', () => {
					this.wordsShadow.model.material.color.set(this.config.wordsShadowColor)
				})

			this.debug.worldFolder.addSeparator()

			this.debug.worldFolder
				.addInput(this.config, 'firefliesSize', { min: 40, max: 1000, step: 10, label: 'Fireflies Size' })
				.on('change', () => {
					this.fireflies.model.material.uniforms.uSize.value = this.config.firefliesSize
				})
			this.debug.worldFolder
				.addInput(this.config, 'firefliesSpeed', { min: 0, max: 80, step: 1, label: 'Fireflies Speed' })
				.on('change', () => {
					this.fireflies.model.material.uniforms.uTimeFrequency.value = this.config.firefliesSpeed / 10000
				})
			this.debug.worldFolder
				.addInput(this.config, 'portalSpeed', { min: 0, max: 40, step: 1, label: 'Portal Speed' })
				.on('change', () => {
					this.portal.model.material.uniforms.uTimeFrequency.value = this.config.portalSpeed / 10000
				})
			this.debug.worldFolder
				.addInput(this.config, 'fireSpeed', { min: 0, max: 40, step: 1, label: 'Fire Speed' })
				.on('change', () => {
					this.fire.model.material.uniforms.uSpeed.value = this.config.fireSpeed / 4000
					this.fire.model.material.uniforms.uTimeFrequency.value = this.config.fireSpeed / 10000
				})
		}
	}

	resize() { }
	destroy() { }
}
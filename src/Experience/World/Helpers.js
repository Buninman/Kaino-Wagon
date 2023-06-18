import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Helpers {
	constructor(_options) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.config = this.experience.config
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		this.addHelpers()
		this.addTestSphere()
		this.addDebug()
	}

	addHelpers() {
		this.axes = new THREE.AxesHelper(5)

		this.scene.add(this.axes)
	}

	addTestSphere() {
		this.testSphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.1, 7, 7),
			new THREE.MeshBasicMaterial({ color: '#fff' }),
			)
		this.testSphere.position.set(1, 1, 1)

		this.scene.add(this.testSphere)
	}

	addDebug() {
		if (this.debug) {
			this.debug
				.addInput(this.config, 'testSpherePosition', { min: -2, max: 2, step: 0.01, label: 'X' })
				.on('change', () => {
					this.testSphere.position.x = this.config.testSpherePosition
				})
			this.debug
				.addInput(this.config, 'testSpherePosition', { min: -2, max: 2, step: 0.01, label: 'Y' })
				.on('change', () => {
					this.testSphere.position.y = this.config.testSpherePosition
				})
			this.debug
				.addInput(this.config, 'testSpherePosition', { min: -2, max: 2, step: 0.01, label: 'Z' })
				.on('change', () => {
					this.testSphere.position.z = this.config.testSpherePosition
				})
		}
	}

	update() { }
	destroy() { }
}
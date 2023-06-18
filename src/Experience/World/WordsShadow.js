import * as THREE from 'three'
import Experience from '../Experience.js'

export default class WordsShadow {
	constructor(_options) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.config = this.experience.config
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		this.addModel()
	}

	addModel() {
		// Geometry
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'shadow' )
		this.model.position.y = this.config.globalPosition

		// Material
		this.model.textureAlpha = this.resources.items.wagonAlpha
		this.model.textureAlpha.flipY = false

		this.model.material = new THREE.MeshBasicMaterial({
			color: this.config.wordsShadowColor,
			alphaMap: this.model.textureAlpha,
			transparent: true,
			// depthWrite: true,
		})

		this.scene.add( this.model )
	}

	resize() {}

	update() {}

	destroy() {}
}
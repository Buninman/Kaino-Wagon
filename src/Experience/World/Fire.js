import * as THREE from 'three'
import Experience from '../Experience.js'

import fireVertexShader from './shaders/fire/vertex.glsl'
import fireFragmentShader from './shaders/fire/fragment.glsl'

export default class Fire {
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
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'fire' )
		this.model.position.y = this.config.globalPosition

		// Material
		this.model.textureNeutral = this.resources.items.wagonTextureFireAndLightSolid
		this.model.textureNeutral.flipY = false

		this.model.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uSpeed: { value: this.config.fireSpeed / 4000 },
				uTimeFrequency: { value: this.config.fireSpeed / 10000 },
				uColorUp: { value: new THREE.Color(this.config.fireColorUp) },
				uColorDown: { value: new THREE.Color(this.config.fireColorDown) },
				uBakedNeutralTexture: { value: this.model.textureNeutral },
				uNeutralMix: { value: this.config.neutral },
			},
			vertexShader: fireVertexShader,
			fragmentShader: fireFragmentShader,
			wireframe: this.config.wireframe,
		})

		this.scene.add( this.model )
	}

	resize() { }

	update() {
		this.model.material.uniforms.uTime.value = this.time.elapsed
	}

	destroy() { }
}
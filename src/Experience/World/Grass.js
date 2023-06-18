import * as THREE from 'three'
import Experience from '../Experience.js'

import grassVertexShader from './shaders/grass/vertex.glsl'
import grassFragmentShader from './shaders/grass/fragment.glsl'

export default class Grass {
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
		this.model = {}
		
		// Geometry
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'grass' )
		this.model.position.y = this.config.globalPosition

		// Material
		this.model.textureColor = this.resources.items.wagonTexturePack2
		this.model.textureColor.flipY = false
		this.model.textureNeutral = this.resources.items.wagonTexturePack2Solid
		this.model.textureNeutral.flipY = false
		
		this.model.material = new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uBakedColorTexture: { value: this.model.textureColor },
					uBakedNeutralTexture: { value: this.model.textureNeutral },
					uNeutralMix: { value: this.config.neutral },
				},
				vertexShader: grassVertexShader,
				fragmentShader: grassFragmentShader,
				wireframe: this.config.wireframe,
			})

		this.scene.add( this.model )
	}

	resize() {}

	update() {
		this.model.material.uniforms.uTime.value = this.time.elapsed
	}

	destroy() {}
}
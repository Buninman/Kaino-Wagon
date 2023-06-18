import * as THREE from 'three'
import Experience from '../Experience.js'

import treesVertexShader from './shaders/trees/vertex.glsl'
import treesFragmentShader from './shaders/trees/fragment.glsl'

export default class Trees {
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
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'trees' )
		this.model.position.y = this.config.globalPosition
		this.model.name = 'wagon'

		// Material
		this.model.textureColor = this.resources.items.wagonTexturePack1
		this.model.textureColor.flipY = false
		this.model.textureNeutral = this.resources.items.wagonTexturePack1Solid
		this.model.textureNeutral.flipY = false
		
		this.model.material = new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uBakedColorTexture: { value: this.model.textureColor },
					uBakedNeutralTexture: { value: this.model.textureNeutral },
					uNeutralMix: { value: this.config.neutral },
				},
				vertexShader: treesVertexShader,
				fragmentShader: treesFragmentShader,
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
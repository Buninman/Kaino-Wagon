import * as THREE from 'three'
import Experience from '../Experience.js'

import owlEyesVertexShader from './shaders/owlEyes/vertex.glsl'
import owlEyesFragmentShader from './shaders/owlEyes/fragment.glsl'

export default class OwlEyes {
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
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'owlEyes' )
		this.model.position.y = this.config.globalPosition

		// Material
		this.model.textureColor = this.resources.items.wagonTexturePack1
		this.model.textureColor.flipY = false
		this.model.textureNeutral = this.resources.items.wagonTexturePack1Solid
		this.model.textureNeutral.flipY = false
		
		this.model.material = new THREE.ShaderMaterial({
				uniforms: {
					uBakedColorTexture: { value: this.model.textureColor },
					uBakedNeutralTexture: { value: this.model.textureNeutral },
					uNeutralMix: { value: this.config.neutral },
					uTime: { value: 0 },
					uTintColor: { value: new THREE.Color(this.config.owlEyesColor) }
				},
				vertexShader: owlEyesVertexShader,
				fragmentShader: owlEyesFragmentShader,
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
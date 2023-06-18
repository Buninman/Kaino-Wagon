import * as THREE from 'three'
import Experience from '../Experience.js'

import bakedVertexShader from './shaders/baked/vertex.glsl'
import bakedFragmentShader from './shaders/baked/fragment.glsl'

export default class Wagon {
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
		
		// Geometry Pack1
		this.model.pack1 = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'mergePack1' )
		this.model.pack1.position.y = this.config.globalPosition
		this.model.pack1.name = 'wagon'

		// Material Pack1
		this.model.pack1.textureColor = this.resources.items.wagonTexturePack1
		this.model.pack1.textureColor.flipY = false
		this.model.pack1.textureNeutral = this.resources.items.wagonTexturePack1Solid
		this.model.pack1.textureNeutral.flipY = false
		
		this.model.pack1.material = new THREE.ShaderMaterial({
				uniforms: {
					uBakedColorTexture: { value: this.model.pack1.textureColor },
					uBakedNeutralTexture: { value: this.model.pack1.textureNeutral },
					uNeutralMix: { value: this.config.neutral },
				},
				vertexShader: bakedVertexShader,
				fragmentShader: bakedFragmentShader,
				wireframe: this.config.wireframe,
			})

		// Geometry Pack2
		this.model.pack2 = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'mergePack2' )
		this.model.pack2.position.y = this.config.globalPosition
		this.model.pack2.name = 'wagon'

		// Material Pack2
		this.model.pack2.textureColor = this.resources.items.wagonTexturePack2
		this.model.pack2.textureColor.flipY = false
		this.model.pack2.textureNeutral = this.resources.items.wagonTexturePack2Solid
		this.model.pack2.textureNeutral.flipY = false

		this.model.pack2.material = new THREE.ShaderMaterial({
				uniforms: {
					uBakedColorTexture: { value: this.model.pack2.textureColor },
					uBakedNeutralTexture: { value: this.model.pack2.textureNeutral },
					uNeutralMix: { value: this.config.neutral },
				},
				vertexShader: bakedVertexShader,
				fragmentShader: bakedFragmentShader,
				wireframe: this.config.wireframe,
			})

		this.scene.add( this.model.pack1, this.model.pack2 )
	}

	resize() {}

	update() {}

	destroy() {}
}
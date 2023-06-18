import * as THREE from 'three'
import Experience from '../Experience.js'

import lightVertexShader from './shaders/light/vertex.glsl'
import lightFragmentShader from './shaders/light/fragment.glsl'

export default class Windows {
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
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'windows' )
		this.model.position.y = this.config.globalPosition

		// Material
		this.model.textureNeutral = this.resources.items.wagonTextureFireAndLightSolid
		this.model.textureNeutral.flipY = false

		this.model.material = new THREE.ShaderMaterial({
			uniforms: {
				uColor: { value: new THREE.Color(this.config.lightColor) },
				uBakedNeutralTexture: { value: this.model.textureNeutral },
				uNeutralMix: { value: this.config.neutral },
			},
			vertexShader: lightVertexShader,
			fragmentShader: lightFragmentShader,
			wireframe: this.config.wireframe,
		})

		this.scene.add(this.model)
	}

	resize() {}

	update() {}

	destroy() {}
}
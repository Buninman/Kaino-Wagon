import * as THREE from 'three'
import Experience from '../Experience.js'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

export default class Portal {
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
		this.model = this.resources.items.wagonModel.scene.children.find( (child) => child.name === 'portal' )
		this.model.position.y = this.config.globalPosition
		this.model.name = 'icoGithub'

		// Material
		this.model.textureSite = this.resources.items.portalSiteTexture
		this.model.textureNeutral = this.resources.items.portalSolidTexture
		this.model.textureNeutral.flipY = false

		this.model.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uTimeFrequency: { value: this.config.portalSpeed / 10000 },
				uColorBorder: { value: new THREE.Color(this.config.lightColor) },
				uColorCenter: { value: new THREE.Color(this.config.backgroundColor) },
				uBakedNeutralTexture: { value: this.model.textureNeutral },
				uSiteTexture: { value: this.model.textureSite },
				uNeutralMix: { value: this.config.neutral },
				uActiveMix: { value: 0 },
			},
			vertexShader: portalVertexShader,
			fragmentShader: portalFragmentShader,
			wireframe: this.config.wireframe,
		})

		this.scene.add( this.model )
	}

	resize() {}

	update() {
		this.model.material.uniforms.uTime.value = this.time.elapsed

		if (this.config.portalActive) {
			this.model.material.uniforms.uActiveMix.value += (1 - this.model.material.uniforms.uActiveMix.value) * 0.01
		} else if (this.model.material.uniforms.uActiveMix.value > 0) {
			this.model.material.uniforms.uActiveMix.value += -0.01
		}
	}

	destroy() {}
}
import * as THREE from 'three'
import Experience from '../Experience.js'

import gradientShadowVertexShader from './shaders/gradientShadow/vertex.glsl'
import gradientShadowFragmentShader from './shaders/gradientShadow/fragment.glsl'

export default class GradientShadow {
	constructor(_options) {
		this.experience = new Experience()
		this.config = this.experience.config
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		this.addModel()
	}

	addModel() {
		// Geometry
		this.model = new THREE.Mesh()
		this.model.geometry = new THREE.CircleGeometry( 5, 64 )
		this.model.position.set(0.55, this.config.globalPosition - 0.02, 0.55)
		this.model.rotation.x = -Math.PI * 0.5

		// Material
		this.model.material = new THREE.ShaderMaterial({
			uniforms: {
				uColorBg: { value: new THREE.Color(this.config.backgroundColor) },
				uColorShadow: { value: new THREE.Color(this.config.shadowColor) }
			},
			vertexShader: gradientShadowVertexShader,
			fragmentShader: gradientShadowFragmentShader,
			depthWrite: false,
		});

		this.scene.add(this.model)
	}

	resize() {}

	update() {}

	destroy() {}
}
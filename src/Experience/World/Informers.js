import * as THREE from 'three'
import Experience from '../Experience.js'

import informersVertexShader from './shaders/informers/vertex.glsl'
import informersFragmentShader from './shaders/informers/fragment.glsl'

export default class Informers {
	constructor(_options) {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		this.config = this.experience.config
		this.scene = this.experience.scene
		this.raycaster = this.experience.raycaster
		this.time = this.experience.time
		this.clock = new THREE.Clock()
		this.sizes = this.experience.sizes

		this.setMaterials()
		this.addModel()
	}
	setMaterials() {
		this.textureColor = this.resources.items.informersTexture
		this.textureColor.flipY = false
		this.textureLight = this.resources.items.informersTextureLight
		this.textureLight.flipY = false

		this.shaderMaterial = new THREE.ShaderMaterial({
				uniforms: {
					uBakedColorTexture: { value: this.textureColor },
					uBakedActiveTexture: { value: this.textureLight },
					uNeutralMix: { value: this.config.neutral },
					uActiveMix: { value: this.config.neutral },
				},
				vertexShader: informersVertexShader,
				fragmentShader: informersFragmentShader,
				wireframe: this.config.wireframe,
			})
	}

	addModel() {
		// Icons
		this.icoBruno = this.resources.items.informersIcons.scene.children.find( (child) => child.name === 'icoBruno' )
		this.icoBruno.material = this.shaderMaterial.clone()
		this.icoBruno.position.set(-0.811, 0.71, 0.57)

		this.icoGithub = this.resources.items.informersIcons.scene.children.find( (child) => child.name === 'icoGithub' )
		this.icoGithub.material = this.shaderMaterial.clone()
		this.icoGithub.position.set(0.09, -0.48, -1.23)

		this.icoMail = this.resources.items.informersIcons.scene.children.find( (child) => child.name === 'icoMail' )
		this.icoMail.material = this.shaderMaterial.clone()
		this.icoMail.position.set(-1.44, -0.35, 1.24)

		this.icoQuestionGrass = this.resources.items.informersIcons.scene.children.find( (child) => child.name === 'icoQuestion' )
		this.icoQuestionGrass.name = 'icoQuestionGrass'
		this.icoQuestionGrass.material = this.shaderMaterial.clone()
		this.icoQuestionGrass.position.set(1.52, -0.83, 1.30)

		this.icoQuestionOwl = this.icoQuestionGrass.clone()
		this.icoQuestionOwl.name = 'icoQuestionOwl'
		this.icoQuestionOwl.material = this.shaderMaterial.clone()
		this.icoQuestionOwl.position.set(-0.57, 2.45, -1.52)

		this.icoKaino = this.resources.items.informersIcons.scene.children.find( (child) => child.name === 'icoKaino' )
		this.icoKaino.material = this.shaderMaterial.clone()
		this.icoKaino.position.set(0.52, -0.35, -1.97)

		this.models = new THREE.Group().add(
			this.icoBruno,
			this.icoGithub,
			this.icoMail,
			this.icoQuestionGrass,
			this.icoQuestionOwl,
			this.icoKaino,
			)

		// Targets Areas
		this.targets = this.resources.items.informersTargets.scene
		this.targets.position.y = this.config.globalPosition
		this.targets.visible = false

		this.scene.add( this.models, this.targets )
	}

	update() {
		this.icoBruno.rotation.y += 				(this.experience.camera.instance.rotation.y - this.icoBruno.rotation.y) * 0.011
		this.icoGithub.rotation.y += 				(this.experience.camera.instance.rotation.y - this.icoGithub.rotation.y) * 0.012
		this.icoMail.rotation.y += 					(this.experience.camera.instance.rotation.y - this.icoMail.rotation.y) * 0.009
		this.icoQuestionGrass.rotation.y += (this.experience.camera.instance.rotation.y - this.icoQuestionGrass.rotation.y) * 0.01
		this.icoQuestionOwl.rotation.y += 	(this.experience.camera.instance.rotation.y - this.icoQuestionOwl.rotation.y) * 0.011
		this.icoKaino.rotation.y += 				(this.experience.camera.instance.rotation.y - this.icoKaino.rotation.y) * 0.013

		this.icoBruno.position.y =					Math.cos( this.time.elapsed * 0.0035 ) * 0.011 + 0.71
		this.icoGithub.position.y = 				Math.cos( this.time.elapsed * 0.0030 ) * 0.013 - 0.48
		this.icoMail.position.y = 					Math.cos( this.time.elapsed * 0.0034 ) * 0.015 - 0.35
		this.icoQuestionGrass.position.y = 	Math.cos( this.time.elapsed * 0.0031 ) * 0.016 - 0.83
		this.icoQuestionOwl.position.y = 		Math.cos( this.time.elapsed * 0.0032 ) * 0.014 + 2.45
		this.icoKaino.position.y = 					Math.cos( this.time.elapsed * 0.0033 ) * 0.012 - 0.35
	}
}
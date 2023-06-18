import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

export default class Renderer {
	constructor(_options = {}) {
		this.experience = new Experience()
		this.config = this.experience.config
		this.debug = this.experience.debug
		this.stats = this.experience.stats
		this.time = this.experience.time
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		
		this.usePostprocess = true

		this.setInstance()
		this.setPostProcess()
		this.addDebug()
	}

	setInstance() {
		// Renderer
		this.instance = new THREE.WebGLRenderer({
			// alpha: true,
			antialias: true
		})
		this.instance.domElement.style.position = 'absolute'
		this.instance.domElement.style.top = 0
		this.instance.domElement.style.left = 0
		this.instance.domElement.style.width = '100%'
		this.instance.domElement.style.height = '100%'

		this.instance.setClearColor(this.config.backgroundColor, 1)
		this.instance.setSize(this.config.width, this.config.height)
		this.instance.setPixelRatio(this.config.pixelRatio)

		// this.instance.physicallyCorrectLights = true
		// this.instance.gammaOutPut = true
		// this.instance.outputEncoding = THREE.sRGBEncoding
		// this.instance.shadowMap.type = THREE.PCFSoftShadowMap
		// this.instance.shadowMap.enabled = false
		this.instance.toneMapping = THREE.NoToneMapping
		this.instance.toneMappingExposure = 1

		this.context = this.instance.getContext()

		// Add stats panel
		if(this.stats) {
			this.stats.setRenderPanel(this.context)
		}
	}

	setPostProcess() {
		this.postProcess = {}

		/**
		 * Effect composer
		 */
		this.renderTarget = new THREE.WebGLRenderTarget(
				this.config.width,
				this.config.height,
				{
						generateMipmaps: false,
						minFilter: THREE.LinearFilter,
						magFilter: THREE.LinearFilter,
						// format: THREE.RGBAFormat,
						// encoding: THREE.sRGBEncoding,
						samples: this.instance.getPixelRatio() === 1 ? 2 : 0
				}
		)
		this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
		this.postProcess.composer.setSize(this.config.width, this.config.height)
		this.postProcess.composer.setPixelRatio(this.config.pixelRatio)

		/**
		 * Passes
		 */
		this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)
		this.postProcess.composer.addPass(this.postProcess.renderPass)

		this.postProcess.unrealBloomPass = new UnrealBloomPass()
		this.postProcess.unrealBloomPass.strength = this.config.unrealBloomStrength
		this.postProcess.unrealBloomPass.radius = this.config.unrealBloomRadius
		this.postProcess.unrealBloomPass.threshold = this.config.unrealBloomThreshold
		this.postProcess.composer.addPass(this.postProcess.unrealBloomPass)

		if(this.instance.getPixelRatio() === 1 && !this.instance.capabilities.isWebGL2) {
			this.postProcess.smaaPass = new SMAAPass()
			this.postProcess.composer.addPass(this.postProcess.smaaPass)

			console.log('Using SMAA')
			}
	}

	addDebug() {
		if(this.debug) {
			this.debug.renderFolder
				.addInput(this.postProcess.unrealBloomPass,'enabled',{
					label: 'Unreal Bloom' })
			this.debug.renderFolder
				.addInput(this.config,'unrealBloomMyStrength',{
					min: 0, max: 1, step: 0.01,
					label: 'Bloom Strength' })
			this.debug.renderFolder
				.addInput(this.config,'unrealBloomMyPulseSpeed',{
					min: 0, max: 10, step: 1,
					label: 'Pulse Speed' })
			this.debug.renderFolder
				.addInput(this.config,'unrealBloomMyWaveLength',{
					min: 0, max: 10, step: 0.01,
					label: 'Wave Length' })
			this.debug.renderFolder
				.addInput(this.postProcess.unrealBloomPass,'radius',{
					min: 0, max: 1, step: 0.01,
					label: 'Bloom Radius' })
			this.debug.renderFolder
				.addInput(this.config,'unrealBloomThreshold',{
					min: 0, max: 1, step: 0.01,
					label: 'Bloom Threshold' })
		}
	}

	resize() {
		// Instance
		this.instance.setSize(this.config.width, this.config.height)
		this.instance.setPixelRatio(this.config.pixelRatio)

		// Post process
		this.postProcess.composer.setSize(this.config.width, this.config.height)
		this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
	}

	update() {
		if(this.stats) {
				this.stats.beforeRender()
		}

		if(this.usePostprocess) {
				this.postProcess.composer.render()
				// this.config.unrealBloomStrength = (Math.sin(this.time.elapsed * 0.004) * 1.5 + 5.5) * 0.1
				this.postProcess.unrealBloomPass.strength = (Math.sin(this.time.elapsed
																									* (this.config.unrealBloomMyPulseSpeed / 1000))
																									* this.config.unrealBloomMyWaveLength
																									+ (4 + this.config.unrealBloomMyWaveLength))
																									* this.config.unrealBloomMyStrength
		}
		else {
				this.instance.render(this.scene, this.camera.instance)
		}

		if(this.stats) {
				this.stats.afterRender()
		}
	}

	destroy() {
		this.instance.renderLists.dispose()
		this.instance.dispose()
		this.renderTarget.dispose()
		this.postProcess.composer.renderTarget1.dispose()
		this.postProcess.composer.renderTarget2.dispose()
	}
}
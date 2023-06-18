import * as THREE from 'three'

export default class Config {
	constructor(targetElement) {
		// Pixel ratio
		this.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
		// Width and height
		const boundings = targetElement.getBoundingClientRect()
		this.width = boundings.width
		this.height = boundings.height || window.innerHeight
		this.smallestSide = Math.min(this.width, this.height)
		this.largestSide = Math.max(this.width, this.height)

		// Debug
		// this.debug = window.location.hash === '#debug'
		this.debug = this.width > 420

		// Colors
		this.backgroundColor = '#4b9bfb'
		this.lightColor = '#ffffe5'
		this.firefliersColor = '#f87c42'
		this.wordsShadowColor = '#010203'
		this.shadowColor = '#1364b5'
		this.fireColorUp = '#ffff9b'
		this.fireColorDown = '#fe8e12'
		this.owlEyesColor = '#7f490e'

		// World
		this.globalPosition = -1.5
		this.firefliesSize = 290
		this.firefliesSpeed = 4
		this.fireSpeed = 4
		this.portalSpeed = 4
		this.portalActive = false
		this.neutral = 1
		this.wireframe = false
		this.lifeCamera = true

		// Post Processing
		this.unrealBloomStrength = 0.32
		this.unrealBloomRadius = 1
		this.unrealBloomThreshold = 0.82
		this.unrealBloomMyPulseSpeed = 1
		this.unrealBloomMyWaveLength = 1.5
		this.unrealBloomMyStrength = 0.1

		// Loader
		this.html_loader = document.querySelector('.loader')
		this.html_loaderKey = document.querySelector('.loaderKey')

		// Informers
		this.html_credits = document.querySelector('.credits')
		// this.html_iKey = document.querySelector('.iKey')
		this.html_textBlock = document.querySelector('.information')

		this.icoBruno = `I learned how to make 3D websites in the
			<a href="https://threejs-journey.com/" target="_blank">
				<svg><use href="./social/icoBruno.svg#idIco"></use></svg>
				"Three.js Journey"</a>
			course by
			<a href="https://discord.gg/Cy7gBPuwvV" target="_blank">
				<svg><use href="./social/icoDiscord.svg#idIco"></use></svg>
				Bruno Simon</a>.
			I highly recommend this course if you want to start learning Three.js!`

		this.icoGithub = `Do you want to know what's inside? You can view the code of this website in my
			<a href="https://github.com/Buninman/Kaino-Wagon" target="_blank">
				<svg><use href="./social/icoGithub.svg#idIco"></use></svg>
				Github!</a>`

		this.icoMail = `If you want to talk, then just write to me in
			<a href="https://t.me/buninman" target="_blank">
				<svg><use href="./social/icoTelegram.svg#idIco"></use></svg>
				Telegram</a>,
			<a href="https://twitter.com/Buninman" target="_blank">
				<svg><use href="./social/icoTwitter.svg#idIco"></use></svg>
				Twitter</a>
			or join my
			<a href="https://vk.ru/threejsjourney" target="_blank">
				<svg><use href="./social/icoVK.svg#idIco"></use></svg>
				VK</a>
			(ru)`

		this.icoKaino = `The model of the house was made in Blender.
			I followed a free course from Kaino School (ru). I recommend 	the YouTube channels
			<a href="https://www.youtube.com/@polygonrunway" target="_blank">
				<svg><use href="./social/icoYoutube.svg#idIco"></use></svg>
				Polygon Runway</a>
			and
			<a href="https://www.youtube.com/@grabbitt" target="_blank">
				<svg><use href="./social/icoYoutube.svg#idIco"></use></svg>
				Grant Abbitt</a>
			if you're learning 3D`
		
		this.icoQuestionGrass = 'Here are 3469 blades of grass growing, they are animated using shaders. All the animation on the website was created using JavaScript and GLSL programming languages'
		this.icoQuestionOwl = 'This owl is looking very carefully somewhere... but where?'

		// Test
		this.testSpherePosition = 1
	}
}

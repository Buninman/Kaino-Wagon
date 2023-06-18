uniform sampler2D uBakedColorTexture;
uniform sampler2D uBakedActiveTexture;
// uniform vec3 uActiveColor;
uniform float uNeutralMix;
uniform float uActiveMix;

varying vec2 vUv;

void main() {
	vec3 bakedColor = texture2D(uBakedColorTexture, vUv).rgb;
	vec3 bakedActive = texture2D(uBakedActiveTexture, vUv).rgb;

	vec3 mixActive = mix(bakedActive, bakedColor, uActiveMix);

	gl_FragColor = vec4(mixActive, 1.0);
	// gl_FragColor = vec4(1.0,1.0,1.0, 1.0);
}
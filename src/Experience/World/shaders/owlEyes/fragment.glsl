uniform sampler2D uBakedColorTexture;
uniform sampler2D uBakedNeutralTexture;
uniform float uTime;
uniform float uNeutralMix;
uniform vec3 uTintColor;

varying vec2 vUv;

void main() {
	vec3 bakedColor = texture2D(uBakedColorTexture, vUv).rgb;
	vec3 bakedNeutral = texture2D(uBakedNeutralTexture, vUv).rgb;
	vec3 owlEyesColor = mix(bakedNeutral, uTintColor, 0.4 );

	float eyesPulseWave = step( 0.4, abs( sin(uTime * 0.001) + 0.38 * 1.5) * 5.0 );
	vec3 pulsedColor = mix(owlEyesColor, bakedColor, eyesPulseWave );

	vec3 mixColor = mix(bakedNeutral, pulsedColor, uNeutralMix);

	gl_FragColor = vec4(mixColor, 1.0);
}
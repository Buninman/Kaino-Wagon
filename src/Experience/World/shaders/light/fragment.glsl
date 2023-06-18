uniform vec3 uColor;
uniform sampler2D uBakedNeutralTexture;
uniform float uNeutralMix;

varying vec2 vUv;

void main()
{
	vec3 bakedNeutral = texture2D(uBakedNeutralTexture, vUv).rgb;

	vec3 mixColor = mix(bakedNeutral, uColor, uNeutralMix);

	gl_FragColor = vec4(mixColor, 1.0);
}
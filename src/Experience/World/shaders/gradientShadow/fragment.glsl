uniform vec3 uColorShadow;
uniform vec3 uColorBg;

varying vec2 vUv;

void main()
{
	// float outerGlow = distance(vUv, vec2(0.5));
	// float strength = 0.05 / distanceToCenter - 0.1;
	// Outer glow


	// float outerGlow = distance(vUv, vec2(0.5)) * 6.0 - 1.9;
	float strength = distance(vUv, vec2(0.5));
	float outerGlow = 0.5 / strength - 1.0;

	// Final color
	vec3 color = mix(uColorBg, uColorShadow, outerGlow);

	gl_FragColor = vec4(color, 1.0);
}

// void main()
// {
// 	// Displace the UV
// 	vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * uTimeFrequency * 0.4));

// 	// Perlin noise
// 	float strenght = cnoise(vec3(displacedUv * 5.0, uTime * uTimeFrequency * 0.7));

// 	// Outer glow
// 	float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
// 	strenght += outerGlow;

// 	// Apply cool step
// 	strenght += step(-0.2, strenght) * 0.8;

// 	// Clamp the value from 0 to 1
// 	strenght = clamp(strenght, 0.0, 1.0);

// 	// Final color
// 	vec3 color = mix(uColorStart, uColorEnd, strenght);

// 	gl_FragColor = vec4(color, 1.0);
// }
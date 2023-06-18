uniform float uTime;
varying vec2 vUv;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	float speed = uTime * 0.001;
	float elevation = (sin(speed) / 4.0) * ((modelPosition.y + 1.22)) ;
	modelPosition.x -= sin(elevation / 5.0) * 0.1;
	modelPosition.z += sin(elevation / 5.0) * 0.1;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	
	gl_Position = projectedPosition;

	vUv = uv;
}
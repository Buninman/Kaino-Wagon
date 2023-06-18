uniform float uTime;
varying vec2 vUv;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	float speed = uTime * 0.001;
	float elevation = sin(modelPosition.y * 10.0 + speed) * (modelPosition.y + 1.22);
	modelPosition.x -= sin(elevation) * 0.1;
	modelPosition.z += sin(elevation) * 0.1;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	
	gl_Position = projectedPosition;

	vUv = uv;
}
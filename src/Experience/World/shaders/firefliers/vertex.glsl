//uniform mat4 projectionMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 modelMatrix;
uniform float uTime;
uniform float uTimeFrequency;

uniform float uPixelRation;
uniform float uSize;

attribute float aScale;

void main()
{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	modelPosition.y += sin(uTime * uTimeFrequency * 0.6 + modelPosition.y * 100.0) * aScale * 0.3;
	modelPosition.z += sin(uTime * uTimeFrequency * 0.7 + modelPosition.z * 110.0) * aScale * 0.25;
	modelPosition.x += sin(uTime * uTimeFrequency * 0.8 + modelPosition.x * 120.0) * aScale * 0.2;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;

	gl_Position = projectedPosition;

	gl_PointSize = uSize * aScale * uPixelRation;
	gl_PointSize *= (1.0 / -viewPosition.z);
}
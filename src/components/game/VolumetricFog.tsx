import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shader de bruit 3D simplex pour créer des volutes
const volumetricFogShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform float time;
    uniform vec3 fogColor;
    uniform float density;
    uniform float speed;

    varying vec2 vUv;
    varying vec3 vPosition;

    // Bruit 3D Simplex (fonction optimisée)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Fonction de bruit fractal (FBM) pour plus de détails
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;

      for(int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      // Position 3D pour le bruit avec animation temporelle
      vec3 noisePos = vec3(vPosition.x * 0.3, vPosition.y * 0.4, vPosition.z * 0.3);
      noisePos.x += time * speed * 0.1;
      noisePos.y += time * speed * 0.05;

      // Générer le bruit fractal pour les volutes
      float noise1 = fbm(noisePos);
      float noise2 = fbm(noisePos * 2.0 + vec3(100.0, 100.0, 100.0));

      // Combiner les bruits pour un effet de volutes
      float combinedNoise = (noise1 + noise2 * 0.5) * 0.5 + 0.5;

      // Calculer l'opacité avec variation verticale
      float verticalFade = smoothstep(-1.0, 1.0, vPosition.y);
      float edgeFade = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);

      float alpha = combinedNoise * density * verticalFade * edgeFade;
      alpha = clamp(alpha, 0.0, 0.8);

      // Légère variation de couleur basée sur le bruit
      vec3 color = mix(fogColor * 0.9, fogColor * 1.1, noise1 * 0.5 + 0.5);

      gl_FragColor = vec4(color, alpha);
    }
  `
};

interface VolumetricFogProps {
  position: [number, number, number];
  size?: [number, number];
  rotation?: [number, number, number];
  density?: number;
  speed?: number;
  color?: string;
}

export const VolumetricFog = ({
  position,
  size = [30, 8],
  rotation = [0, 0, 0],
  density = 0.5,
  speed = 0.3,
  color = '#dce6ef'
}: VolumetricFogProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Créer le matériau shader
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fogColor: { value: new THREE.Color(color) },
        density: { value: density },
        speed: { value: speed }
      },
      vertexShader: volumetricFogShader.vertexShader,
      fragmentShader: volumetricFogShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [color, density, speed]);

  // Animer le temps pour le shader
  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      material={shaderMaterial}
    >
      <planeGeometry args={size} />
    </mesh>
  );
};

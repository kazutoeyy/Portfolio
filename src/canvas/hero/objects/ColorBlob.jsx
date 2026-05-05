/**
 * ColorBlob.jsx — Visual design thinking (Layer 4 visual)
 * Custom shader: vertex morph + color patch shifting
 * Bloom: NO
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'

const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  varying float vDisplacement;
  
  void main() {
    vUv = uv;
    
    // Organic morph using sin waves — amplified on hover
    float hoverBoost = 1.0 + uHover * 0.5;
    float displacement = sin(position.x * 3.0 + uTime) * 0.15 * hoverBoost
                       + sin(position.y * 4.0 + uTime * 0.7) * 0.1 * hoverBoost
                       + sin(position.z * 2.5 + uTime * 1.3) * 0.12 * hoverBoost;
    
    vDisplacement = displacement;
    vec3 newPos = position + normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  varying float vDisplacement;
  
  void main() {
    // Color patch shifting between primary palette colors
    vec3 color1 = vec3(0.486, 0.361, 0.988); // #7C5CFC
    vec3 color2 = vec3(1.0, 0.42, 0.616);    // #FF6B9D
    vec3 color3 = vec3(0.306, 0.804, 0.769); // #4ECDC4
    
    float speed = 0.5 + uHover * 0.3;
    float t = sin(uTime * speed + vUv.x * 3.0) * 0.5 + 0.5;
    float t2 = cos(uTime * (speed * 0.6) + vUv.y * 2.0) * 0.5 + 0.5;
    
    vec3 color = mix(mix(color1, color2, t), color3, t2 * 0.4);
    color += vDisplacement * 0.3;
    
    // Brighten slightly on hover
    color += uHover * 0.1;
    
    gl_FragColor = vec4(color, 0.85);
  }
`

export default function ColorBlob({ position, config, index }) {
  const groupRef = useRef()
  const meshRef = useRef()

  useFloatingMotion(groupRef, { index, amplitude: 0.2 })

  const { bind, hovered } = useHoverInteraction('colorBlob', {
    scale: 1.25,
    groupRef,
  })

  useFocusState('colorBlob', groupRef)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
      // Smooth hover uniform
      const target = hovered ? 1.0 : 0.0
      meshRef.current.material.uniforms.uHover.value +=
        (target - meshRef.current.material.uniforms.uHover.value) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position} scale={config.scale} {...bind}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

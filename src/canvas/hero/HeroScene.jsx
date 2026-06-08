import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import useSceneStore from '@stores/useSceneStore'
import ThreadIto from './objects/ThreadIto'
import InkBlobSumi from './objects/InkBlobSumi'
import OrigamiOri from './objects/OrigamiOri'

export default function HeroScene() {
  const groupRef = useRef()
  const currentScene = useSceneStore((s) => s.currentScene)

  // Subtle mouse parallax
  useFrame((state) => {
    if (groupRef.current && currentScene === 'hero') {
      const { x, y } = state.pointer
      groupRef.current.rotation.y = x * 0.1
      groupRef.current.rotation.x = -y * 0.1
    }
  })

  // Do not render objects until loading is almost done to avoid popping
  if (currentScene === 'loading') return null

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} color="#E8E0D0" />
      <directionalLight position={[5, 5, -5]} intensity={2.5} color="#8B3A2A" />
      <directionalLight position={[-5, -2, 5]} intensity={0.8} color="#4A453E" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#E8E0D0" penumbra={1} angle={0.5} />
      
      <ThreadIto position={[-2.5, 0.5, 0]} />
      <InkBlobSumi position={[0, -0.5, 0]} />
      <OrigamiOri position={[2.5, 0.5, -1]} />
    </group>
  )
}

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useSceneStore from '@stores/useSceneStore'
import { Select } from '@react-three/postprocessing'
import ThreadIto from './objects/ThreadIto'
import InkBlobSumi from './objects/InkBlobSumi'
import OrigamiOri from './objects/OrigamiOri'

export default function HeroScene() {
  const groupRef = useRef()
  const currentScene = useSceneStore((s) => s.currentScene)
  const [parallaxActive, setParallaxActive] = useState(false)

  useEffect(() => {
    if (currentScene === 'hero') {
      const t = setTimeout(() => setParallaxActive(true), 3000)
      return () => clearTimeout(t)
    } else {
      setParallaxActive(false)
    }
  }, [currentScene])

  // Subtle mouse parallax
  useFrame((state) => {
    if (groupRef.current && currentScene === 'hero' && parallaxActive) {
      const { x, y } = state.pointer
      const targetX = x * 0.3
      const targetY = y * 0.3
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
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
      
      <Select enabled>
        <ThreadIto position={[-2.5, 0.5, 0]} />
      </Select>
      <InkBlobSumi position={[0, -0.5, 0]} />
      <OrigamiOri position={[2.5, 0.5, -1]} />
    </group>
  )
}

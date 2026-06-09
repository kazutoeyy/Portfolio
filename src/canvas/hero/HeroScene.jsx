import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import useSceneStore from '@stores/useSceneStore'
import ThreadIto from './objects/ThreadIto'
import InkBlobSumi from './objects/InkBlobSumi'
import OrigamiOri from './objects/OrigamiOri'

function ParallaxController({ groupRef }) {
  const [active, setActive] = useState(false)
  const currentScene = useSceneStore((s) => s.currentScene)
  
  useEffect(() => {
    if (currentScene === 'hero') {
      const t = setTimeout(() => setActive(true), 3000)
      return () => clearTimeout(t)
    }
    setActive(false)
  }, [currentScene])

  useFrame((state) => {
    if (groupRef.current && active) {
      const { x, y } = state.pointer
      groupRef.current.position.x += (x * 0.3 - groupRef.current.position.x) * 0.05
      groupRef.current.position.y += (y * 0.3 - groupRef.current.position.y) * 0.05
    }
  })

  return null
}

export default function HeroScene() {
  const groupRef = useRef()
  const currentScene = useSceneStore((s) => s.currentScene)
  
  const threadPos = useMemo(() => [-2.5, 0.5, 0], [])
  const inkPos = useMemo(() => [0, -0.5, 0], [])
  const origamiPos = useMemo(() => [2.5, 0.5, -1], [])

  return (
    <group ref={groupRef} visible={currentScene !== 'loading'}>
      <ParallaxController groupRef={groupRef} />
      
      <ambientLight intensity={0.15} color="#E8E0D0" />
      <directionalLight position={[5, 5, -5]} intensity={0.8} color="#5A3028" />
      <directionalLight position={[-5, -2, 5]} intensity={0.8} color="#4A453E" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#E8E0D0" penumbra={1} angle={0.5} />
      
      <ThreadIto position={threadPos} />
      <InkBlobSumi position={inkPos} />
      <OrigamiOri position={origamiPos} />
    </group>
  )
}

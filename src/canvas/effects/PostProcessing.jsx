/**
 * PostProcessing.jsx — Effect composer pipeline
 * Bloom + Vignette + ChromaticAberration (transition-only)
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import SelectiveBloom from './SelectiveBloom'
import useQualityStore from '../../stores/useQualityStore'
import useSceneStore from '../../stores/useSceneStore'
import { POST_PROCESSING, QUALITY } from '../../utils/constants'

export default function PostProcessing() {
  const { tier } = useQualityStore()
  const caOffsetRef = useRef(new Vector2(0, 0))
  
  // Disable bloom if quality is low
  const bloomEnabled = QUALITY[tier]?.bloom ?? true

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  // ChromaticAberration: bell curve intensity during transitions
  // Peaks at 50% transition progress, zero at rest
  useFrame(() => {
    if (prefersReducedMotion) return

    const { isTransitioning, transitionProgress } = useSceneStore.getState()
    
    if (isTransitioning && transitionProgress > 0) {
      // Bell curve: sin(progress * PI) peaks at 0.5
      const intensity = Math.sin(transitionProgress * Math.PI) * POST_PROCESSING.chromaticAberration.offset[0]
      caOffsetRef.current.set(intensity, intensity)
    } else {
      // Lerp back to zero when not transitioning
      caOffsetRef.current.x *= 0.9
      caOffsetRef.current.y *= 0.9
      if (Math.abs(caOffsetRef.current.x) < 0.00001) {
        caOffsetRef.current.set(0, 0)
      }
    }
  })

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {bloomEnabled && <SelectiveBloom />}
      
      {!prefersReducedMotion && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={caOffsetRef.current}
          radialModulation={false}
          modulationOffset={0.15}
        />
      )}
      
      <Vignette 
        offset={POST_PROCESSING.vignette.offset} 
        darkness={POST_PROCESSING.vignette.darkness} 
      />
    </EffectComposer>
  )
}

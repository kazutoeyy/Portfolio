/**
 * PostProcessing.jsx — Effect composer pipeline
 * Bloom + Vignette + ChromaticAberration (subtle) + RadialBlur (transition)
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Vignette, ChromaticAberration, SelectiveBloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import RadialBlurEffect from './RadialBlurEffect'
import useQualityStore from '../../stores/useQualityStore'
import useSceneStore from '../../stores/useSceneStore'
import { POST_PROCESSING, QUALITY } from '../../utils/constants'

export default function PostProcessing() {
  const { tier } = useQualityStore()
  const caOffsetRef = useRef(new Vector2(0, 0))
  const radialBlurRef = useRef(null)
  
  // Disable bloom if quality is low
  const bloomEnabled = QUALITY[tier]?.bloom ?? true

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  // Create radial blur effect instance
  const radialBlurEffect = useMemo(() => new RadialBlurEffect(), [])

  // Drive blur + CA intensity from transition progress
  useFrame(() => {
    if (prefersReducedMotion) return

    const { isTransitioning, transitionProgress } = useSceneStore.getState()
    
    if (isTransitioning && transitionProgress > 0) {
      // Bell curve: sin(progress * PI) peaks at 0.5
      const bell = Math.sin(transitionProgress * Math.PI)

      // Radial blur: main motion blur effect
      radialBlurEffect.strength = bell * 0.12

      // CA: subtle accent (reduced from previous)
      const caIntensity = bell * POST_PROCESSING.chromaticAberration.offset[0] * 0.5
      caOffsetRef.current.set(caIntensity, caIntensity)
    } else {
      // Lerp back to zero when not transitioning
      radialBlurEffect.strength *= 0.9
      if (radialBlurEffect.strength < 0.001) radialBlurEffect.strength = 0

      caOffsetRef.current.x *= 0.9
      caOffsetRef.current.y *= 0.9
      if (Math.abs(caOffsetRef.current.x) < 0.00001) {
        caOffsetRef.current.set(0, 0)
      }
    }
  })

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {bloomEnabled && (
        <SelectiveBloom 
          intensity={0.3} 
          luminanceThreshold={0.6} 
          luminanceSmoothing={0.9} 
          radius={0.4} 
          mipmapBlur 
        />
      )}
      
      {!prefersReducedMotion && (
        <>
          <primitive object={radialBlurEffect} ref={radialBlurRef} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={caOffsetRef.current}
            radialModulation={false}
            modulationOffset={0.15}
          />
        </>
      )}
      
      <Vignette 
        offset={POST_PROCESSING.vignette.offset} 
        darkness={POST_PROCESSING.vignette.darkness} 
      />
    </EffectComposer>
  )
}

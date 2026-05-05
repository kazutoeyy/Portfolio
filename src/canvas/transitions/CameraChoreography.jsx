/**
 * CameraChoreography.jsx — Camera movement system
 * Orchestrates camera transitions between hero/workspace positions
 * Uses GSAP timeline for cinematic camera movement
 * 
 * Camera positions defined in CAMERA constants:
 *   hero:      [0, 0, 12]  — default overview
 *   preZoom:   [0, 0, 14]  — anticipation pullback
 *   zoomIn:    [0, 0, 2]   — into laptop
 *   workspace: [0, 2, 8]   — room overview
 */

import { useRef, useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useSceneStore from '@stores/useSceneStore'
import useInteractionStore from '@stores/useInteractionStore'
import { CAMERA, CAMERA_TRANSITIONS, TIMING } from '@utils/constants'

export default function CameraChoreography() {
  const { camera } = useThree()
  const timelineRef = useRef(null)

  /**
   * Hero → Workspace transition sequence
   * 1. Camera anticipation pullback (hero → preZoom)
   * 2. Camera zoom into laptop (preZoom → zoomIn)
   * 3. Crossfade scene (switch scene store)
   * 4. Camera settle at workspace (zoomIn → workspace)
   */
  const transitionToWorkspace = useCallback(() => {
    // Kill any existing timeline
    if (timelineRef.current) timelineRef.current.kill()

    const { setTransitionProgress, setScene, endTransition } = useSceneStore.getState()

    const tl = gsap.timeline({
      onUpdate: () => {
        setTransitionProgress(tl.progress())
      },
      onComplete: () => {
        endTransition()
        useInteractionStore.getState().enableInteractions()
      },
    })
    timelineRef.current = tl

    // Phase 1: Anticipation pullback (0ms - 300ms)
    tl.to(camera.position, {
      x: CAMERA.preZoom.position[0],
      y: CAMERA.preZoom.position[1],
      z: CAMERA.preZoom.position[2],
      duration: CAMERA_TRANSITIONS.heroToPreZoom.duration,
      ease: CAMERA_TRANSITIONS.heroToPreZoom.ease,
    })

    // Phase 2: Zoom into laptop (300ms - 1500ms)
    tl.to(camera.position, {
      x: CAMERA.zoomIn.position[0],
      y: CAMERA.zoomIn.position[1],
      z: CAMERA.zoomIn.position[2],
      duration: CAMERA_TRANSITIONS.preZoomToZoomIn.duration,
      ease: CAMERA_TRANSITIONS.preZoomToZoomIn.ease,
    })

    // Phase 3: Switch scene during zoom (at ~60% of zoom)
    tl.call(() => {
      setScene('workspace')
    }, null, CAMERA_TRANSITIONS.heroToPreZoom.duration + CAMERA_TRANSITIONS.preZoomToZoomIn.duration * 0.6)

    // Phase 4: Settle at workspace position
    tl.to(camera.position, {
      x: CAMERA.workspace.position[0],
      y: CAMERA.workspace.position[1],
      z: CAMERA.workspace.position[2],
      duration: CAMERA_TRANSITIONS.zoomInToWorkspace.duration,
      ease: CAMERA_TRANSITIONS.zoomInToWorkspace.ease,
    })

  }, [camera])

  /**
   * Workspace → Hero reverse transition
   * Smooth pullback from workspace to hero position
   */
  const transitionToHero = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill()

    const { startTransition, setTransitionProgress, setScene, endTransition } = useSceneStore.getState()
    const { disableInteractions, enableInteractions } = useInteractionStore.getState()

    disableInteractions()
    startTransition()

    const tl = gsap.timeline({
      onUpdate: () => {
        setTransitionProgress(tl.progress())
      },
      onComplete: () => {
        endTransition()
        enableInteractions()
      },
    })
    timelineRef.current = tl

    // Scene switch at start of pullback
    tl.call(() => {
      setScene('hero')
    }, null, 0.3)

    // Smooth pullback to hero position
    tl.to(camera.position, {
      x: CAMERA.hero.position[0],
      y: CAMERA.hero.position[1],
      z: CAMERA.hero.position[2],
      duration: CAMERA_TRANSITIONS.workspaceToHero.duration,
      ease: CAMERA_TRANSITIONS.workspaceToHero.ease,
    }, 0)

  }, [camera])

  // Listen for transition events
  useEffect(() => {
    const handleToWorkspace = () => transitionToWorkspace()
    const handleToHero = () => transitionToHero()

    window.addEventListener('hero-to-workspace', handleToWorkspace)
    window.addEventListener('workspace-to-hero', handleToHero)

    return () => {
      window.removeEventListener('hero-to-workspace', handleToWorkspace)
      window.removeEventListener('workspace-to-hero', handleToHero)
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [transitionToWorkspace, transitionToHero])

  // ESC key → reverse transition when in workspace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const { currentScene } = useSceneStore.getState()
        if (currentScene === 'workspace') {
          window.dispatchEvent(new CustomEvent('workspace-to-hero'))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null // This component only manages camera — no visual output
}

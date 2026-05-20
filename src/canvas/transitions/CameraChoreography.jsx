/**
 * CameraChoreography.jsx — Camera + screen-pull transition v6
 *
 * Forward (hero → workspace):
 *   A. Camera zoom IN z:12→3 (0.5s, motion blur)
 *   B. Portal at laptop screen (trackMode=laptop), opacity fades in
 *   C. Portal DETACH (trackMode=camera), scale up to fullscreen
 *      Camera zoom OUT z:3→workspace.z (0.8s)
 *   D. Scene switch (instant, behind opaque portal)
 *   E. Portal fade → reveal workspace (0.6s)
 *
 * Reverse (workspace → hero):
 *   A. Portal covers workspace (trackMode=camera), opacity 0→1
 *   B. Scene switch, camera to z:3, portal trackMode=laptop
 *   C. Camera zoom OUT z:3→12, portal shrinks naturally
 *   D. Portal fade (seamless into laptop texture)
 *
 * No barrel roll. All keyframes: power2.inOut
 */

import { useRef, useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import useSceneStore from '@stores/useSceneStore'
import useInteractionStore from '@stores/useInteractionStore'
import { CAMERA } from '@utils/constants'

const EASE = 'power2.inOut'
const ZOOM_CLOSE_Z = 3 // Close to laptop
const SCREEN_SCALE = { x: 2.0, y: 1.2 }

const _wp = new THREE.Vector3()

export default function CameraChoreography() {
  const { camera, scene } = useThree()
  const timelineRef = useRef(null)

  const getFullScale = useCallback(() => {
    const vFov = camera.fov * Math.PI / 180
    const h = 2 * Math.tan(vFov / 2) * 1.15
    return { x: h * camera.aspect, y: h }
  }, [camera])

  const getPortal = useCallback(() => {
    return scene.getObjectByName('transition-portal')
  }, [scene])

  /** Calculate portal scale at d=1 to match laptop screen apparent size */
  const calcMatchingScale = useCallback(() => {
    const screen = scene.getObjectByName('laptop-screen')
    if (!screen) return { x: 0.3, y: 0.18 }
    screen.updateWorldMatrix(true, false)
    screen.getWorldPosition(_wp)
    const dist = camera.position.distanceTo(_wp)
    const frustumH = 2 * dist * Math.tan(camera.fov * Math.PI / 360)
    const frac = SCREEN_SCALE.y / frustumH
    const portalH = 2 * Math.tan(camera.fov * Math.PI / 360)
    return { x: frac * portalH * camera.aspect, y: frac * portalH }
  }, [camera, scene])

  // ─── Hero → Workspace ──────────────────────────────────────
  const transitionToWorkspace = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill()

    const { setTransitionProgress, setScene, endTransition } = useSceneStore.getState()
    const portal = getPortal()
    const full = getFullScale()

    const tl = gsap.timeline({
      onUpdate: () => setTransitionProgress(tl.progress()),
      onComplete: () => {
        endTransition()
        useInteractionStore.getState().enableInteractions()
      },
    })
    timelineRef.current = tl

    // ── Reset ──
    if (portal) {
      portal.visible = false
      portal.material.opacity = 0
      portal.scale.set(SCREEN_SCALE.x, SCREEN_SCALE.y, 1)
      portal.userData.trackMode = 'laptop'
      portal.userData.localRotZ = 0
    }

    // ── Phase A: Zoom IN (0.5s) ──
    tl.to(camera.position, {
      z: ZOOM_CLOSE_Z,
      duration: 0.5,
      ease: 'power2.out',
    })

    // ── Phase B: Portal replaces laptop screen (starts t=0.3) ──
    if (portal) {
      tl.call(() => {
        portal.visible = true
        portal.material.opacity = 1
        portal.userData.trackMode = 'laptop'
        portal.scale.set(SCREEN_SCALE.x, SCREEN_SCALE.y, 1)
        // Hide real screen — portal IS the screen now
        const screen = scene.getObjectByName('laptop-screen')
        if (screen) screen.visible = false
      }, null, 0.3)
    }

    // ── Phase C: zoom OUT (starts t=0.65) + DETACH screen (t=0.9) ──

    // Camera zoom OUT — only z-axis, keep laptop centered
    tl.to(camera.position, {
      z: 14,
      duration: 0.9,
      ease: 'power2.inOut',
    }, 0.65)

    if (portal) {
      // Screen DETACH — delayed 0.25s after zoom-out starts
      tl.call(() => {
        const matched = calcMatchingScale()
        portal.userData.trackMode = 'camera'
        portal.scale.set(matched.x, matched.y, 1)
      }, null, 0.9)

      // Scale up to fullscreen (already opacity=1)
      tl.to(portal.scale, {
        x: full.x, y: full.y,
        duration: 0.7,
        ease: 'power3.inOut',
      }, 0.9)
    }

    // ── Phase D: Scene switch (behind opaque portal) ──
    tl.call(() => {
      setScene('workspace')
      const heroGroup = scene.getObjectByName('hero-scene')
      if (heroGroup) heroGroup.visible = false
      camera.position.set(...CAMERA.workspace.position)
      camera.rotation.set(0, 0, 0)
      camera.lookAt(...CAMERA.workspace.target)
    })

    // ── Phase E: Reveal workspace (0.6s) ──
    if (portal) {
      tl.to(portal.material, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '+=0.05')

      tl.call(() => { portal.visible = false })
    }
  }, [scene, camera, getPortal, getFullScale, calcMatchingScale])

  // ─── Workspace → Hero (reverse) ────────────────────────────
  const transitionToHero = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill()

    const { startTransition, setTransitionProgress, setScene, endTransition } = useSceneStore.getState()
    const { disableInteractions, enableInteractions } = useInteractionStore.getState()
    const portal = getPortal()
    const full = getFullScale()

    disableInteractions()
    startTransition()

    // Scroll page to top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const tl = gsap.timeline({
      onUpdate: () => setTransitionProgress(tl.progress()),
      onComplete: () => {
        endTransition()
        enableInteractions()
      },
    })
    timelineRef.current = tl

    // ── Reset: portal fullscreen, covers workspace ──
    if (portal) {
      portal.visible = true
      portal.material.opacity = 0
      portal.scale.set(full.x, full.y, 1)
      portal.userData.trackMode = 'camera'
      portal.userData.localRotZ = 0
    }

    // ── Phase A: Cover workspace (0.4s) ──
    if (portal) {
      tl.to(portal.material, {
        opacity: 1,
        duration: 0.4,
        ease: EASE,
      })
    }

    // ── Phase B: Scene switch (behind opaque portal) ──
    tl.call(() => {
      // Hide workspace 3D objects
      const workspaceGroup = scene.getObjectByName('workspace-scene')
      if (workspaceGroup) workspaceGroup.visible = false

      setScene('hero')
      const heroGroup = scene.getObjectByName('hero-scene')
      if (heroGroup) heroGroup.visible = true

      // Position camera from screen's actual world position (accounts for floating offset)
      const screen = scene.getObjectByName('laptop-screen')
      if (screen) {
        screen.updateWorldMatrix(true, false)
        screen.getWorldPosition(_wp)
        camera.position.set(_wp.x, _wp.y, _wp.z + 1.07)
        camera.lookAt(_wp)
      } else {
        camera.position.set(0, 0, 0.5)
        camera.rotation.set(0, 0, 0)
      }

      // Portal → laptop-tracking (screen fills viewport, no visual jump)
      if (portal) {
        portal.userData.trackMode = 'laptop'
        portal.scale.set(SCREEN_SCALE.x, SCREEN_SCALE.y, 1)
      }

      // Keep laptop screen hidden — portal replaces it
      if (screen) screen.visible = false
    })

    // ── Phase C: Camera zoom OUT (1.5s) — laptop body appears around screen ──
    tl.to(camera.position, {
      x: CAMERA.hero.position[0],
      y: CAMERA.hero.position[1],
      z: CAMERA.hero.position[2],
      duration: 1.5,
      ease: 'power2.inOut',
    }, '+=0.05')

    // ── Phase D: Portal fade near end + restore screen ──
    if (portal) {
      tl.to(portal.material, {
        opacity: 0,
        duration: 0.6,
        ease: 'sine.inOut',
      }, '<+=0.9')

      tl.call(() => {
        portal.visible = false
        const screen = scene.getObjectByName('laptop-screen')
        if (screen) screen.visible = true
      })
    }
  }, [scene, camera, getPortal, getFullScale])

  // ─── Event listeners ───────────────────────────────────────
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

  return null
}

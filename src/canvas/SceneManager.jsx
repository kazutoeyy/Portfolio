/**
 * SceneManager.jsx — Scene switching logic
 * Renders HeroScene / WorkspaceScene based on store state
 * Integrates CameraChoreography + MagneticCollapse for transitions
 */

import useSceneStore from '../stores/useSceneStore'
import { lazy, Suspense } from 'react'
import HeroScene from './hero/HeroScene'
import CameraChoreography from './transitions/CameraChoreography'
import MagneticCollapse from './transitions/MagneticCollapse'
import TransitionPortal from './transitions/TransitionPortal'

const WorkspaceScene = lazy(() => import('./workspace/WorkspaceScene'))

export default function SceneManager() {
  const { currentScene, isTransitioning, previousScene } = useSceneStore()

  return (
    <>
      {/* Transition orchestrators — always mounted */}
      <CameraChoreography />
      <MagneticCollapse />
      <TransitionPortal />

      {/* Scenes — show hero during transition if transitioning FROM hero */}
      {(currentScene === 'hero' || (isTransitioning && previousScene === 'hero')) && (
        <HeroScene />
      )}
      {(currentScene === 'workspace' || (isTransitioning && previousScene === 'workspace')) && (
        <Suspense fallback={null}>
          <WorkspaceScene />
        </Suspense>
      )}
    </>
  )
}

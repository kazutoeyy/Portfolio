import { useFrame } from '@react-three/fiber';
import useSceneStore from '@stores/useSceneStore';
import { CAMERA } from '@utils/constants';

/**
 * HandoffTransition.jsx
 * Tracks window scroll to animate the 3D scene (camera position)
 * when scrolling down from the Workspace room to the DOM sections.
 */
export default function HandoffTransition() {
  const currentScene = useSceneStore((s) => s.currentScene);
  const isTransitioning = useSceneStore((s) => s.isTransitioning);

  useFrame((state) => {
    if (currentScene !== 'workspace' || isTransitioning) return;

    const scrollY = window.scrollY || 0;
    const windowHeight = window.innerHeight;
    const progress = Math.min(scrollY / windowHeight, 1);
    
    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);

    // Default workspace position
    const basePos = CAMERA.workspace.position;
    
    // Animate camera up and back as we scroll down
    state.camera.position.set(
      basePos[0],
      basePos[1] + ease * 3,
      basePos[2] + ease * 5
    );
    // Add a slight look down effect
    state.camera.lookAt(0, 1 - ease * 2, 0);
  });

  return null;
}

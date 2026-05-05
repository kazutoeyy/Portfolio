/**
 * HeroScene.jsx — Hero scene container
 * Contains: FloatingSystem (6 objects) + HeroText + HeroHint
 */

import FloatingSystem from './FloatingSystem'
import HeroText from './HeroText'
import HeroHint from './HeroHint'

export default function HeroScene() {
  return (
    <group>
      <FloatingSystem />
      <HeroText />
      <HeroHint />
    </group>
  )
}

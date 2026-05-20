/**
 * HeroScene.jsx — Minimalist hero scene
 * Contains: Laptop (center) + HeroText + HeroClickHint + ParticleField
 */

import Laptop from './objects/Laptop'
import HeroText from './HeroText'
import HeroClickHint from './HeroClickHint'
import ParticleField from './ParticleField'

export default function HeroScene() {
  return (
    <group name="hero-scene">
      <Laptop position={[0, -0.3, 0]} />
      <HeroText />
      <HeroClickHint />
      <ParticleField count={80} />
    </group>
  )
}

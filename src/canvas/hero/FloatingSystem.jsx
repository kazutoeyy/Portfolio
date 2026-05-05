/**
 * FloatingSystem.jsx — Container for 6 floating objects
 * Manages orbital positioning, floating motion, and focus state
 */

import { useRef } from 'react'
import useOrbitalSystem from '@hooks/useOrbitalSystem'
import Laptop from './objects/Laptop'
import UIToggle from './objects/UIToggle'
import ColorBlob from './objects/ColorBlob'
import Gear from './objects/Gear'
import Phone from './objects/Phone'
import CoffeeCup from './objects/CoffeeCup'

const OBJECT_MAP = {
  laptop: Laptop,
  uiToggle: UIToggle,
  colorBlob: ColorBlob,
  gear: Gear,
  phone: Phone,
  coffee: CoffeeCup,
}

export default function FloatingSystem() {
  const orbitalPositions = useOrbitalSystem()

  return (
    <group>
      {orbitalPositions.map((item, index) => {
        const ObjectComponent = OBJECT_MAP[item.id]
        if (!ObjectComponent) return null

        return (
          <ObjectComponent
            key={item.id}
            position={item.position}
            config={item.config}
            index={index}
          />
        )
      })}
    </group>
  )
}

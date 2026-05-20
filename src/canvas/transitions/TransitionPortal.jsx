/**
 * TransitionPortal.jsx — 3D portal plane with dual tracking
 *
 * Two modes controlled by userData.trackMode:
 * - 'laptop': copies laptop-screen mesh world position/quaternion
 * - 'camera': positions 1 unit in front of camera
 *
 * CameraChoreography switches modes when portal is opaque (invisible jump).
 */

import { useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const _dir = new THREE.Vector3()
const _pos = new THREE.Vector3()
const _quat = new THREE.Quaternion()

export default function TransitionPortal() {
  const { camera, scene } = useThree()

  useEffect(() => {
    const texture = new THREE.TextureLoader().load('/workspace-preview.png')
    texture.colorSpace = THREE.SRGBColorSpace

    const geo = new THREE.PlaneGeometry(1, 1)
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.name = 'transition-portal'
    mesh.renderOrder = 999
    mesh.frustumCulled = false
    mesh.visible = false

    mesh.userData.trackMode = 'camera' // 'laptop' | 'camera'
    mesh.userData.localRotZ = 0

    scene.add(mesh)

    return () => {
      scene.remove(mesh)
      geo.dispose()
      mat.dispose()
      texture.dispose()
    }
  }, [scene])

  useFrame(() => {
    const mesh = scene.getObjectByName('transition-portal')
    if (!mesh || !mesh.visible) return

    if (mesh.userData.trackMode === 'laptop') {
      // Track laptop screen position, but face camera (billboard)
      const screen = scene.getObjectByName('laptop-screen')
      if (screen) {
        screen.updateWorldMatrix(true, false)
        screen.getWorldPosition(_pos)
        mesh.position.copy(_pos)
        mesh.quaternion.copy(camera.quaternion) // face camera, no tilt
      }
    } else {
      // Track camera center (1 unit in front)
      _dir.set(0, 0, -1).applyQuaternion(camera.quaternion)
      mesh.position.copy(camera.position).addScaledVector(_dir, 1)
      mesh.quaternion.copy(camera.quaternion)
      mesh.rotateZ(mesh.userData.localRotZ || 0)
    }
  })

  return null
}

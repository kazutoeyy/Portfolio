import { Environment } from '@react-three/drei'

export default function EnvironmentSetup() {
  return (
    // Studio preset — professional softbox lighting for metallic reflections
    <Environment preset="studio" background={false} />
  )
}

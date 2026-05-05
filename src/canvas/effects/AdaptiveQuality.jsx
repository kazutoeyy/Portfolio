import { PerformanceMonitor } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import useQualityStore from '../../stores/useQualityStore'

export default function AdaptiveQuality() {
  const { updateFPS, forceQuality } = useQualityStore()
  const { gl } = useThree()

  return (
    <PerformanceMonitor
      bounds={() => [40, 55]}
      onIncline={() => {
        forceQuality('high')
        gl.setPixelRatio(Math.min(2, window.devicePixelRatio))
      }}
      onDecline={(api) => {
        if (api.fps < 30) {
          forceQuality('low')
          gl.setPixelRatio(1)
        } else {
          forceQuality('medium')
          gl.setPixelRatio(1)
        }
      }}
      onChange={({ fps }) => {
        updateFPS(Math.round(fps))
      }}
    />
  )
}

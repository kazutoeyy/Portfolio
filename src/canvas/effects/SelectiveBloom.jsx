import { Bloom } from '@react-three/postprocessing'
import { BLOOM } from '../../utils/constants'

export default function SelectiveBloom() {
  return (
    <Bloom
      luminanceThreshold={BLOOM.threshold}
      luminanceSmoothing={0.025}
      intensity={BLOOM.strength}
      radius={BLOOM.radius}
      mipmapBlur
    />
  )
}

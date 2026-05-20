/**
 * MousePad.jsx — Procedural mouse + mousepad on desk
 * Decorative, no interaction needed
 */

export default function MousePad({ position = [0.9, 0.89, -0.9] }) {
  return (
    <group position={position}>
      {/* Mousepad */}
      <mesh position={[0, -0.005, 0]}>
        <boxGeometry args={[0.28, 0.005, 0.32]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Mouse body */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Mouse top curve (rounded) */}
      <mesh position={[0, 0.03, -0.01]}>
        <sphereGeometry args={[0.035, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Scroll wheel */}
      <mesh position={[0, 0.03, 0.01]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.015, 8]} />
        <meshStandardMaterial color="#3A3A3A" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

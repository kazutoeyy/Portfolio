/**
 * Keyboard.jsx — Procedural keyboard on desk
 * Decorative, no interaction needed
 */

export default function Keyboard({ position = [0, 0.89, -0.9] }) {
  return (
    <group position={position}>
      {/* Keyboard base */}
      <mesh>
        <boxGeometry args={[1.2, 0.03, 0.45]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Key rows (simplified — 4 rows of rectangles) */}
      {[0.14, 0.05, -0.04, -0.13].map((z, row) => (
        <group key={row} position={[0, 0.02, z]}>
          {Array.from({ length: 10 - row }).map((_, col) => {
            const totalWidth = (10 - row) * 0.1
            const x = -totalWidth / 2 + col * 0.1 + 0.05
            return (
              <mesh key={col} position={[x, 0, 0]}>
                <boxGeometry args={[0.08, 0.015, 0.07]} />
                <meshStandardMaterial
                  color="#242424"
                  metalness={0.4}
                  roughness={0.5}
                />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* Spacebar */}
      <mesh position={[0, 0.02, -0.18]}>
        <boxGeometry args={[0.5, 0.015, 0.07]} />
        <meshStandardMaterial color="#242424" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Knot() {
  const mesh = useRef<Mesh>(null)

  useFrame((state, delta) => {
    const m = mesh.current
    if (!m) return
    // Segue o mouse/toque suavemente e gira continuamente
    m.rotation.x += delta * 0.25
    m.rotation.y += delta * 0.35
    m.position.x += (state.pointer.x * 0.8 - m.position.x) * 0.05
    m.position.y += (state.pointer.y * 0.5 - m.position.y) * 0.05
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.32, 160, 24]} />
      <meshStandardMaterial color="#7c9cff" metalness={0.5} roughness={0.25} />
    </mesh>
  )
}

/** Cena 3D. Carregada sob demanda por `Hero3D` (fora do pacote inicial). */
export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <Knot />
    </Canvas>
  )
}

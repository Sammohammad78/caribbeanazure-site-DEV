'use client'

import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

type RGB = `#${string}`

function getCssColor(variable: string, fallback: RGB): RGB {
  if (typeof window === 'undefined') {
    return fallback
  }
  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  if (!resolved) return fallback
  return resolved as RGB
}

function useThemeColors() {
  const [colors, setColors] = useState(() => ({
    brand: getCssColor('--brand-600', '#0F5E9C'),
    brandLight: getCssColor('--brand-400', '#4BA3F7'),
    accent: getCssColor('--accent-amber', '#FFB703'),
  }))

  useEffect(() => {
    const update = () =>
      setColors({
        brand: getCssColor('--brand-600', '#0F5E9C'),
        brandLight: getCssColor('--brand-400', '#4BA3F7'),
        accent: getCssColor('--accent-amber', '#FFB703'),
      })

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return colors
}

interface MousePosition {
  x: number // normalized -0.5 to 0.5
  y: number // normalized -0.5 to 0.5
}

function CameraController({ mousePosition }: { mousePosition: MousePosition }) {
  const { camera } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame(() => {
    // Smooth damping to prevent jitter (lerp factor 0.05 = ~20 frames to reach target)
    targetRotation.current.x += (mousePosition.y * 0.3 - targetRotation.current.x) * 0.05
    targetRotation.current.y += (mousePosition.x * 0.3 - targetRotation.current.y) * 0.05

    camera.position.x = targetRotation.current.y * 2
    camera.position.y = -targetRotation.current.x * 1.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Connection line component
function ConnectionLine({
  start,
  end,
  color,
}: {
  start?: [number, number, number]
  end?: [number, number, number]
  color: string
}) {
  const geometry = useMemo(() => {
    if (!start || !end) return null
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [start, end])

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
      }),
    [color]
  )

  if (!geometry) return null

  return <primitive object={new THREE.Line(geometry, material)} />
}

// Neural Network Particle System
function AINetworkParticles({
  colors,
  mousePosition,
}: {
  colors: ReturnType<typeof useThemeColors>
  mousePosition: MousePosition
}) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create 3D grid of nodes (neural network style)
  const { nodePositions, connections } = useMemo(() => {
    const positions: [number, number, number][] = []
    const links: [number, number][] = []

    // Create 3D grid
    const gridSize = 5
    const spacing = 2.5
    const offset = ((gridSize - 1) * spacing) / 2

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Add some randomness to make it organic
          const jitterX = (Math.random() - 0.5) * 0.3
          const jitterY = (Math.random() - 0.5) * 0.3
          const jitterZ = (Math.random() - 0.5) * 0.3

          positions.push([
            x * spacing - offset + jitterX,
            y * spacing - offset + jitterY,
            z * spacing - offset + jitterZ,
          ])

          // Connect to nearby nodes
          const currentIndex = positions.length - 1
          if (x > 0) links.push([currentIndex, currentIndex - gridSize * gridSize])
          if (y > 0) links.push([currentIndex, currentIndex - gridSize])
          if (z > 0) links.push([currentIndex, currentIndex - 1])
        }
      }
    }

    return { nodePositions: positions, connections: links }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15

      // Mouse influence
      groupRef.current.rotation.y += mousePosition.x * 0.3
      groupRef.current.rotation.x += -mousePosition.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      {nodePositions.map((pos, i) => {
        const delay = i * 0.02
        return (
          <Sphere key={`node-${i}`} args={[0.08, 16, 16]} position={pos}>
            <meshStandardMaterial
              color={i % 3 === 0 ? colors.accent : colors.brandLight}
              emissive={i % 3 === 0 ? colors.accent : colors.brandLight}
              emissiveIntensity={0.6 + Math.sin(delay) * 0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        )
      })}

      {/* Connection lines between nodes */}
      {connections.map(([startIdx, endIdx], i) => (
        <ConnectionLine
          key={`connection-${i}`}
          start={nodePositions[startIdx]}
          end={nodePositions[endIdx]}
          color={colors.brand}
        />
      ))}

      {/* Animated data particles traveling through the network */}
      {[...Array(12)].map((_, i) => {
        const pathIndex = Math.floor(Math.random() * connections.length)
        const connection = connections[pathIndex]
        if (!connection) return null

        const start = nodePositions[connection[0]]
        const end = nodePositions[connection[1]]
        if (!start || !end) return null

        return (
          <AnimatedParticle
            key={`particle-${i}`}
            start={start}
            end={end}
            delay={i * 0.3}
            color={i % 2 === 0 ? colors.brandLight : colors.accent}
          />
        )
      })}

      {/* Lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.8} color={colors.brandLight} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={colors.accent} />
      <ambientLight intensity={0.3} />
    </group>
  )
}

// Animated particle that travels along a path
function AnimatedParticle({
  start,
  end,
  delay,
  color,
}: {
  start: [number, number, number]
  end: [number, number, number]
  delay: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    const t = (state.clock.getElapsedTime() + delay) % 2 // 2 second loop
    const progress = t / 2

    // Interpolate between start and end
    ref.current.position.x = start[0] + (end[0] - start[0]) * progress
    ref.current.position.y = start[1] + (end[1] - start[1]) * progress
    ref.current.position.z = start[2] + (end[2] - start[2]) * progress

    // Fade in/out at edges
    const opacity = Math.sin(progress * Math.PI) * 0.8
    if (ref.current.material instanceof THREE.MeshStandardMaterial) {
      ref.current.material.opacity = opacity
    }
  })

  return (
    <Sphere ref={ref} args={[0.12, 16, 16]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 rounded-full bg-[color:color-mix(in_oklab,var(--brand)_26%,transparent)] blur-xl" />
    </div>
  )
}

function StaticPoster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-64 w-64 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--brand) 32%, transparent) 0%, transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--accent) 28%, transparent) 0%, transparent 65%)',
          boxShadow: '0 0 120px color-mix(in oklab, var(--accent) 40%, transparent)',
        }}
      />
    </div>
  )
}

export function Hero3D({
  className,
  mousePosition = { x: 0, y: 0 },
}: {
  className?: string
  mousePosition?: MousePosition
}) {
  const colors = useThemeColors()

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <StaticPoster />
      </div>
    )
  }

  return (
    <div className={className}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <color attach="background" args={['transparent']} />
          <Suspense fallback={null}>
            <CameraController mousePosition={mousePosition} />

            <Environment preset="city" />

            <AINetworkParticles colors={colors} mousePosition={mousePosition} />

            <EffectComposer>
              <Bloom
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                height={300}
                intensity={1.2}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Hero3D

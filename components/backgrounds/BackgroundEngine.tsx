'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { BackgroundTheme } from '@/lib/backgroundThemes'

/**
 * Caribbean Azure - Modular 3D Background Engine
 * Performance-optimized, theme-aware background system
 */

// Particle system for fluid/minimal effects
function ParticleField({ theme, mousePosition }: {
  theme: BackgroundTheme
  mousePosition: { x: number; y: number }
}) {
  const particlesRef = useRef<THREE.Points>(null)
  const positions = useRef<Float32Array | null>(null)

  // Initialize particle positions
  useEffect(() => {
    if (!positions.current) {
      const count = theme.particles.count
      const pos = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      }

      positions.current = pos
    }
  }, [theme.particles.count])

  useFrame((state) => {
    if (!particlesRef.current || !positions.current) return

    const time = state.clock.getElapsedTime() * theme.motion.speed

    // Animate particles with Perlin-like flow
    const geometry = particlesRef.current.geometry
    const pos = geometry.attributes.position

    for (let i = 0; i < theme.particles.count; i++) {
      const i3 = i * 3

      // Flow animation
      const x = positions.current[i3]
      const y = positions.current[i3 + 1]
      const z = positions.current[i3 + 2]

      // Apply motion based on flow direction
      if (theme.motion.flowDirection === 'horizontal') {
        pos.setX(i, x + Math.sin(time + y * 0.1) * 0.05)
        pos.setY(i, y + Math.cos(time + x * 0.1) * 0.03)
      } else if (theme.motion.flowDirection === 'vertical') {
        pos.setY(i, y + Math.sin(time + x * 0.1) * 0.05)
        pos.setZ(i, z + Math.cos(time + y * 0.1) * 0.02)
      } else {
        // Radial
        const angle = Math.atan2(y, x)
        pos.setX(i, x + Math.sin(time + angle) * 0.03)
        pos.setY(i, y + Math.cos(time + angle) * 0.03)
      }

      // Mouse parallax
      if (theme.motion.parallaxIntensity > 0) {
        pos.setX(i, pos.getX(i) + mousePosition.x * theme.motion.parallaxIntensity * 0.5)
        pos.setY(i, pos.getY(i) - mousePosition.y * theme.motion.parallaxIntensity * 0.5)
      }
    }

    pos.needsUpdate = true
  })

  if (!positions.current) return null

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions.current, 3))

  const color = new THREE.Color(theme.colors.primary)
  const material = new THREE.PointsMaterial({
    size: theme.particles.size,
    color,
    transparent: true,
    opacity: theme.particles.opacity,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })

  return <primitive ref={particlesRef} object={new THREE.Points(geometry, material)} />
}

// Neural grid effect for services page
function NeuralGrid({ theme }: { theme: BackgroundTheme }) {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    const time = state.clock.getElapsedTime() * theme.motion.speed
    gridRef.current.rotation.y = time * 0.1
    gridRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
  })

  const gridSize = 5
  const spacing = 2

  return (
    <group ref={gridRef}>
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const x = (i % gridSize) * spacing - (gridSize * spacing) / 2
        const z = Math.floor(i / gridSize) * spacing - (gridSize * spacing) / 2

        return (
          <Sphere key={i} args={[0.08, 8, 8]} position={[x, 0, z]}>
            <meshStandardMaterial
              color={theme.colors.secondary}
              emissive={theme.colors.primary}
              emissiveIntensity={0.6}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

// Fallback component for loading/errors
function FallbackBackground({ theme }: { theme: BackgroundTheme }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.gradientStart} 0%, ${theme.colors.gradientEnd} 100%)`,
        opacity: 0.15,
      }}
    />
  )
}

// Main Background Engine Component
export function BackgroundEngine({
  theme,
  className = '',
}: {
  theme: BackgroundTheme
  className?: string
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rafIdRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    let ticking = false

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()

      // Throttle to max 60fps (16.67ms between updates)
      if (now - lastUpdateRef.current < 16) {
        return
      }

      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) - 0.5,
            y: (e.clientY / window.innerHeight) - 0.5,
          })
          lastUpdateRef.current = Date.now()
          ticking = false
        })
        ticking = true
      }
    }

    if (theme.motion.parallaxIntensity > 0) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
      }
    }
  }, [theme.motion.parallaxIntensity])

  // Honor reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return <FallbackBackground theme={theme} />
  }

  return (
    <div className={`pointer-events-none ${className}`}>
      <Suspense fallback={<FallbackBackground theme={theme} />}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={theme.performance.dpr}
          gl={{
            antialias: theme.performance.antialias,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <color attach="background" args={['transparent']} />

          {theme.effect === 'neural-grid' ? (
            <NeuralGrid theme={theme} />
          ) : (
            <ParticleField theme={theme} mousePosition={mousePosition} />
          )}

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={0.9}
              height={300}
              intensity={0.8}
            />
          </EffectComposer>

          <ambientLight intensity={0.3} />
        </Canvas>
      </Suspense>
    </div>
  )
}


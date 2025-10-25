'use client'

/**
 * 3D Background Engine
 * WebGL-powered backgrounds with predictive pointer tracking
 * Themes: currents, grid, depth, waves
 */

import { useEffect, useRef, useState } from 'react'
import { initPointerTracking } from '@/lib/interaction/pointer-store'
import { CurrentsTheme } from './themes/currents'
import { GridTheme } from './themes/grid'
import { DepthTheme } from './themes/depth'
import { WavesTheme } from './themes/waves'

export type BackgroundTheme = 'currents' | 'grid' | 'depth' | 'waves' | 'none'

export interface BackgroundEngineProps {
  /** Theme variant */
  theme?: BackgroundTheme
  /** Intensity multiplier (0-1) */
  intensity?: number
  /** Cap device pixel ratio (default: 1.5) */
  dprCap?: number
  /** Show performance debug overlay */
  debug?: boolean
}

export function BackgroundEngine({
  theme = 'currents',
  intensity = 1.0,
  dprCap = 1.5,
  debug = false,
}: BackgroundEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fps, setFps] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || theme === 'none' || prefersReducedMotion) return

    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })

    if (!gl) {
      console.warn('WebGL2 not supported, skipping background')
      return
    }

    // Cap DPR for performance
    const dpr = Math.min(window.devicePixelRatio, dprCap)

    // Resize handler
    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize pointer tracking
    const cleanupPointer = initPointerTracking()

    // Initialize theme
    let cleanup: (() => void) | undefined

    try {
      switch (theme) {
        case 'currents':
          cleanup = CurrentsTheme(gl, canvas, intensity)
          break
        case 'grid':
          cleanup = GridTheme(gl, canvas, intensity)
          break
        case 'depth':
          cleanup = DepthTheme(gl, canvas, intensity)
          break
        case 'waves':
          cleanup = WavesTheme(gl, canvas, intensity)
          break
      }
    } catch (error) {
      console.error('Failed to initialize background theme:', error)
    }

    // FPS counter for debug
    let frameCount = 0
    let lastTime = performance.now()
    const fpsInterval = 1000 // Update every second

    const updateFps = () => {
      const now = performance.now()
      frameCount++
      if (now >= lastTime + fpsInterval) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
    }

    const rafId = requestAnimationFrame(function loop() {
      if (debug) updateFps()
      requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      cleanupPointer()
      cleanup?.()
    }
  }, [theme, intensity, dprCap, debug, prefersReducedMotion])

  // Fallback for reduced motion: static gradient
  if (prefersReducedMotion || theme === 'none') {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--brand) 8%, transparent) 0%, transparent 50%)',
        }}
      />
    )
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ touchAction: 'none' }}
      />
      {debug && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs font-mono p-3 rounded-lg space-y-1">
          <div>FPS: {fps}</div>
          <div>Theme: {theme}</div>
          <div>Intensity: {intensity.toFixed(2)}</div>
          <div>DPR: {Math.min(window.devicePixelRatio, dprCap).toFixed(2)}</div>
        </div>
      )}
    </>
  )
}

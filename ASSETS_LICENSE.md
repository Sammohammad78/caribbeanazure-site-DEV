# 3D Assets License & Attribution

This file tracks all 3D assets used in the Caribbean Azure website, their sources, and licenses.

## Asset Inventory

### Automation Orb
- **File:** Procedurally generated via R3F
- **Source:** Custom implementation in `/components/3d/Hero3D.tsx`
- **License:** Proprietary (Created by Caribbean Azure)
- **Description:** Main hero 3D element - animated node network orb representing AI automation connectivity
- **Size:** ~12KB (gzipped R3F component)
- **Performance:** 60 FPS on mid-range devices, DPR capped at 1.5

## Guidelines for Adding New Assets

### 1. Free Assets (CC0 / Public Domain)

**Recommended Sources:**
- [Poly Haven](https://polyhaven.com/) - HDRIs, textures, models (CC0)
- [Sketchfab](https://sketchfab.com/features/download) - Filter by "Downloadable" + CC0/CC-BY
- [Quaternius](https://quaternius.com/) - Low-poly models (CC0)

**Always document attribution even for CC0 licenses.**

### 2. AI-Generated Assets

**Supported Services:**
- [Meshy.ai](https://www.meshy.ai/) - Text/Image to 3D (meshy-5 model recommended)
  - Export format: GLB with PBR materials
  - License: Check per plan (usually commercial use allowed)

- [Luma Genie](https://lumalabs.ai/genie) - Prompt-based 3D generation
  - Export format: GLB or OBJ
  - License: Check per plan

**When using AI generation:**
1. Document the generation prompt
2. Note the service and date generated
3. Verify license allows commercial use
4. Optimize via pipeline before committing

### 3. Attribution Template

When adding new assets, use this format:

```markdown
### [Asset Name]
- **File:** `public/3d/optimized/filename.glb`
- **Source:** [URL or "Procedurally Generated" or "AI Generated via Meshy"]
- **License:** [CC0 / CC-BY / CC-BY-SA / Proprietary]
- **Attribution:** [If required by license]
- **Description:** [What it's used for in the site]
- **Original Size:** [Before optimization]
- **Optimized Size:** [After gltfpack]
- **Generation Prompt:** [If AI-generated]
```

## Optimization Pipeline

All external 3D assets must be processed through the optimization pipeline:

### Running the Pipeline

```bash
# Run the complete pipeline
./scripts/models.sh

# Or manually optimize a specific model
gltfpack -i public/3d/models/your-model.glb \
  -o public/3d/optimized/your-model.glb \
  -cc -tc -km -kn -si 1.0 -tp
```

### Optimization Steps

1. **Mesh Compression** (`-cc`)
   - Quantizes vertex positions
   - Reduces mesh data by ~70%

2. **Texture Compression** (`-tc`)
   - Compresses embedded textures
   - Maintains visual quality

3. **Metadata Preservation** (`-km -kn`)
   - Keeps materials and normals intact
   - Preserves PBR properties

4. **KTX2 Conversion** (Optional)
   ```bash
   npx gltf-transform uastc input.glb output.glb
   ```
   - Basis Universal texture compression
   - ~50% smaller than PNG/JPG in GLB

### Performance Targets

- **Hero 3D:** <150KB total JS + assets on first paint
- **DPR Capping:** Max 1.5 on mobile devices
- **Frame Rate:** Maintain 60 FPS on mid-range hardware
- **LOD:** Use Level of Detail for complex scenes

## R3F Integration Guide

### Loading Optimized Models

```tsx
import { useGLTF } from '@react-three/drei'

function MyModel() {
  const { scene } = useGLTF('/3d/optimized/my-model.glb')

  return (
    <Suspense fallback={<LoadingFallback />}>
      <primitive object={scene} />
    </Suspense>
  )
}

// Preload for better performance
useGLTF.preload('/3d/optimized/my-model.glb')
```

### Performance Best Practices

1. **Dynamic Imports**
   ```tsx
   const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
     ssr: false,
     loading: () => <StaticPoster />
   })
   ```

2. **DPR Capping**
   ```tsx
   <Canvas dpr={[1, 1.5]}>
   ```

3. **Reduced Motion Support**
   ```tsx
   const prefersReducedMotion =
     window.matchMedia('(prefers-reduced-motion: reduce)').matches

   if (prefersReducedMotion) {
     return <StaticPoster />
   }
   ```

4. **Suspense Boundaries**
   ```tsx
   <Suspense fallback={<LoadingFallback />}>
     <Canvas>
       <Suspense fallback={null}>
         <Model />
       </Suspense>
     </Canvas>
   </Suspense>
   ```

## License Compliance Checklist

- [x] All assets documented with source and license
- [x] Procedural geometry properly attributed
- [ ] CC-BY attributions included in website footer (if applicable)
- [x] No GPL/copyleft licenses used (incompatible with proprietary code)
- [x] AI-generated assets comply with service ToS
- [x] Optimization preserves embedded license metadata
- [x] Fallbacks provided for reduced-motion preference

## External Dependencies

### R3F Ecosystem
- `@react-three/fiber` - MIT License
- `@react-three/drei` - MIT License
- `@react-three/postprocessing` - MIT License
- `three` - MIT License

These libraries are properly licensed for commercial use.

## Updating This Document

When adding new 3D assets:

1. Run the optimization pipeline: `./scripts/models.sh`
2. Add asset details to the "Asset Inventory" section above
3. Document license and attribution requirements
4. Update the date below
5. Commit changes with the asset files

---

**Last Updated:** 2025-10-22
**Pipeline Version:** 1.0.0
**Maintained By:** Caribbean Azure Development Team

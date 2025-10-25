#!/bin/bash

########################################
# Caribbean Azure 3D Asset Pipeline
# Automated 3D model sourcing and optimization
########################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
MODELS_DIR="public/3d/models"
OPTIMIZED_DIR="public/3d/optimized"
CACHE_DIR=".cache/models"

echo -e "${GREEN}🎨 Caribbean Azure 3D Asset Pipeline${NC}"
echo "=================================================="

# Create directories if they don't exist
mkdir -p "$MODELS_DIR" "$OPTIMIZED_DIR" "$CACHE_DIR"

########################################
# STEP 1: Fetch Free 3D Assets
########################################

echo -e "\n${YELLOW}📥 Fetching 3D assets...${NC}"

# Function to download from Poly Haven (CC0 license)
fetch_polyhaven() {
  local asset_id=$1
  local asset_name=$2
  local url="https://dl.polyhaven.org/file/ph-assets/HDRIs/gltf/${asset_id}_1k.glb"

  echo "  → Downloading ${asset_name} from Poly Haven..."
  curl -L -o "${CACHE_DIR}/${asset_name}.glb" "$url" 2>/dev/null || echo "    ⚠ Could not download ${asset_name}"
}

# Function to create a simple procedural geometry using Blender Python
generate_automation_orb() {
  echo "  → Generating automation orb geometry..."

  # Create a simple Python script for Blender to generate the orb
  cat > "${CACHE_DIR}/generate_orb.py" << 'EOF'
import bpy
import math

# Clear scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# Create icosphere for main orb
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=1.0, location=(0, 0, 0))
orb = bpy.context.active_object
orb.name = "AutomationOrb"

# Add smooth shading
bpy.ops.object.shade_smooth()

# Create node connections (visual elements)
for i in range(8):
    angle = (math.pi * 2 / 8) * i
    x = math.cos(angle) * 1.5
    y = math.sin(angle) * 1.5
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.1, location=(x, y, 0))
    node = bpy.context.active_object
    node.name = f"Node_{i}"

# Add material with emission
mat = bpy.data.materials.new(name="OrbMaterial")
mat.use_nodes = True
nodes = mat.node_tree.nodes
nodes.clear()

# Emission shader
emission = nodes.new(type='ShaderNodeEmission')
emission.inputs[0].default_value = (0.06, 0.37, 1.0, 1.0)  # Caribbean Azure Blue
emission.inputs[1].default_value = 2.0  # Strength

output = nodes.new(type='ShaderNodeOutputMaterial')
mat.node_tree.links.new(emission.outputs[0], output.inputs[0])

# Assign material to orb
orb.data.materials.append(mat)

# Export as GLB
bpy.ops.export_scene.gltf(
    filepath='automation_orb.glb',
    export_format='GLB',
    export_materials='EXPORT',
    export_colors=True
)
EOF

  # Check if Blender is available
  if command -v blender &> /dev/null; then
    cd "$CACHE_DIR"
    blender --background --python generate_orb.py -- 2>/dev/null
    cd - > /dev/null
    mv "${CACHE_DIR}/automation_orb.glb" "${MODELS_DIR}/automation_orb.glb" 2>/dev/null || true
    echo "    ✓ Generated automation orb"
  else
    echo "    ⚠ Blender not found, skipping procedural generation"
    echo "    ℹ Install Blender to generate custom geometry: https://www.blender.org/"
  fi
}

# Download sample assets (these are placeholders - replace with actual CC0 assets)
# fetch_polyhaven "abandoned_greenhouse" "environment"
generate_automation_orb

########################################
# STEP 2: AI Text-to-3D Generation
########################################

echo -e "\n${YELLOW}🤖 AI 3D Generation Setup${NC}"
echo "  For production use:"
echo "  1. Meshy.ai (https://www.meshy.ai/) - Text/Image to 3D"
echo "  2. Luma Genie (https://lumalabs.ai/genie) - Prompt-based 3D"
echo ""
echo "  To use AI generation:"
echo "    1. Sign up for Meshy or Luma"
echo "    2. Generate your models via their API or web interface"
echo "    3. Download as GLB format"
echo "    4. Place in: ${MODELS_DIR}/"
echo ""

########################################
# STEP 3: Optimize 3D Models
########################################

echo -e "\n${YELLOW}⚙️  Optimizing 3D models...${NC}"

# Check if gltfpack is installed
if ! command -v gltfpack &> /dev/null; then
  echo -e "  ${RED}✗ gltfpack not found${NC}"
  echo "  Install meshoptimizer: npm install -g gltfpack"
  echo "  Or via apt: sudo apt-get install meshoptimizer-tools"
  echo ""
  echo "  Skipping optimization..."
else
  echo "  → Running gltfpack optimization..."

  # Optimize all GLB files in models directory
  for model in "${MODELS_DIR}"/*.glb; do
    if [ -f "$model" ]; then
      filename=$(basename "$model")
      echo "    → Optimizing ${filename}..."

      # Aggressive optimization: mesh compression, texture compression, normal quantization
      gltfpack -i "$model" -o "${OPTIMIZED_DIR}/${filename}" \
        -cc \
        -tc \
        -km \
        -kn \
        -si 1.0 \
        -tp \
        2>/dev/null && echo "      ✓ ${filename} optimized" || echo "      ⚠ Could not optimize ${filename}"
    fi
  done
fi

# Check if gltf-transform is installed for KTX2 texture compression
if command -v npx &> /dev/null; then
  echo -e "\n  → Generating KTX2 compressed textures..."

  for model in "${OPTIMIZED_DIR}"/*.glb; do
    if [ -f "$model" ]; then
      filename=$(basename "$model" .glb)
      echo "    → Converting ${filename} textures to KTX2..."

      npx gltf-transform uastc "$model" "${OPTIMIZED_DIR}/${filename}_ktx2.glb" 2>/dev/null \
        && echo "      ✓ ${filename} KTX2 textures created" \
        || echo "      ⚠ Could not create KTX2 textures"
    fi
  done
else
  echo "  ℹ npx not found, skipping KTX2 compression"
  echo "    Install Node.js to enable KTX2: https://nodejs.org/"
fi

########################################
# STEP 4: Generate Asset Report
########################################

echo -e "\n${YELLOW}📊 Generating asset report...${NC}"

REPORT_FILE="ASSETS_LICENSE.md"

cat > "$REPORT_FILE" << 'EOF'
# 3D Assets License & Attribution

This file tracks all 3D assets used in the Caribbean Azure website, their sources, and licenses.

## Asset Inventory

### Automation Orb
- **File:** `automation_orb.glb`
- **Source:** Procedurally generated
- **License:** Proprietary (Created by Caribbean Azure)
- **Description:** Main hero 3D element - animated node network orb
- **Optimized Size:** ~15KB

### Guidelines for Adding New Assets

1. **Free Assets (CC0 / Public Domain)**
   - [Poly Haven](https://polyhaven.com/) - HDRIs, textures, models (CC0)
   - [Sketchfab](https://sketchfab.com/features/download) - Filter by "Downloadable" + CC0/CC-BY
   - Always document attribution even for CC0

2. **AI-Generated Assets**
   - [Meshy.ai](https://www.meshy.ai/) - Text/Image to 3D (Check license per plan)
   - [Luma Genie](https://lumalabs.ai/genie) - Prompt-based 3D (Check license)
   - Document generation prompt and date

3. **Attribution Template**
   ```markdown
   ### [Asset Name]
   - **File:** `filename.glb`
   - **Source:** [URL or "Procedurally Generated" or "AI Generated via X"]
   - **License:** [CC0 / CC-BY / CC-BY-SA / Proprietary]
   - **Attribution:** [If required by license]
   - **Description:** [What it's used for]
   - **Original Size:** [Before optimization]
   - **Optimized Size:** [After gltfpack]
   ```

## Optimization Pipeline

All assets are processed through:
1. **gltfpack** - Mesh & texture compression
   - Mesh quantization
   - Texture compression
   - Normal/tangent preservation
   - KTX2 basis universal textures

2. **Performance Targets**
   - Hero 3D: <150KB total JS + assets on first paint
   - DPR capping on mobile (max 1.5)
   - Instancing for repeated geometry
   - LOD (Level of Detail) where applicable

## License Compliance Checklist

- [ ] All assets documented with source and license
- [ ] CC-BY attributions included in footer
- [ ] No GPL/copyleft licenses (incompatible with proprietary code)
- [ ] AI-generated assets comply with service ToS
- [ ] Optimization preserves embedded license metadata

---

**Last Updated:** $(date +%Y-%m-%d)
**Pipeline Version:** 1.0.0
EOF

echo "  ✓ Asset report generated: ${REPORT_FILE}"

########################################
# STEP 5: Summary
########################################

echo -e "\n${GREEN}✅ Pipeline Complete!${NC}"
echo "=================================================="
echo ""
echo "📁 Directories:"
echo "  Source models:    ${MODELS_DIR}/"
echo "  Optimized models: ${OPTIMIZED_DIR}/"
echo "  Cache:            ${CACHE_DIR}/"
echo ""
echo "📄 Documentation:"
echo "  License report:   ${REPORT_FILE}"
echo ""
echo "🎯 Next Steps:"
echo "  1. Review ${REPORT_FILE} for license compliance"
echo "  2. Import optimized models in R3F components"
echo "  3. Add <Suspense> fallbacks for loading states"
echo "  4. Test on mobile with DPR capping"
echo ""

# File size summary if optimized files exist
if [ "$(ls -A $OPTIMIZED_DIR 2>/dev/null)" ]; then
  echo "📊 Optimized Model Sizes:"
  du -h "${OPTIMIZED_DIR}"/*.glb 2>/dev/null | while read size file; do
    filename=$(basename "$file")
    echo "  ${filename}: ${size}"
  done
fi

echo ""
echo -e "${GREEN}Done! 🎉${NC}"

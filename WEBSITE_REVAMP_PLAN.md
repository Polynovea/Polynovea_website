# Polynovea Website Revamp Plan
## Step-by-Step Implementation: 3D Immersive Environment

**Status**: In Progress  
**Last Updated**: 2026-05-21  
**Design Vision**: Cosmic, intelligent, creative fusion of astrophysics, art, music, AI, and data — reading signals from the universe

---

## Phase 1: 3D Foundation & Scene Setup

### Step 1.1: Create Enhanced 3D Scene Component ✅
**Goal**: Set up Three.js scene with cosmic lighting and camera.

**Status**: COMPLETE
- Main `ImmersiveScene.tsx` component created
- Three.js scene with ambient violet light (0.3 intensity)
- Directional white light for signal effect
- Camera positioned for scroll-based Z-movement
- Renderer optimized (pixel ratio capped at 2)
- Integrated into layout.tsx
- Verified: Camera responds to scroll

---

### Step 1.2: Cosmic Void Background ✅
**Goal**: Create a spacious, infinite feeling.

**Status**: COMPLETE
- `Starfield.tsx` component created with 800 particles (desktop) / 200 (mobile)
- Lavender-colored stars (#C4B5E8) with subtle twinkling
- Stars positioned in a sphere around the camera
- Subtle rotation for depth illusion
- Integrated into ImmersiveScene
- Verified: Stars visible, twinkling effect active

---

## Phase 2: Particle System & Atmospheric Effects

### Step 2.1: Responsive Particle System ✅
**Goal**: Create the cosmic "signal" feeling with interactive particles.

**Status**: COMPLETE
- **800 particles** (desktop) → **400** (tablet) → **100** (mobile)
- **Colors**: Lavender (#C4B5E8), violet (#7C3AED), subtle cyan accents
- **Behavior**:
  - Gentle Brownian motion (realistic drift)
  - Mouse repulsion (particles flee cursor — "signals detecting presence")
  - Soft glow (particles emit violet light via canvas sprite texture)
- **Responsive**: Particle count adjusts based on viewport + performance
- **Integrated**: ParticleSystem component added to ImmersiveScene, renders successfully
- **Physics**: Mouse tracking with smooth easing (0.08 factor), repulsion force calculation working

**Deliverable**: ✅ Particles fill the void, respond to mouse, feel alive.

---

### Step 2.2: Waveform & Frequency Visualizations ✅
**Goal**: Show data as visual rhythm.

**Status**: COMPLETE
- **Waveform meshes**: Gold (#E6D3A3) and cyan (#00D9FF) oscillating tubes flowing through space
- **Frequency response**: Tubes animate with sine/cosine waves, respond to scroll speed
- **Glow**: Emissive material (0.6 intensity) for self-illuminating effect
- **Placement**: Positioned between hero and content zones, guide visual flow
- **Animation**: Gentle rotation, vertical oscillation, opacity pulsing based on scroll
- **Size**: TubeGeometry with 12px radius, 30 segments for smooth curves

**Deliverable**: ✅ Data feels visible; users see "information flowing" through the immersive space.

---

## Phase 3: Spatial Zones & Content Mapping

### Step 3.1: Map Existing Sections to 3D Zones ⬜
**Goal**: Translate current page structure into immersive zones.

Content mapping:
```
Current Section → 3D Zone → Z-Position
─────────────────────────────────────
Hero → Entry Zone → z: 0
Architecture → System Flow Zone → z: -2000
Who We Are → Why Different Zone → z: -4000
Projects → Music & Movement Zone → z: -6000
Live Portfolio → Performance Data Zone → z: -8000
FAQ → Signals & Questions Zone → z: -10000
Contact → Waypoint/Landing Zone → z: -12000
```

**Deliverable**: Clear spatial structure for camera to move through.

---

### Step 3.2: Create 3D Geometry for Each Zone ⬜
**Goal**: Give each zone a distinct visual form.

What we build:

| Zone | 3D Form | Visual Identity |
|---|---|---|
| **Entry** | Void with particles | Cosmic emptiness, awe |
| **System Flow** | Connected nodes/cylinders | Data flowing from input → output |
| **Why Different** | Floating geometric shapes | Thesis as sculptural form |
| **Music** | Rotating frames/screens | Stage-like, performance ready |
| **FAQ** | Orbiting question nodes | Knowledge as constellation |
| **Contact** | Landing platform | Gold-accented, destination |

**Deliverable**: Each zone has distinct 3D presence; user recognizes progress.

---

### Step 3.3: Implement Waypoint System ⬜
**Goal**: Allow clickable navigation between zones.

What we build:
- **Waypoint indicators**: Small gold spheres/rings at each zone
- **Click behavior**: Smooth camera flight to zone (2-3 second tween)
- **Hover state**: Gold glow intensifies, floating label appears ("Explore Architecture," etc.)
- **Keyboard**: Arrow keys or `1-7` keys also navigate waypoints

**Deliverable**: Users can jump between zones or scroll through linearly.

---

## Phase 4: Content Integration (Floating Panels)

### Step 4.1: Create Floating Panel Component ⬜
**Goal**: Display existing text/CTAs in 3D space without breaking immersion.

What we build:
- **FloatingPanel.tsx**: 
  - Background: Dark glass (rgba(24, 24, 27, 0.7), blur)
  - Border: Subtle violet glow
  - Text: Existing copy from each section
  - CTAs: "Contact Us," "Explore," etc.
- **Positioning**: Each panel floats at specific zone coordinates
- **Animation**: Fade-in on zone enter, fade-out on scroll past
- **Responsive**: Panels scale on mobile, maintain readability

**Deliverable**: Content readable and integrated; not jarring overlays.

---

### Step 4.2: Integrate Existing Content ⬜
**Goal**: Map all page copy to floating panels.

What we build:
- **Hero copy** → Entry Zone panel
- **Architecture text** → System Flow Zone panels (one per node)
- **Who We Are content** → Why Different Zone panels
- **Project cards** → Music Zone panels (with video integration)
- **FAQ items** → FAQ Zone (expandable panels)
- **Contact form** → Contact Zone (interactive form panel)

**Deliverable**: All content present, accessible, contextual.

---

### Step 4.3: Integrate Images & Videos ⬜
**Goal**: Existing assets displayed within 3D space.

What we build:
- **Video surfaces**: Live portfolio videos projected onto 3D plane/screen meshes
- **Images**: Project thumbnails on rotating frames
- **Responsive**: Videos scale based on viewport
- **Performance**: Lazy-load video textures

**Deliverable**: Multimedia fully integrated; feels native to the environment.

---

## Phase 5: Interaction & Navigation

### Step 5.1: Scroll-Based Camera Movement ⬜
**Goal**: Primary navigation — scrolling moves user through space.

What we build:
- **Scroll listener**: Maps `scrollY` to camera `z` position
- **Easing**: Exponential ease-out (smooth deceleration)
- **Responsive**: Different scroll speeds for different devices
- **Bounds**: Camera stops at last zone (doesn't overshoot)

**Deliverable**: Smooth, natural camera travel through all zones.

---

### Step 5.2: Mouse Parallax & Interaction ⬜
**Goal**: Subtle mouse responsiveness adds depth.

What we build:
- **Camera pan**: Mouse movement pans camera slightly (±10° max)
- **Particle repulsion**: Particles flee cursor (already built in Phase 2.1)
- **Panel interaction**: Hover panels highlights them; click scrolls or expands
- **Mobile**: Touch pan (optional, gentle)

**Deliverable**: Desktop feels interactive; mobile remains smooth.

---

### Step 5.3: Waypoint Click Navigation ⬜
**Goal**: Users can jump between zones.

What we build:
- **Click handler**: On waypoint click, camera tweens to that zone
- **Tween duration**: 2.5 seconds (feels intentional, not jarring)
- **Auto-open panel**: Panel fades in as camera arrives
- **Cancel scroll**: If user scrolls while tweening, tween is cancelled

**Deliverable**: Flexible navigation (scroll + click).

---

## Phase 6: Optimization & Polish

### Step 6.1: Performance Optimization ⬜
**Goal**: Ship-ready performance across all devices.

What we build:
- **Particle LOD**: Particle count scales with device capability
- **Geometry LOD**: Simpler models on mobile
- **Texture optimization**: Compressed, responsive sizing
- **Frustum culling**: Don't render off-screen objects
- **Frame rate**: Target 60 FPS desktop, 30-45 FPS mobile (acceptable)

**Deliverable**: Smooth experience on iPhone 12+, older Android, low-end laptops.

---

### Step 6.2: Mobile Fallbacks ⬜
**Goal**: Maintain immersion on smaller screens.

What we build:
- **Responsive geometry**: Simpler 3D forms on mobile
- **Panel layout**: Full-width on mobile, side-by-side on desktop
- **Particle count**: Drastically reduced (100 particles max)
- **No free pan**: Mouse pan disabled on mobile (scroll only)
- **Touch-friendly**: Larger waypoint hitboxes

**Deliverable**: Mobile users get full immersive experience (optimized).

---

### Step 6.3: Accessibility ⬜
**Goal**: Keyboard navigation, ARIA labels, motion preferences.

What we build:
- **Keyboard nav**: Arrow keys, Tab, Enter for waypoints
- **Screen reader**: Floating panels labeled with ARIA roles
- **Prefers reduced motion**: Disable particle animation + particle fade for users with vestibular sensitivity
- **Fallback text**: All zones have text alternative (not visual-only)
- **Color contrast**: Ensure gold + violet meet WCAG AA on dark backgrounds

**Deliverable**: Fully accessible 3D experience.

---

### Step 6.4: Visual Polish ⬜
**Goal**: Final refinements for premium feel.

What we build:
- **Glow bloom**: Subtle post-processing bloom on gold/violet accents
- **Motion blur**: Slight motion blur on camera movement (cinematic feel)
- **Panel shadows**: Inset shadows on floating panels (depth)
- **Particle twinkling**: Subtle opacity flicker (stars)
- **Transition effects**: Panel fade-ins, zoom-in on waypoint arrival

**Deliverable**: Premium, polished experience ready to ship.

---

## Implementation Timeline

| Phase | Steps | Effort | Status |
|---|---|---|---|
| **Foundation** | 1.1-1.2 | Setup, lighting, void | ✅ |
| **Particles** | 2.1-2.2 | Particles, waveforms | ✅ 2.1, ⬜ 2.2 Next |
| **Zones** | 3.1-3.3 | Spatial structure, waypoints | ⬜ |
| **Content** | 4.1-4.3 | Panels, integration | ⬜ |
| **Interaction** | 5.1-5.3 | Navigation, mouse, clicks | ⬜ |
| **Polish** | 6.1-6.4 | Performance, mobile, a11y | ⬜ |

---

## Key Files to Create/Modify

| File | Purpose | Status |
|---|---|---|
| `components/ImmersiveScene.tsx` | Main 3D scene | ✅ |
| `components/FloatingPanel.tsx` | Content panels in 3D | ⬜ |
| `components/Starfield.tsx` | Starfield background | ✅ |
| `components/ParticleSystem.tsx` | Interactive particles | ✅ |
| `components/WaveformViz.tsx` | Data visualization | ⬜ Next |
| `components/ZoneGeometry.tsx` | 3D zone meshes | ⬜ |
| `components/Waypoints.tsx` | Navigation waypoints | ⬜ |
| `hooks/useScrollCamera.ts` | Scroll-based camera logic | ✅ |
| `hooks/useWaypoints.ts` | Waypoint navigation | ⬜ |
| `utils/threeLights.ts` | Lighting setup | ✅ |
| `utils/deviceOptimization.ts` | Device-specific tuning | ⬜ |

---

## Design Tokens (Reference)

**Colors**:
- Deep black: `#0A0A0A`
- Dark bg: `#121212`
- Card surface: `#18181B`
- Violet accent: `#7C3AED`
- Champagne gold: `#E6D3A3`
- Lavender particles: `#C4B5E8`
- Cyan accent: `#00D9FF`

**Lighting**:
- Ambient: Violet, intensity 0.3
- Directional: White, intensity 0.8
- Point lights: Gold, intensity varies

**Speeds**:
- Camera tween: 2.5s
- Panel fade: 0.65s
- Particle drift: slow (0.5-1.0 units/frame)

---

**Next Step**: Begin Step 1.1 — Create Enhanced 3D Scene Component

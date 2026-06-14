# Design System: Nguyễn Bùi Gia Huy — Wabi-sabi Cinematic Portfolio

> Version: 1.0 — Generated from full design session
> Dials: VARIANCE 8 / MOTION 8 / DENSITY 3

---

## 1. Visual Theme & Atmosphere

A void-dark interface that breathes. The atmosphere is deliberate silence interrupted
by precise moments of rust and light — like a Japanese ink painting with one red brushstroke.

Objects emerge from darkness rather than appear. Typography leads; 3D follows.
Negative space is not empty — it is the design. Every pixel visible has earned its place.

**Mood:** Wabi-sabi Dark. Imperfection is intentional. Nothing reaches full opacity.
**Density:** Art Gallery Airy (3/10) — generous void, sparse content, each element isolated.
**Variance:** Offset Asymmetric (8/10) — no centered layouts, no equal columns, deliberate misalignment.
**Motion:** Cinematic Choreography (8/10) — 3D scroll-driven objects, GSAP SplitText reveals,
breathing letter-spacing, emerge-from-void sequences with precise timing.

The experience unfolds in three layers:
1. Hero — typography first, void pause, then 3D objects emerge sequentially
2. Scroll — DOM sections with editorial animations, 3D objects persist as floating overlay
3. Sections — each with its own narrative motion personality

---

## 2. Color Palette & Roles

### Neutrals (Primary)
- **Void** (`#0A0A0A`) — Canvas background. Not pure black. Deep charcoal with warmth.
- **Ink** (`#1A1814`) — Secondary surface, subtle section dividers
- **Soot** (`#1E1B17`) — Borders, separator lines (0.5px only — never 1px+ for dividers)
- **Ash** (`#3A3530`) — Muted labels, nav items inactive, metadata
- **Stone** (`#7A7268`) — Body text, descriptions, secondary content
- **Washi** (`#C0B8AE`) — Primary readable text, nav items active
- **Rice** (`#E8E2D9`) — Hero name, section headings, highest emphasis text

### Accent (Single — Use Sparingly)
- **Rust** (`#8B3A2A`) — The only accent. Divider lines, active states, one bloom point on Thread object.
  Used maximum 3 times per viewport. Never as background fill, only as stroke/text/point.
- **Vermillion** (`#C0392B`) — Rust's hover/active escalation. Never used as default state.

### Rules
- Maximum 1 accent color total. Rust is it.
- No gradients anywhere. No color mixing.
- No blue, no purple, no teal, no green — strictly warm monochrome + rust.
- Objects in 3D scene: near-black to ash tone only. Never colored.
- Opacity is the only "color" variation allowed on 3D materials.

---

## 3. Typography Rules

### Font Stack
- **Display / Headings:** `DM Serif Display`, serif — italic variant primary.
  Track: `-0.02em` to `-0.03em`. Line-height: `1.05`. Never bold weight.
  Used for: hero name, section headings, pull quotes.
  Scale: `clamp(36px, 8vw, 9rem)` hero, `clamp(24px, 4vw, 56px)` sections.

- **Body / UI / Labels:** `IBM Plex Mono`, monospace — Light (300) weight primary.
  Track: `0.12em` to `0.2em` for labels/nav. `0em` for body paragraphs.
  Line-height: `1.8` to `1.9` for body. `1.0` for labels.
  Used for: body text, nav labels, section numbers, stats, form fields, metadata.
  Size: `10px` labels, `11px` nav, `13px` body, `32px` stats numbers.

### Hierarchy Rules
- DM Serif Display italic = what user FEELS (name, section identity, quotes)
- IBM Plex Mono light = what user READS (information, navigation, data)
- Never use DM Serif for body copy. Never use IBM Plex Mono for hero headings.
- Section numbering: `"01 — About"` in IBM Plex Mono, 9px, letter-spacing 0.3em, color Ash.

### Breathing Reveal (Contact section signature)
- Heading letter-spacing animates: `-0.03em → 0.05em` on scroll enter.
- Duration 600ms, power2.out easing. This is the "breathing reveal" — only used on Contact.

### Banned
- Inter (too generic)
- System fonts in any heading context
- Bold weight on DM Serif Display (Regular italic only)
- Underlines on text (use rust line separator instead)
- All-caps on serif headings

---

## 4. Component Stylings

### Navigation — Context-Aware (3 states)
**State 1 — Hero scene:**
- No nav visible. Only `"GH."` at top-left: fixed, 11px IBM Plex Mono, color Ash at 50% opacity, pointer-events none.
- Nothing else. Hero owns the screen.

**State 2 — DOM Scroll sections:**
- Vertical progress bar: fixed left-24px, 2px wide, 120px tall, background Soot.
- Active fill: Rust, animates height based on scroll progress.
- Hover state: expands to 140px wide, reveals section labels in IBM Plex Mono 9px.
- Collapse on blur: 250ms ease-out transition.
- No horizontal nav bar. No pill. No hamburger on desktop.

### Section Headings (SectionHeading component)
- Label: IBM Plex Mono 9px, letter-spacing 0.3em, color Ash, uppercase. `"01 — About"`
- Heading: DM Serif Display italic, clamp(24px, 4vw, 48px), color Rice.
- Rust accent: `width: 40px, height: 1.5px, background: #8B3A2A` — below heading, not underline.
- Scroll reveal: opacity 0→1, translateY 8px→0, 600ms power2.out.

### About Section
- Layout: CSS Grid `35% / 65%`, NOT flexbox. `gap: 0`. Padding top: 120px minimum.
- Image column (35%): Portrait 2:3 ratio (260px × 390px). `grayscale(100%) contrast(1.15)`.
  `border-radius: 2px`. `margin-top: -32px` offset above text block (desktop only).
  Sub-label: IBM Plex Mono 10px, letter-spacing 0.2em, color Ash, below image.
- Text column (65%): Label → Name (DM Serif italic large) → Tagline (IBM Plex Mono 13px, color Rust, uppercase) → Rust divider → Single paragraph body → Stats block.
- Stats: Two numbers side-by-side with `/` separator. Number: DM Serif 32px, color Rice. Label: IBM Plex Mono 10px, color Ash, display block below number. No card boxes. No borders.
- Mobile (<768px): Stack vertically. Image full width 280px height object-fit cover. Offset disabled.

### Skills Section — Editorial Table
- Layout: Two-column table. Left column 200px fixed (group names). Right column fluid (tech list).
- Vertical separator line: 1px, background Soot, positioned at left=200px, runs full table height.
  Animates scaleY 0→1 on scroll enter, transform-origin top, 600ms power2.inOut.
- Group name: IBM Plex Mono 10px, letter-spacing 0.2em, color Ash, uppercase. Top-aligned.
- Tech items: plain text nodes separated by `·` (color Ash). IBM Plex Mono Light 13px, color Stone.
  Hover individual tech: color transitions to Washi in 200ms. No border, no tag, no background.
- Each row: border-top 0.5px Ink. Padding 24px vertical. Min-height 64px.
- Row stagger on scroll: delay 80ms per row, opacity 0→1 + translateX -8px→0, 400ms power2.out.
- No cards. No tag pills. No icons next to tech names.

### Projects Section
- Layout: Pinned title left while content scrolls right (GSAP ScrollTrigger pin).
- Project preview: dark container with 1px solid Soot border — defines edge against background.
- Case study structure: Problem → Solution → Result + tech stack.
- Tech tags: flat text, no background fill, no border. Same IBM Plex Mono style as Skills.

### Experience Section
- Layout: Pinned timeline indicator left, content scrolls right.
- Cinematic fade-through: each experience item fades in as previous fades out.
- Timeline marker: 2px Rust vertical line with dot at current item.

### Contact Section
- Heading: DM Serif Display italic with breathing reveal animation (letter-spacing -0.03em→0.05em).
- Form: Bottom-border inputs only. No box border.
  - `border-bottom: 1px solid #3A3530` (Ash). Focus: border-bottom Rust, 200ms transition.
  - Placeholder: color Ash (#3A3530). Input text: color Washi.
  - Label: above input, IBM Plex Mono 9px, letter-spacing 0.2em, color Ash, uppercase.
- Submit button: text-only `[ SEND MESSAGE ]`. IBM Plex Mono, color Rust. No background, no border-box.
  Hover: color Vermillion, letter-spacing +0.01em, 200ms transition.
- Form reveal: 400ms delay after heading, stagger 120ms per field. opacity 0→1, translateY 20px→0.
- Social links: IBM Plex Mono 11px, color Stone. Hover: color Washi + rust underline 1px appears.
- No social icons. Text links only.

### Loading Screen — "Ink Drying"
- SVG stroke-dashoffset animation of name "Gia Huy" written in DM Serif Display italic path.
- Stroke color: Rust (#8B3A2A) → transitions to Ash (#3A3530) when load complete ("ink drying").
- Progress synced to R3F useProgress — stroke length = actual load progress. Not fake animation.
- Background: Void (#0A0A0A). No other elements.
- Fade out to void → hero emerge. No cut.

### Custom Cursor
- Default: 4px dot (Rice) + 24px ring (0.5px Ash border). Gap between dot and ring.
- Hover 3D objects: ring expands to 32px, border-color Rust, 200ms ease.
- Hover links/text: ring morphs to show `"view"` text in IBM Plex Mono 8px, color Rust.
- Click: ring pulse outward + collapse, 200ms.
- Implemented via 2D canvas + GSAP quickTo. Never via CSS cursor property.

---

## 5. Layout Principles

### Grid Philosophy
- CSS Grid primary. Flexbox only for single-axis alignment.
- Never `calc()` percentage math for column widths. Use `grid-template-columns` with explicit values.
- Asymmetric splits: 35/65, 40/60, 30/70 — never 50/50.
- Max-width: 1400px centered. Content padding: `clamp(1.5rem, 4vw, 3rem)`.
- Section padding top: minimum 120px on desktop, `clamp(64px, 10vh, 120px)` responsive.

### Spacing Philosophy — "Ma" (Japanese negative space)
- Negative space is not empty. It is intentional pause.
- Between major elements: generous. Between related elements: tight.
- Rust accent lines (40px width) create visual breathing room — they are spacers, not decoration.
- Vertical rhythm: 32px / 48px / 64px / 96px / 120px — only these values.

### Asymmetry Rules
- No centered hero text. Name is left-weighted or occupies full viewport typographically.
- No equal-column feature rows. No 3-column grids.
- Image in About section deliberately misaligned (margin-top: -32px).
- Section numbers positioned at extreme left margin, creating visual anchor.

### Canvas / DOM Relationship
- R3F Canvas: `position: fixed`, `top: 0`, `left: 0`, `100vw × 100vh`, `z-index: 1`.
- DOM content: `position: relative`, `z-index: 10` minimum.
- HeroText overlay: `position: fixed`, `z-index: 10`, pointer-events none.
- 3D objects persist as floating overlay above DOM scroll sections. Objects fade as scroll progresses.

---

## 6. Motion & Interaction Philosophy

### Core Principle
Motion reveals, never decorates. If an animation doesn't serve comprehension or narrative, remove it.
Objects emerge — they are never placed. Text breathes — it is never static.

### Timing Architecture (Hero emerge sequence)
```
t = 0s    → Typography appears (name + tagline) — fade + translateY 8px→0
t = 0.8s  → Void. Intentional silence. Nothing happens.
t = 1.2s  → ThreadIto drifts in from left, opacity 0→0.6
t = 1.8s  → ScrollPaper emerges from below, opacity 0→0.65
t = 2.4s  → OrigamiOri unfolds in, rotation -8°→0°, opacity 0→0.6
t = 3.0s  → Camera parallax activates (mouse → scene responds)
```

### Opacity Rules (Critical)
- 3D objects NEVER reach opacity 1.0. Cap: 0.7 normal, 0.85 hover.
- Opacity is the primary depth cue. Closer/active = more opaque. Background/scroll-distant = less.
- DOM text: full opacity always. 3D objects: always partial. This separation is intentional.

### Scroll-Driven 3D Behavior
- Scroll data: Lenis `e.progress` (0→1) + `e.velocity` → Zustand `useScrollStore`.
- R3F reads via `useScrollStore.getState()` inside `useFrame` — never React subscription.
- `emergeCompleteRef` pattern: scroll behavior only activates 100ms after emerge animation completes.
- Smooth lerp per object: OrigamiOri 0.08, ThreadIto 0.06, ScrollPaper 0.05 (different "weights").

**OrigamiOri scroll behavior:**
- Vortex orbital path: `angle = sp * π * 4` (2 full spirals), radius expands `1.5→4.0`.
- Wing flap via scale.x/scale.y pulsation, speed tied to scroll velocity.
- Body orientation follows tangent angle — always "facing" flight direction.
- Opacity: 0.6 → 0.2 minimum.

**ThreadIto scroll behavior:**
- Drift right (x: +3.5sp), backward (z: -2.0sp), down (y: -3.0sp).
- Unravel rotation: group.rotation.y += sp * π * 1.5.
- Scale.y: 1 → 1.3 (stretch/"unravel" effect, slight oval distortion acceptable).
- Opacity: 0.6 → 0.1 minimum (fades fastest, creates depth).

**ScrollPaper scroll behavior:**
- Tumble drift left (x: -2.5sp), down (y: -2.0sp), slight backward (z: -1.5sp).
- 3-axis rotation: X tumble (sp * π * 0.5), Y spin (-0.3 + sp * π * 0.8), Z wobble.
- curl edges fade synchronously with paper body.
- Opacity: 0.65 → 0.15 minimum.

### DOM Section Animations
- **Scrubbing text reveal:** SplitText + ScrollTrigger, opacity 0.1→1.0 per word/char tied to scroll position.
- **Stagger float-up (Skills):** Each row translateX -8px→0 + opacity, 80ms delay per row.
- **Pinned layout (About, Experience):** GSAP ScrollTrigger pin, title fixed while content scrolls.
- **Breathing reveal (Contact heading):** letter-spacing animation, once only, not looped.
- **Cinematic fade-through (Experience):** Cross-fade between timeline entries.

### Animation Engine Rules
- R3F useFrame: continuous 3D animations (idle float, rotation, scroll-driven position).
- GSAP: DOM animations, camera orchestration, emerge sequences, ScrollTrigger.
- NEVER use GSAP to animate mesh properties continuously (conflict with R3F render loop).
- NEVER use useState for scroll progress (causes React re-render on every scroll event).
- Hardware-accelerated only: `transform` and `opacity`. Never animate layout properties.

### Easing Vocabulary
- Emerge: `power2.out` — starts fast, gentle landing.
- Camera transitions: `power2.inOut` — symmetric, cinematic.
- Hover: `power2.out`, 200-300ms.
- Scroll scrub: linear (tied to scroll position directly).
- Letter-spacing: `power2.out`, 600ms.

---

## 7. 3D Material Philosophy

### Core Rule: "Light creates color, not texture"
- All 3D objects: `MeshStandardMaterial`. No default material. No `MeshPhongMaterial`.
- `roughness: 0.85–0.95` (matte, not glossy). `metalness: 0–0.1` (no metallic objects).
- Objects are defined by lighting, not by their own color.

### Object-Specific
**ThreadIto (Thread):**
- 7 separate TubeGeometry curves. Each tube: color `#7A2E1A`, roughness 0.95, metalness 0.
- Tube index 0: emissive `#C0392B`, emissiveIntensity 0.15. PointLight at curve endpoint, color Rust.
- Only tube index 0 wrapped in `<Select enabled>` for bloom. No global bloom.
- radialSegments: 8 (not 4 — avoids squared tube appearance).

**ScrollPaper (Paper scroll):**
- PlaneGeometry with vertex displacement for organic edges. DoubleSide.
- Color: Washi (#D4CFC4). roughness 0.92, metalness 0.
- Curl edges: color Stone (#7A7268). Horizontal line hints: color Ash, opacity 0 (invisible, implied).

**OrigamiOri (Origami crane):**
- Custom BufferGeometry with flat shading — `flatShading: true` is mandatory.
- Color: Washi (#D4CFC4). roughness 0.9, metalness 0.
- Hover: edgesGeometry overlay in Rust at opacity 0.3 — reveals structure.

### Lighting (Hero Scene)
- AmbientLight: intensity 0.15, color `#E8E0D0`.
- DirectionalLight warm: position [5,5,-5], intensity 0.8, color `#5A3028`.
- DirectionalLight cool: position [-5,-2,5], intensity 0.8, color `#4A453E`.
- SpotLight overhead: position [0,10,0], intensity 1.0, penumbra 1, angle 0.5.
- No point lights except ThreadIto endpoint (Rust, intensity 0.3, distance 1.5).

### Post-Processing
- SelectiveBloom: intensity 0.3, luminanceThreshold 0.6, luminanceSmoothing 0.9, radius 0.4.
- Applied ONLY to ThreadIto tube index 0 via `<Select enabled>`. Nothing else blooms.
- No global bloom. No depth of field (removed for performance). No vignette in current build.

---

## 8. Anti-Patterns (Strictly Banned)

### Design Banned
- No gradients anywhere (backgrounds, text, borders, overlays).
- No glassmorphism / frosted glass effects.
- No colored backgrounds on any section (void only).
- No card boxes with background + shadow in About stats.
- No border-radius > 4px on any element (2px maximum).
- No shadows (box-shadow or drop-shadow) on any element.
- No icons for social links — text only.
- No scroll indicators, bouncing arrows, "scroll to explore" text.
- No centered hero layout.
- No 50/50 column layouts.
- No 3-column equal grid feature rows.
- No floating pill navigation.
- No hamburger menu on desktop.

### Typography Banned
- Inter (too generic, wrong personality).
- System fonts for headings.
- Bold weight on DM Serif Display.
- All-caps on serif headings (only mono labels use uppercase).
- Underlines (use rust separator lines instead).
- Letter-spacing on serif headings (only on mono labels).

### 3D / Motion Banned
- Opacity 1.0 on any 3D object.
- Global bloom (SelectiveBloom, ThreadIto only).
- GSAP animating mesh properties continuously.
- useState for scroll progress tracking.
- MeshDistortMaterial with metalness > 0.2 (creates "liquid metal AI slop" look).
- icosahedronGeometry as Origami (too obviously generic Three.js default).
- MeshPhongMaterial (no specular highlights).
- Objects popping in at full opacity (always emerge from 0).
- Inline array props in JSX (`position={[0,1,2]}`) — use useMemo refs to prevent re-renders.

### Color Banned
- Purple, teal, blue, green accents.
- Any neon color.
- Pure black (`#000000`).
- Pure white (`#FFFFFF`).
- Warm/cool gray mixing (warm mono palette only).
- Color fills on navigation elements.
- Background colors on form inputs (transparent only).

### Copy Banned
- "Elevate", "Seamless", "Unleash", "Next-Gen", "Innovative".
- Fake round numbers ("99.9% uptime").
- Generic placeholder names ("John Doe", "Project X").
- AI-sounding self-descriptions ("passionate developer who loves coding").

---

## 9. File Architecture Reference

```
src/
├── canvas/
│   ├── CanvasRoot.jsx          # position:fixed wrapper, z-index:1
│   ├── hero/
│   │   ├── HeroScene.jsx       # 3 objects + lights, visible prop for loading guard
│   │   ├── HeroText.jsx        # DOM overlay, position:fixed z-index:10
│   │   └── objects/
│   │       ├── ThreadIto.jsx   # 7 TubeGeometry curves, Select bloom
│   │       ├── ScrollPaper.jsx # PlaneGeometry + vertex curl displacement
│   │       └── OrigamiOri.jsx  # Custom BufferGeometry, flatShading
│   └── effects/
│       └── PostProcessing.jsx  # SelectiveBloom only
├── components/
│   ├── layout/
│   │   └── Header.jsx          # Context-aware: GH. dot (hero) / progress bar (DOM)
│   ├── loading/
│   │   └── LoadingScreen.jsx   # SVG stroke ink-drying animation
│   ├── cursor/
│   │   └── CustomCursor.jsx    # 2D canvas, GSAP quickTo
│   └── sections/
│       ├── AboutSection.jsx    # 35/65 grid, grayscale image, flat stats
│       ├── SkillsSection.jsx   # Editorial table, stagger reveal
│       ├── ProjectsSection.jsx # Pinned left, horizontal case studies
│       ├── ExperienceSection.jsx # Cinematic fade timeline
│       └── ContactSection.jsx  # Breathing reveal heading, bottom-border form
└── stores/
    ├── useSceneStore.js        # currentScene: 'loading'|'hero'|'scroll'
    └── useScrollStore.js       # scrollProgress 0→1, scrollVelocity — getState() only
```

---

*This DESIGN.md is the single source of truth for this portfolio's visual identity.*
*Every design decision must be traceable to a rule in this document.*
*When in doubt: less color, more space, slower motion, one fewer element.*
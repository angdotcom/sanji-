# Mobile Legends: Bang Bang — "The Mythic Arena" Portal

A dark fantasy esports registration portal and hero showcase designed to eliminate player anxieties over latency, frame drops, and matchmaking fairness while maximizing pre-registrations with starter rewards.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction and hero spotlight have been aligned with your selections:
> - **Build Architecture**: Modular React 19 + TypeScript with Tailwind CSS and Motion (Framer Motion) for smooth frame pacing and responsive interactivity.
> - **Hero Section Spotlight**: **Lesley (The Deadly Sniper)** taking center stage with sniper crosshairs, camouflage stealth HUD, ballistic particle effects, and tactical sniper scope interactions.
> - **Interactive Enhancements**: Real-time regional ping diagnostic tool (multi-node latency test with jitter and packet loss analysis), tactile Web Audio API game sound effects (sniper lock-on, scope zoom, reward fanfare, tactical clicks), and an interactive voucher claim experience (`MLBB-MYTHIC-2026-STARTER`).
> - **Cinematic Sequencing**: High-fidelity, animatic-style transition design using Framer Motion for story-boarded section reveals and cinematic scroll-triggered motion to enhance the "Mythic Arena" experience.

---

### 1. Overview & Core Concept

- **What It Does**: A high-impact web portal for Mobile Legends: Bang Bang that combines high-stakes competitive branding with interactive proof of performance: regional low-latency netcode, 120 FPS thermal pacing, and Anti-Cheat 4.0 fair matchmaking.
- **Target Audience / Persona**: Competitive MOBA players, mobile gamers looking for low-latency competitive integrity, and returning players seeking exclusive launch rewards.
- **Key Value**: Direct reassurance on network latency and thermal stability paired with instant reward gratification through community milestone tracking and starter hero chests.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **First Impression & Hero Stage (`#arena`)**:
   - Sticky top navigation with brand wordmark, quick section jumps (`#arena`, `#milestones`, `#anti-lag`, `#heroes`), interactive live ping indicator (`15ms Latency`), and sound toggle.
   - Lesley sniper showcase with tactical reticle animation, camouflage stealth toggle, audio feedback, and fast inline pre-registration input with 1-click social auth triggers.
2. **Community Milestone Vault (`#milestones`)**:
   - Live counter displaying `4,850,210 / 5,000,000 Warriors Enlisted (97%)` with animated gradient progress.
   - 3 interactive milestone tiers (1M Battle Points, 3M EXP Pass & Cache, 5M Mythic Choice Chest) with reward inspection tooltips and unlock sound effects.
3. **Anti-Lag & Performance Proof (`#anti-lag`)**:
   - 3 high-contrast engineering cards addressing 15ms Netcode Nodes, 120 FPS Thermal Engine, and Anti-Cheat 4.0 Fair Matchmaking.
   - Interactive Network Diagnostics Tool allowing users to test simulated round-trip ping, jitter, and packet loss across Singapore, Tokyo, Frankfurt, and San Jose server nodes.
4. **Hero Roster Showcase (`#heroes`)**:
   - Filter tabs: `All`, `Marksman`, `Assassin`, `Mage`, `Fighter`, `Tank`.
   - Dynamic cards highlighting champions (Lesley, Gusion, Fanny, Chou, Beatrix, Tigreal) with role badges, difficulty meters (1–5), signature ability tooltips, and "Enlist Hero" triggers.
5. **Registration & Voucher Modal**:
   - Backdrop-blurred tactical modal collecting Player Tag, Email, Region, and Platform preference.
   - Celebratory success state generating voucher `MLBB-MYTHIC-2026-STARTER` with 1-click clipboard copy and official store links (App Store & Google Play).

#### Cinematic Transitions & Animatic Flow
- **Cinematic Scroll Reveals**: Sections animate into view using `framer-motion` `viewport` with `staggerChildren` and `transition: { duration: 0.8, ease: "easeInOut" }` to ensure a premium, paced arrival as the user explores.
- **Animatic Transitions**: Transitions between navigation jumps and section-to-section navigation utilize a story-boarded cross-fade-and-slide sequence to maintain a cohesive, cinematic "Mythic Arena" journey.
- **Lesley Spotlight**: Cinematic entry animation sequence triggered upon `#arena` viewport entrance, including tactical camera zoom and particle-effect scope reticle.

#### Visual Identity & Theme
- **Dominant Void Canvas (60%)**: Deep Midnight Navy (`#111844`) providing an atmospheric abyss backdrop.
- **Structural Surfaces (30%)**: Elevated dark indigo containers (`#161F55`) framed by subtle steel dividers (`#4B5694` / `#7288AE`).
- **Accent Budget (10%)**: Warm Parchment Ivory (`#EAE0CF`) reserved exclusively for primary action triggers and hero headlines; Emerald Green (`#10B981`) reserved for real-time latency telemetry.
- **Typography**: Display headlines set in athletic condensed styling (`Rajdhani` / high-impact sans) with `text-wrap: balance` to eliminate orphans; body prose in clean `Inter` / `Plus Jakarta Sans`; latency and statistics set in tabular numerals (`tabular-nums`).

---

### 3. Key Product Decisions & Trade-Offs

- **Modular React Component Tree over Single-File CDN**:
  - *Chosen*: Clean TypeScript components split across `Navbar`, `HeroSection`, `MilestoneVault`, `AntiLagSection`, `HeroShowcase`, `PingDiagnosticTool`, `RegistrationModal`, and `soundEffects` utility.
  - *Why*: Eliminates CDN network vulnerabilities and Babel runtime overhead while unlocking strict TypeScript type safety and Framer Motion hardware-accelerated animations.
- **Web Audio API Sound Engine vs External MP3s**:
  - *Chosen*: Browser-native Web Audio API synthesizer for sniper lock-on, scope zoom chirps, button clicks, and fanfare.
  - *Why*: Guarantees zero broken external audio asset URLs, instant response time without download lag, and respects user mute preferences with a global audio toggle in the header.
- **Interactive Multi-Node Ping Diagnostic**:
  - *Chosen*: Real-time network probe simulator testing latency curves and jitter against selectable regional clusters.
  - *Why*: Validates the core value proposition of sub-20ms netcode directly inside the player's browser.
- **Framer Motion for Cinematic Animatic Transitions**:
  - *Chosen*: `framer-motion` for all sequence-driven and scroll-driven cinematic effects.
  - *Why*: Provides production-grade performance and declarative syntax required for sophisticated, story-boarded motion design.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                        App Root                              │
│       ┌──────────────────────┬──────────────────────┐        │
│       │ Global Audio Engine  │ Registration Store   │        │
│       │ (Web Audio synth)    │ (localStorage + state)│       │
│       └──────────────────────┴──────────────────────┘        │
└──────────────────────────────┬───────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Sticky Nav  │       │ Hero Arena   │       │ Milestones   │
│ - Brand Insig│       │ - Lesley HUD │       │ - Progress   │
│ - Live Ping  │       │ - Quick Form │       │ - 3 Tiers    │
│ - Sound Mute │       │ - Scope SFX  │       │ - Inspect    │
└──────────────┘       └──────────────┘       └──────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────┐
│ Anti-Lag & Diagnostics       │       │ Mythic Hero Deck     │
│ - 3 Proof Architecture Cards │       │ - Role Filter Tabs   │
│ - Live Ping / Jitter Probe   │       │ - Hero Ability Cards │
│ - Regional Node Selector     │       │ - Direct Enlist Link │
└──────────────────────────────┘       └──────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Registration & Starter Voucher Modal                        │
│ - Validation & Region Selection                             │
│ - Voucher Code Generation (MLBB-MYTHIC-2026-STARTER)        │
│ - 1-Click Clipboard Copy & App Store Links                  │
└─────────────────────────────────────────────────────────────┘
```

#### State & Data Models
- **`RegistrationState`**: Form inputs (`playerTag`, `email`, `region`, `platform`), submission status, and generated claim voucher.
- **`AudioState`**: Mute status persisted in `localStorage`, volume control, and synthesized sound trigger methods.
- **`DiagnosticState`**: Active server node (`Singapore`, `Tokyo`, `Frankfurt`, `San Jose`), running test state, round-trip latency (`ms`), jitter (`ms`), and packet loss percentage.
- **`HeroRoster`**: Hero data objects with attributes (name, title, role, difficulty, passive, ultimate ability, tactical quote, and avatar assets).

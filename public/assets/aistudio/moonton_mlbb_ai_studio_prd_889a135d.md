# Product Requirements Document (PRD) & AI Studio Implementation Guide

**Project Name:** Mobile Legends: Bang Bang — "The Mythic Arena" Web Portal  
**Target Platform:** Google AI Studio (Gemini 1.5 Pro / Flash)  
**Output Architecture:** Single-File Production Web App (`index.html` with React 18, Tailwind CSS CDN, Lucide Icons, and Babel standalone)  
**Concept:** Concept 2 — Cinematic & Character-Driven Dark Fantasy Arena  
**Primary Goal:** Drive user registrations by showcasing high-octane heroes and directly solving player concerns regarding latency, FPS drops, and matchmaking fairness.

---

## 1. Google AI Studio Technical Strategy

Because Google AI Studio excels at generating complete, self-contained, and runnable frontend prototypes, the architecture is tailored to compile **zero-build single-file React**:

- **Runtime:** HTML5 + React 18 & ReactDOM via CDN (`unpkg.com/react@18/umd/react.production.min.js`).
- **Compiler:** Babel Standalone for in-browser JSX transformation.
- **Styling:** Tailwind CSS CDN (`cdn.tailwindcss.com`) with custom script palette configuration.
- **Iconography:** Lucide Icons (`lucide-react` or Lucide CDN icons).
- **Interactivity:** React state hooks for tabs, live ping simulation, registration modal trigger, and reward validation.

---

## 2. Brand Tokens & Tailwind Setup

Inject this exact configuration into the Tailwind configuration script tag:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          void: '#111844',       // Midnight Abyss Background
          card: '#161F55',       // Elevated Container Surface
          indigo: '#4B5694',     // Glows, Borders & Active Tabs
          steel: '#7288AE',      // Secondary Text & Structural Borders
          parchment: '#EAE0CF',  // Headlines & Primary CTA Accent
        },
        status: {
          green: '#10B981',      // 15ms Latency Indicator
        }
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

---

## 3. UI/UX Specifications for AI Studio Generation

### 3.1 Global Sticky Navigation
- **Left:** Combined Moonton & MLBB glowing insignia.
- **Center:** Jump links (`#arena`, `#milestones`, `#anti-lag`, `#heroes`).
- **Right:** 
  - Real-time simulated ping badge (`15ms Latency` with pulsing green dot).
  - High-contrast button (`bg-[#EAE0CF] text-[#111844] font-bold`) triggering the registration modal.

### 3.2 Hero Showcase Stage (`#arena`)
- **Headline:** `ENTER THE MYTHIC ARENA. ZERO LAG. PURE SKILL.` (Rendered in `#EAE0CF` with light drop shadow).
- **Value Statement:** Directly addresses player anxiety: 120 FPS high-definition netcode with sub-20ms regional servers.
- **Quick Registration Input:**
  - Email/Phone text input bordered in `#7288AE`.
  - Action CTA button: `CLAIM FREE EPIC HERO` in `#EAE0CF`.
  - 1-Click Fast Auth triggers: Google, Apple, and Discord.
- **Visual:** Interactive hero splash card (Gusion / Fanny) with dynamic hover glow.

### 3.3 Registration Milestone Vault (`#milestones`)
- **Community Progress Counter:** `4,850,210 / 5,000,000 Warriors Enlisted (97%)`.
- **Progress Bar:** High-contrast gradient filling from `#4B5694` to `#EAE0CF`.
- **3 Reward Tiers:**
  - *Tier 1 (1M):* 500 Battle Points + Magic Dust (`UNLOCKED`).
  - *Tier 2 (3M):* 7-Day Double EXP Pass + Fragment Cache (`UNLOCKED`).
  - *Tier 3 (5M):* Mythic Hero Choice Chest + Border (`97% COMPLETE - UNLOCKS AT LAUNCH`).

### 3.4 Quality Assurance & Anti-Lag Proof (`#anti-lag`)
- **Card 1: Dedicated 15ms Netcode Nodes** — Explains packet loss prevention and dynamic route optimization.
- **Card 2: 120 FPS Thermal-Safe Engine** — Explains stable frame pacing and battery optimization.
- **Card 3: True Skill 5v5 Matchmaking** — Anti-cheat 4.0 and zero pay-to-win stat boosts.

### 3.5 Interactive Mythic Hero Showcase (`#heroes`)
- **Filter Tabs:** `[All]`, `[Assassin]`, `[Mage]`, `[Marksman]`, `[Fighter]`, `[Tank]`.
- **Dynamic Card Deck:**
  - Hero artwork with role badge, difficulty meter (1-5), and signature skill previews.
  - Action link: `Register to Unlock This Hero`.

### 3.6 Full Registration Modal Component
- Interactive modal with backdrop blur (`#111844/90`).
- Fields: Player Tag, Email, Region Selector, Password, Terms Checkbox.
- **Success State:** Displays generated voucher code `MLBB-MYTHIC-2026-STARTER` with download buttons for App Store and Google Play.

---

## 4. Master Prompt for Google AI Studio

Paste the prompt below directly into **Google AI Studio** using **Gemini 1.5 Pro** with `Temperature = 0.4`:

```text
Act as an elite frontend engineer and game UI designer. Generate a single-file, production-ready, fully responsive HTML5 web application for the Mobile Legends: Bang Bang (Moonton) "Mythic Arena" registration portal.

Use React 18 (CDN), ReactDOM (CDN), Babel standalone, and Tailwind CSS (CDN). Include all code inside a single `index.html` file that runs immediately in the browser.

Brand Color Tokens (Mandatory):
- Background: #111844 (Deep Midnight Navy)
- Cards & Elevators: #161F55 with glowing borders in #4B5694
- Accents & Subtitles: #7288AE (Steel Blue)
- Primary CTA & Main Headers: #EAE0CF (Warm Parchment Ivory) with #111844 dark text
- Live Ping Indicator: #10B981 (Emerald Green)

Features & Interactive Logic to Implement in React:
1. Fixed Navbar:
   - Brand logo, smooth-scroll links (#arena, #milestones, #anti-lag, #heroes), live "15ms Latency" pulsing badge, and a "Register Now" button in #EAE0CF.
2. Hero Section:
   - Bold title: "ENTER THE MYTHIC ARENA. ZERO LAG. PURE SKILL."
   - Subtitle reassuring players about 120 FPS performance and low ping.
   - Inline email registration form with CTA "CLAIM FREE EPIC HERO" that opens the registration dialog and pre-fills email.
   - Interactive hero preview card with dynamic hover effects.
3. Registration Milestone Vault:
   - Progress bar showing 4,850,210 / 5,000,000 pre-registrations (97%).
   - 3 interactive reward cards for 1M, 3M, and 5M milestones.
4. Anti-Lag Proof Cards:
   - 3 feature cards addressing low ping, 120 FPS optimization, and fair anti-cheat matchmaking.
5. Interactive Hero Showcase:
   - Filter tabs (Assassin, Mage, Marksman, Fighter).
   - Dynamic cards showing heroes (e.g., Gusion, Fanny, Beatrix, Chou) with difficulty ratings and "Enlist to Play" buttons.
6. Full Registration Modal:
   - Interactive modal supporting Player Tag, Email, Region selector, Password, and Terms checkbox.
   - Upon submission, display a celebratory success screen showing a claimable starter code: "MLBB-MYTHIC-2026-STARTER".

Ensure clean state management, accessible keyboard controls, and zero external build tooling required. Output purely executable HTML.
```

---

## 5. Verification Checklist

- [ ] Single `index.html` structure loads without any Node.js dependencies.
- [ ] Tailwind script initializes palette colors `#111844`, `#4B5694`, `#7288AE`, and `#EAE0CF`.
- [ ] Every CTA triggers the interactive Registration Modal.
- [ ] Filter tabs switch heroes smoothly in React state.
- [ ] Form submission transitions seamlessly to the starter reward voucher view.
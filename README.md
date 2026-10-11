# 🌿 TouchQuest

<div align="center">

![TouchQuest Hero](hero.jpg)

### *“AI gives you the challenge. The real world gives you the answer.”*

[![Theme](https://img.shields.io/badge/Theme-Touch_Grass-2D6A4F?style=for-the-badge&logo=leaflet&logoColor=white)](https://github.com)
[![Architecture](https://img.shields.io/badge/Architecture-Open--Weight_AI-D95C38?style=for-the-badge)](https://github.com)
[![Vision Engine](https://img.shields.io/badge/Vision-Canvas_Computer_Vision-52B788?style=for-the-badge)](https://github.com)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_External-E5A93C?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**TouchQuest** is an AI-powered outdoor photography game designed to break screen addiction and reconnect players with the living world. The game presents photographic challenges focused on everyday observation, natural geometry, and subtle light relationships, then sends players outside to find the answers in their ordinary surroundings.

The screen is the shortest part of the loop:  
**Start → Read → Go Outside → Capture → Return → Verify → Earn → Leave.**

> [!NOTE]
> TouchQuest is built with **zero external framework dependencies** using modern Vanilla HTML5, CSS3, and JavaScript. It runs both as a local web server and directly from your folder via `file:///` with no build steps required.

---

## 🎯 Game Concept & Progression

A complete TouchQuest expedition consists of exactly **3 levels** and **9 photographs** (4 + 3 + 2). Players do **not** configure level timers; the game determines all rules automatically according to the **Golden Curve**:

> **The Golden Curve:**  
> **Photos Required ↓ (4 → 3 → 2)** while **Observation Difficulty ↑ (Easy → Medium → Hard)**

| Level | Tier | Time Limit | Photos | Difficulty | Focus Area |
|:---:|:---:|:---:|:---:|:---:|:---|
| 🟢 | **Level 1: Explorer** | **40 mins** | **4** | Easy | Broad observation of immediate outdoor surroundings (grass, pebbles, flora, shadows). |
| 🟡 | **Level 2: Observer** | **30 mins** | **3** | Medium | Visual relationships & restrictions (non-manmade red, textures touching, cracks). |
| 🔴 | **Level 3: Creative Explorer** | **15 mins** | **2** | Hard | Creative twists (inanimate pareidolia face, nature vs. human interaction). |

---

## ⚡ Key Gameplay Mechanics

### ⏱️ Beat-the-Clock "Done" Button
If a player captures and verifies all required photos before the timer expires, an active **Done** button enables across the header, active quest banner, and footer.
- Stops the level clock immediately.
- Banks remaining seconds as an **XP Speed Bonus**.
- Advances the player to the next round (the next level's countdown only starts when the player chooses to begin).

### 🚨 Level 3 Emergency Extension (+3 Mins)
Level 3 has an intense 15-minute clock. If time expires before completing both creative challenges, players are offered a **one-time +3 Minute Emergency Extension** (`03:00` countdown). It cannot be stacked or reused.

### 🏡 Accessible Everyday Environments
Difficulty does **not** require traveling to mountains, wilderness, or rare wildlife. Every challenge is 100% achievable in an ordinary neighborhood, university campus, garden, or public street. Difficulty comes from:
- Angle, perspective, and framing
- Cast shadows, light gradients, and reflections
- Natural vs. man-made interaction
- Tactile textures and accidental pareidolia

---

## 🔬 Strict Computer Vision Architecture

TouchQuest features an open-weight-inspired **Canvas Computer Vision Engine** that strictly evaluates photographs directly in the browser with zero cloud image uploads:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      TouchQuest Vision Pipeline                        │
├──────────────────────────┬─────────────────────────────────────────────┤
│   Input Capture          │ • Live WebRTC Viewfinder or File Upload     │
├──────────────────────────┼─────────────────────────────────────────────┤
│   Pixel Inspection       │ • HTML5 Canvas downsampling (maxDim: 200px) │
│   & Decomposition        │ • RGB, HSV, and YCbCr color spaces          │
├──────────────────────────┼─────────────────────────────────────────────┤
│   Biometric Filter       │ • Human Skin Chromaticity Filter            │
│                          │ • Immediate rejection of selfies & portraits│
├──────────────────────────┼─────────────────────────────────────────────┤
│   Botanical Metrics      │ • Normalized Green Leaf Index (GLI)         │
│                          │ • Excess Green Index (ExG = 2G - R - B)     │
│                          │ • Floral petal spectral clustering          │
├──────────────────────────┼─────────────────────────────────────────────┤
│   Spatial Geometry       │ • 2D Sobel edge gradients & angle histogram │
│                          │ • Circularity score (CV_d radial variance)  │
│                          │ • Linear coherence & directional peak       │
│                          │ • Bimodal shadow-to-sunlight contrast       │
├──────────────────────────┼─────────────────────────────────────────────┤
│   Output Feedback        │ • Pass / Fail with confidence score         │
│                          │ • Actionable hints & real-time metric pills │
└──────────────────────────┴─────────────────────────────────────────────┘
```

### 🛡️ Why the Verifier is Strict

1. **Human Selfie & Portrait Filter**:
   - Detects human skin tones using combined **YCbCr** ($Cr \in [133, 173]$, $Cb \in [77, 127]$), **RGB chromaticity**, and **HSV** bounds.
   - Selfies or pictures of people are **rejected** with diagnostic tags and actionable advice to point the camera at outdoor plants, stones, or shadows.
   - For **Everyday Pareidolia** challenges, real human faces are explicitly rejected: pareidolia must be an accidental face in an inanimate outdoor object (e.g., weathered tree knots or stone contours).

2. **Agricultural Vegetation Indices (GLI & ExG)**:
   - Greenery challenges calculate the **Normalized Green Leaf Index** ($\text{GLI} = \frac{2G - R - B}{2G + R + B}$) and **Excess Green** ($\text{ExG}$).
   - Requires at least **20% true chlorophyll green coverage**, preventing neutral indoor rooms or clothing from passing.

3. **True Geometry & Texture Analysis**:
   - **Circular Shapes**: Evaluates radial distance variance ($CV_d$), aspect ratio, and radial gradient alignment (minimum circularity score $\ge 60\%$).
   - **Shadow Silhouettes**: Verifies bimodal tonal distribution between deep cast shadow ($\ge 12\%$) and bright sunlit ground ($\ge 18\%$) with contrast $\ge 48\%$.
   - **Linear Alignment**: Uses an angle histogram to verify dominant straight directional edges ($\ge 28\%$).
   - **Weathered Patina**: Measures micro-texture roughness ($\ge 24\%$) across $5 \times 5$ neighborhood grids.

---

## 🏅 Badges & Progression System

Players earn **XP** and level up from *Novice Explorer* to *Touch Grass Legend*:

- **Level 1 Challenge**: `+20 XP`
- **Level 2 Challenge**: `+35 XP`
- **Level 3 Challenge**: `+50 XP`
- **Full Quest Bonus**: `+100 XP`
- **Total per Quest**: **385 XP**

### 🎖️ Collectible Embroidered Patches

| Badge | Title | Requirement |
|:---:|:---|:---|
| 🏅 | **First Explorer** | Complete your first 3-level quest |
| 👀 | **Sharp Eyes** | Complete 10 quests |
| 🌿 | **Nature Lover** | Complete 10 nature-focused challenges |
| 📸 | **Visual Hunter** | Successfully verify 50 photo challenges |
| 🔴 | **Challenge Master** | Complete 10 Level 3 creative challenges |
| 🌎 | **Touch Grass Legend** | Complete 25 full quests |

---

## 📂 Project Structure

```text
touchquest/
├── index.html               # Main semantic HTML5 entry point
├── touchquest.bundle.js     # Standalone bundle for direct file:// & server use
├── build.js                 # Automatic bundle generator
├── server.js                # Zero-dependency Node.js HTTP server
├── package.json             # Scripts and metadata
│
├── css/
│   ├── design-system.css    # Palette tokens, typography, and reset
│   ├── main.css             # Navigation, buttons, modals, and footer
│   ├── components.css       # Hero, How It Works, Levels, Badges, Profile
│   └── quest.css            # Quest interface, laser scanner, timer, diagnostic pills
│
├── js/
│   ├── app.js               # Application coordinator & routing
│   ├── QuestManager.js      # Complete 3-level quest state machine
│   ├── photoVerification.js # Canvas computer vision & strict validation engine
│   ├── challengeGenerator.js# Category balancing & quest formulation
│   ├── challengeHistory.js  # Anti-repetition tracker & smart variation engine
│   ├── playerProgress.js    # XP scoring, explorer ranks, and badges
│   ├── storage.js           # Safe localStorage with in-memory fallback
│   ├── audioFeedback.js     # Procedural Web Audio API sound synthesizer
│   ├── Confetti.js          # Canvas particle victory effects
│   ├── sampleChallenges.js  # Seed database of safe outdoor challenges
│   ├── challengeCategories.js# 12 observation categories & safety rules
│   ├── badges.js            # Badge definitions & unlock criteria
│   ├── Navbar.js            # Navigation header component
│   ├── Hero.js              # Hero section & expedition flow
│   ├── HowItWorks.js        # 4-step outdoor methodology
│   ├── LevelCards.js        # 3 levels cards & progression overview
│   ├── AntiScreenSection.js # Anti-doomscroll manifesto
│   ├── OpenAISection.js     # Open-weight AI architecture specs
│   ├── NextQuestPreview.js  # Smart variation comparison preview
│   ├── BadgeCollection.js   # Collectible badge gallery
│   └── PlayerProfile.js     # Field journal & player statistics
│
└── assets/                  # Artwork, badge textures, and sample photos
    ├── hero.jpg             # Hero viewfinder artwork
    ├── badge_*.jpg          # Embroidered patch graphics
    └── sample_*.jpg         # Test photographs for sample verification
```

---

## 🚀 Getting Started

### Method 1: Open Directly from Folder (Zero Setup)
Simply **double-click [`index.html`](index.html)** in your file explorer or open:
```text
file:///path/to/touchquest/index.html
```
Because TouchQuest includes a pre-compiled [`touchquest.bundle.js`](touchquest.bundle.js), it runs immediately with **no CORS issues** and **no web server required**.

---

### Method 2: Run via Local Web Server
You can also run TouchQuest using the included Node.js server:

1. Open your terminal in the `touchquest` directory:
   ```bash
   cd /path/to/touchquest
   ```

2. Start the server:
   ```bash
   npm run dev
   ```
   *(or `node server.js`)*

3. Open your browser at:
   ```text
   http://localhost:3000
   ```

---

### 🔨 Rebuilding the Bundle
If you edit individual `.js` component files, re-generate the standalone bundle at any time:
```bash
npm run build
```

---

## 🛡️ Safety & Environmental Ethics

Every challenge in TouchQuest is governed by strict safety principles:
- **Ground-Level Only**: No climbing trees, walls, or roofs.
- **Public & Permitted Spaces**: No trespassing on private property.
- **No Roadways**: Never photograph in busy traffic or road lanes.
- **Leave No Trace**: Never break living branches or disturb sensitive wildlife.
- **No Human Portraits**: Respect personal privacy; challenges focus exclusively on outdoor objects and nature.

---

## 📜 License

Distributed under the **MIT License**. Built with open-weight AI principles and modern web standards.

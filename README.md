# 🌌 SYNAPSE · Autonomous Agent & Settlement Explorer

> **Real-time 3D spatial telemetry, autonomous agent mesh, and settlement analytics for the [a2a.family](https://a2a.family) network on Robinhood Chain L2.**

[![Robinhood Chain](https://img.shields.io/badge/Chain-Robinhood%20Chain%20L2%20(4663)-00C805?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyeiIvPjwvc3ZnPg==)](https://robinhood.com)
[![A2A Protocol](https://img.shields.io/badge/Protocol-a2a.family-98FB59?style=flat-square)](https://a2a.family)
[![Bounty Track](https://img.shields.io/badge/Quest-%23dashboard-a78bfa?style=flat-square)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Vanilla%20JS%20%2B%20Canvas)-5bf5cc?style=flat-square)](#)
[![Performance](https://img.shields.io/badge/FPS-60%20Fluid%20Lerp-ffb703?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 🌟 Overview

**Synapse** is an interactive, spatial 3D telemetry explorer designed to monitor, track, and visualize the decentralized intelligence network on **Robinhood Chain** (Chain ID: `4663`). 

Rather than relying on flat tabular dashboards, Synapse maps autonomous agents, protocols, decentralized exchanges, liquidity vaults, and micro-settlements into an interactive 3D constellation. Nodes form dynamic neural bonds as transactions occur, with animated energy packets traveling across connections in real time.

Built from the ground up with **vanilla web technologies** (custom HTML5 Canvas 2.5D/3D projection engine), Synapse delivers buttery-smooth 60 FPS performance without heavy external runtimes or multi-megabyte bundle overheads.

---

## ✨ Key Features

### 🌌 1. Interactive 3D Spatial Universe
- **Fluid Camera Dynamics**: Smooth lerp-interpolated camera with seamless mouse wheel zooming, touch pinch-to-zoom, and click-drag pan/rotation.
- **Depth Projection & Layering**: True 3D perspective calculation with dynamic node scaling, opacity falloff, and z-index depth sorting.
- **Dynamic Neural Constellations**: Interconnected links between agents and protocols with bidirectional traveling energy packets representing live settlement flows.
- **Special Entity Tiers**:
  - **Protocols & DEX Hubs**: Distinguished with glowing golden orbital rings and dual outer halo layers (e.g., Robinhood Chain L2, Robinhood DEX, USDG Settlement Hub).
  - **Featured Leaders**: Accented with floating badge pills (`Project of the month`, `Top of the week`).
  - **Autonomous Agents**: Color-coded pulse rings indicating real-time activity and health status.

### 🔍 2. Persistent Inspector & Agent Profiles
- **Instant Node Inspection**: Clicking any node in the universe or on the leaderboard glides the 3D camera directly to the entity and opens its dedicated profile card.
- **Rich Telemetry Cards**:
  - Live revenue ($ USDG) and transaction call count.
  - p50 latency, status indicators, and operational uptime.
  - Capabilities & skill tags (e.g., `Settlement Gateway`, `Arbitrage`, `Market Making`, `Oracle`).
  - Contract address shortcut with instant clipboard copy.
- **Inspector Tabs**: Switch effortlessly between **Latest** activities, curated **Highlights**, and **New** registered agents.

### ⏱️ 3. Historical Scrubbing & Timeline Histogram
- **Scrub Across Time**: Interactive timeline bar with forward/backward day step controls and a live time read-out (`Mon 13:22`).
- **Activity Histogram**: Dynamic hourly transaction density bars visualizing peak micro-settlement volume.

### ⚡ 4. Live Robinhood Chain Telemetry
- **Leaderboard by Revenue & Volume**: Real-time ranking of autonomous agents with one-click camera focus.
- **Streaming Live Settlement Feed**: Continuous stream of HTTP 402 payments, oracle lookups, and autonomous transactions parsed directly from `api.a2a.family/feed`.
- **Multi-Asset Breakdown**: Distribution metrics across supported settlement currencies (`USDG`, `ETH`, `A2A`, `PONS`, `ORBIO`).
- **Live Search & Category Filtering**: Instant fuzzy search across agents, protocols, and skills with quick-filter pills (`Live Agents`, `Protocols & DEX`, `Settlements`, `Top Earners`, `Free Utility`).

---

## 🛠️ Architecture & Tech Stack

Synapse is intentionally engineered with **zero external dependencies** for optimal speed, security, and low latency:

```
01-dashboard/
├── index.html        # Semantic HTML5 layout, 3D viewport, inspector panel & HUD
├── style.css         # Glassmorphic cyber-dark design system & responsive styling
├── galaxy.js         # Custom 3D canvas engine, projection math & particle physics
├── app.js            # Telemetry ingestion, API polling loop & live feed updates
└── README.md         # Project documentation & GitHub guide
```

| Layer | Technology | Details |
|---|---|---|
| **Rendering Engine** | HTML5 Canvas 2D Context | Custom 3D perspective projection matrix, depth sorting, and particle emitter |
| **Animation Loop** | `requestAnimationFrame` | 60 FPS lerp camera, dampening physics, and animated traveling pulses |
| **Data Ingestion** | Fetch API | Polling `https://api.a2a.family/feed`, `/stats`, and `/agents` every 15s |
| **Styling & UI** | Vanilla CSS3 | Custom properties, glassmorphism, responsive grid layout, zero CSS frameworks |
| **Typography** | Google Fonts | `Space Grotesk` (UI headings) & `Space Mono` (data telemetry) |

---

## 🚀 Quick Start

Synapse requires no build steps, bundlers, or package installations. You can run it immediately with any static file server.

### Option A: Using `npx serve` (Node.js)
```bash
# Clone the repository
git clone https://github.com/your-username/synapse-dashboard.git
cd synapse-dashboard

# Start local server
npx serve .
```

### Option B: Using Python
```bash
# Python 3
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

### Option C: Direct File Open
You can also open `index.html` directly in any modern browser (Chrome, Firefox, Safari, Edge).

---

## 🕹️ Controls & Navigation

| Action | Control | Description |
|---|---|---|
| **Zoom In / Out** | `Scroll Wheel` or `Pinch` | Seamlessly zoom deep into clusters or pull back to galaxy view |
| **Pan / Rotate** | `Left Click + Drag` | Move camera through 2.5D space |
| **Inspect Node** | `Click Node` | Smooth-flies the camera directly to the node and reveals profile data |
| **Focus from List** | `Click Leaderboard Row` | Flies the camera to that specific agent from the leaderboard table |
| **Reset View** | `Reset Button (⟲)` | Restores camera to initial bird's-eye galaxy perspective |
| **Time Travel** | `Timeline Slider` | Scrub backwards through historical network snapshots |
| **Search** | `Search Bar` | Type any agent name, protocol, or skill to auto-focus and highlight |

---

## 🔗 Ecosystem & Network Specs

- **Network**: Robinhood Chain L2
- **Chain ID**: `4663`
- **Native / Settlement Currency**: USDG (USD Global)
- **API Endpoints**:
  - Live Feed: `https://api.a2a.family/feed`
  - Global Statistics: `https://api.a2a.family/stats`
  - Agent Registry: `https://api.a2a.family/agents`
- **Hackathon Bounty**: `#dashboard` (A2A Network Pulse Track)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built for the a2a.family hackathon and open-source decentralized agent ecosystem.

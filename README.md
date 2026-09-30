# Stack It - Lego Memory Game

A 3D memory game built with React and Three.js where players memorize Lego compositions and rebuild them from scattered blocks.

## Features

- **15 Progressive Levels**: From Starter to Expert difficulty
- **3D WebGL Rendering**: Native Three.js with custom raycasting
- **Interactive Grid System**: Multi-layered stacking (up to 4 blocks high)
- **Vibrant Neon Design**: Custom color palette with white edge outlines
- **Dynamic Difficulty**: Increasing grid sizes, block counts, and time constraints
- **Custom Cursors**: Hand-based cursor system with Lego-style animations
- **Smooth UI/UX**: Frosted-glass panels, countdown animations, and level progression
- **Camera Controls**: OrbitControls for 3D scene navigation

## Tech Stack

- React
- Three.js (WebGL)
- Tailwind CSS v4
- TypeScript
- Vite

## Game Mechanics

1. **Memorize Phase**: Study the Lego composition within the time limit
2. **Build Phase**: Reconstruct the pattern from scattered blocks
3. **Level Up**: Progress through 15 increasingly challenging levels
4. **Victory**: Reach "MASTER BUILDER!" status by beating all levels

## Difficulty Tiers

- **Starter** (Levels 1-3): 2x2 grids, 3-4 blocks
- **Easy** (Levels 4-6): 3x3 grids, 5-6 blocks
- **Medium** (Levels 7-9): 4x4 grids, 7-8 blocks
- **Hard** (Levels 10-12): 4x4 grids, 9 blocks
- **Expert** (Levels 13-15): 5x5 grids, 10 blocks

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main game logic and state management
│   └── components/
│       ├── EntryScreen.tsx     # Game start screen
│       ├── MemorizeScreen.tsx  # Memorization phase
│       ├── BuildPhase.tsx      # Building phase
│       ├── LevelUpScreen.tsx   # Level completion screen
│       ├── CountdownAnimation.tsx  # 3-2-1 Lego countdown
│       ├── Scene3D.tsx         # Three.js 3D scene renderer
│       ├── cursors.ts          # Custom cursor system
│       └── ui/
│           └── RedButton.tsx   # Shared Lego-style button
├── imports/                    # Figma-imported assets and components
└── styles/
    ├── theme.css              # Design tokens
    └── fonts.css              # Font imports
```

## Design System

- **Dark frosted-glass panels**: `blur(28px)`, `saturate(160%)`, `rgba(0,0,0,0.45)`
- **Neon color palette**: Vibrant greens, yellows, purples, and blues
- **Voxel forest background**: Shared across game screens
- **CSS-rendered Lego bricks**: Mix-blend-mode overlays for color variations
- **Billboard sprites**: Canvas-based 3D text labels

## Custom Features

- **Move Mode**: Pulsing neon-green outline for repositioning placed blocks
- **Smart Timer System**: Adaptive build times that scale with difficulty
- **Level Strip**: Scrollable progress indicator with CSS Lego brick rendering
- **Character Animations**: Lego character with dynamic message boards and wiggle effects
- **Ghost Preview**: Visual feedback during block placement

## Built with Figma Make

This project was designed in Figma and implemented using Figma Make's web application builder.

---

**Play, Build, Master!** 🧱

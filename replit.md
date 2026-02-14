# iOne Techlabs - Professional Company Website

## Overview
A professional technology company landing page for iOne Techlabs, showcasing software development, cloud solutions, IoT, smart grid, and AI services. Designed with a bold, dark-themed aesthetic inspired by PenguinAI.co and PruTech.com.

## Recent Changes
- **February 2026**: Complete theme overhaul to match PenguinAI/PruTech design language
  - **Dark theme by default** - dark navy-black background throughout (PenguinAI style)
  - Full-screen hero with dark gradient wash, very large bold typography, gold accent
  - Large stat numbers section (500+, 40%, 99.9%) in PenguinAI's bold style
  - Service grid with images in PruTech's clean grid layout (gap-px border pattern)
  - Numbered process layers (1-4) matching PenguinAI's architecture layers
  - Case study section with stats (PruTech style)
  - Simplified about section with team image and stats
  - Clean client grid on dark background
  - Bold CTA section with large typography
  - Contact form with newsletter subscription
  - Minimal dark footer
  - No Winamr subsidiary references anywhere

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: wouter
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui

### Backend (server/)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API Endpoints**:
  - `POST /api/contact` - Submit contact form
  - `POST /api/newsletter` - Subscribe to newsletter

### Key Files
- `client/src/pages/home.tsx` - Main landing page component
- `client/src/index.css` - CSS variables for theming (dark theme default, green/gold accents)
- `design_guidelines.md` - Design system documentation
- `shared/schema.ts` - Data models and validation schemas
- `server/routes.ts` - API endpoints
- `server/storage.ts` - Data storage interface

## Design System
- **Theme**: Dark by default (dark navy-black backgrounds)
- **Primary Color**: Green (148 55% 38% HSL)
- **Accent Color**: Gold (42 80% 52% HSL)
- **Background**: Dark navy (220 15% 6% HSL)
- **Typography**: Inter font family, very large bold headings (up to 8xl)
- **Design Pattern**: PenguinAI-style bold numbers, uppercase labels, numbered layers, PruTech-style clean service grids
- **Hero Style**: Full-screen image with dark gradient wash, large white text with gold accent

## Running the Project
The project runs via `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

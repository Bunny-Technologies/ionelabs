# iOne Techlabs - Professional Company Website

## Overview
A professional technology company landing page for iOne Techlabs, showcasing software development, cloud solutions, IoT, smart grid, and AI services. Designed with a modern, clean aesthetic inspired by sites like PenguinAI and PruTech.

## Recent Changes
- **February 2026**: Complete redesign inspired by PenguinAI.co and PruTech.com
  - Full-width hero with dark wash over background image, bold headline, bottom-aligned stats
  - Service cards with images, descriptions, and "learn more" links (PruTech style)
  - Large impact stats section (PenguinAI style) with descriptive context
  - 4-step process section with numbered steps (PenguinAI layers style)
  - About section with team image, certifications badges, and stats
  - IoT & Smart Grid showcase with hero images
  - Client trust section showing enterprise client names
  - Testimonial cards with quotes and ratings
  - Full-width CTA with background image and dark wash
  - Contact form with newsletter subscription
  - Removed ALL Winamr subsidiary references - clients only listed as clients
  - Clean, modern navigation with minimal links

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
- `client/src/index.css` - CSS variables for theming (green/gold brand colors)
- `design_guidelines.md` - Design system documentation
- `shared/schema.ts` - Data models and validation schemas
- `server/routes.ts` - API endpoints
- `server/storage.ts` - Data storage interface

## Design System
- **Primary Color**: Green (148 58% 26% HSL)
- **Accent Color**: Gold (42 80% 52% HSL)
- **Typography**: Inter font family
- **Design Pattern**: Line accent + uppercase label headers, left-aligned section titles, card-based layouts
- **Hero Style**: Full-width image with dark gradient wash, light text

## Running the Project
The project runs via `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

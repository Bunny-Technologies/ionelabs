# iOne Techlabs - Professional Company Website

## Overview
A premium enterprise technology company website for iOne Techlabs, showcasing software development, cloud solutions, IoT, smart grid, and AI services across 8 industry verticals. Built with a dark-themed aesthetic inspired by PenguinAI.co and PruTech.com.

## Recent Changes
- **February 2026**: Major professional overhaul
  - 8 industry use cases with filterable tab interface (Energy, Finance, Healthcare, Manufacturing, Retail, Government, Telecom, Logistics)
  - Trust bar with cloud partner logos (AWS, Azure, GCP) and certifications (ISO 27001, SOC 2, HIPAA)
  - Client testimonials section with avatar initials
  - PenguinAI-style pain points with bold stats (70%, $1.3T, 18mo)
  - gap-px grid pattern for pain points, process, testimonials, and clients (PruTech-inspired)
  - Interactive services sidebar with image preview panel
  - Numbered process layers (01-04)
  - Parallax hero with animated counters and gradient text
  - Phone number in nav, newsletter subscription
  - Contact info: phone +91 99599 33363, address "2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016"
  - No Winamr subsidiary references anywhere

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: wouter
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion (parallax, stagger, fade-up, AnimatePresence)
- **UI Components**: shadcn/ui
- **Custom CSS**: gradient-border, glow-green/glow-gold, text-gradient-green/gold/white, animate-gradient-x/shimmer/pulse-glow/float

### Backend (server/)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API Endpoints**:
  - `POST /api/contact` - Submit contact form
  - `POST /api/newsletter` - Subscribe to newsletter

### Key Files
- `client/src/pages/home.tsx` - Main landing page component (~800 lines)
- `client/src/index.css` - CSS variables for theming + custom animation keyframes
- `attached_assets/images/` - AI-generated images (hero, 6 services, 8 use cases, team)
- `shared/schema.ts` - Data models and validation schemas
- `server/routes.ts` - API endpoints
- `server/storage.ts` - Data storage interface

### Images
- Hero: `hero-main.png`
- Services: `service-software-dev.png`, `service-cloud.png`, `service-iot-smartgrid.png`, `service-mobile.png`, `service-ai-data.png`, `service-uiux.png`
- Use Cases: `usecase-energy.png`, `usecase-finance.png`, `usecase-healthcare.png`, `usecase-manufacturing.png`, `usecase-retail.png`, `usecase-government.png`, `usecase-telecom.png`, `usecase-logistics.png`
- Team: `about-team.png`

## Design System
- **Theme**: Dark by default (dark navy-black backgrounds)
- **Primary Color**: Green (148 55% 38% HSL)
- **Accent Color**: Gold (42 80% 52% HSL)
- **Background**: Dark navy (220 15% 6% HSL)
- **Typography**: Inter font family, clamp-based responsive sizing
- **Design Pattern**: gap-px grid sections (PruTech), bold stats (PenguinAI), uppercase tracking-wide labels, gradient text effects
- **Sections**: Nav > Hero > Trust Bar > Pain Points > Services > Industries (8 tabs) > Process > Testimonials > About > Clients > CTA > Contact > Footer

## Running the Project
The project runs via `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

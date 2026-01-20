# iOne Techlabs - Professional Company Website

## Overview
A professional technology company landing page for iOne Techlabs (sister company of Winamr Systems), showcasing their software development, cloud solutions, IoT, and smart grid services.

## Recent Changes
- **January 2026**: Enhanced website with advanced features and Winamr integration
  - Added Winamr Systems as featured partner with 8 utility company clients
  - Added Certifications section (ISO 27001, ISO 9001, CMMI Level 3, SOC 2)
  - Added Awards/Achievements section with "Best Smart Grid Solution 2024"
  - Added IoT & Smart Grid Technology section with IRIS Platform showcase
  - Added animated counter components for stats
  - Updated testimonials with J.T. Rao (Winamr CEO) and utility sector clients
  - Added "Make in India" initiative highlight
- Created comprehensive landing page with Hero, Services, Stats, Solutions, Testimonials, Industries, CTA, and Contact sections
- Implemented contact form with backend API
- Implemented newsletter subscription with backend API
- Used iOne Techlabs branding with green (#1B6B3D) and gold (#E5A623) colors

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
- **Spacing**: Consistent 4-point grid system

## Running the Project
The project runs via `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

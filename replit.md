# iOne Techlabs - Premium Dark Enterprise Website

## Overview
A premium dark-themed enterprise technology company website for iOne Techlabs, inspired by Linear/Vercel/Stripe. Uses deep navy backgrounds with golden-amber primary and emerald-green accent — showcasing software development, cloud, IoT, AI, and mobile services.

## Design System
- **Theme**: Always dark (deep navy `hsl(225 45% 6%)` / `#0a0f1e` equivalent)
- **Primary Color**: Golden Amber `#F5A623` (HSL 38 93% 55%)
- **Accent Color**: Emerald Green `#22C55E` (HSL 142 72% 45%)
- **Background**: Deep Navy `hsl(225 45% 6%)`
- **Card Surface**: Dark `hsl(224 38% 9%)`
- **Glassmorphism**: `.glass` and `.glass-card` utility classes — `bg-white/[0.03] backdrop-blur border border-white/[0.07]` with amber border glow on hover
- **Typography**: Inter font, clamp-based responsive sizing, bold uppercase tracking-wide labels
- **Animations**: Floating orbs (`.animate-orb-1/2/3`), gradient text (`.text-gradient-hero`), glow (`.glow-amber`, `.glow-emerald`), AnimatedCounter (Framer Motion scroll-triggered)
- **Logo**: Original iOne Techlabs PNG (`attached_assets/logo_transparent.png`) — NEVER modify or recreate

## Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: wouter (single page `/`)
- **Styling**: Tailwind CSS with custom dark-theme design tokens in `index.css`
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion (whileInView stagger, fadeUp, floating orb CSS animations)
- **UI Components**: shadcn/ui
- **Logo**: `client/src/components/Logo.tsx` — renders `attached_assets/logo_transparent.png` via `@assets` alias

### Backend (server/)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API Endpoints**:
  - `POST /api/contact` — Submit contact form `{name, email, company, message}`
  - `POST /api/newsletter` — Subscribe `{email}`

### Key Files
- `client/src/pages/home.tsx` — Main landing page (~550 lines), complete dark-theme rewrite
- `client/src/index.css` — Dark CSS variables, glassmorphism utilities, glow effects, keyframes
- `client/src/components/Logo.tsx` — Logo rendering (DO NOT change)
- `attached_assets/logo_transparent.png` — Original iOne Techlabs brand PNG (LOCKED)
- `shared/schema.ts` — Data models
- `server/routes.ts` — API endpoints
- `server/storage.ts` — Data storage

## Page Sections (top → bottom)
1. **Nav** — Sticky frosted dark backdrop, white links with amber underline hover, amber "Get Started" CTA, phone number
2. **Hero** — CSS animated floating orbs + grid mesh bg (no photo), gradient "outcomes." headline, pulsing amber trust badge, two CTAs, stats row
3. **Trust Bar** — AWS, Azure, GCP logos + ISO 27001, SOC 2, HIPAA certifications
4. **Services** — 6 glassmorphism cards (3×2 grid): Custom Software, Cloud & DevOps, IoT & Edge, AI & ML, Enterprise Mobility, Data Engineering
5. **Industries** — 8 badge pills with emerald icons: Energy, Finance, Healthcare, Manufacturing, Logistics, Retail, Government, Telecom
6. **Stats** — Animated counter grid: 200+, 8, 50+, 10+ years
7. **Process** — 4-step horizontal stepper with connecting gradient line (01–04)
8. **Testimonials** — 3 glassmorphism quote cards
9. **About** — 2-col layout: text + 2×2 metrics grid
10. **CTA Banner** — Full-width dark gradient + amber button
11. **Contact** — Form with API + contact details
12. **Footer** — Logo + columns (Services, Company, Contact) + newsletter + socials + copyright

## Contact Info
- Phone: +91 99599 33363
- Email: hello@ionetechlabs.com
- Address: 2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016

## Running the Project
`npm run dev` starts Express backend + Vite frontend on port 5000.

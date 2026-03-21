# iOne Techlabs - Premium Light Enterprise Website

## Overview
A premium light-themed enterprise technology company website for iOne Techlabs, inspired by Stripe/Linear light mode. Uses white backgrounds with golden-amber primary (#F5A623) and forest green accent (#1d6f42) — showcasing software development, cloud, IoT, AI, and mobile services.

## Design System
- **Theme**: Always light (pure white `#ffffff` background)
- **Primary Color**: Golden Amber `#F5A623` (HSL 38 93% 55%) — buttons, highlights, icon backgrounds
- **Accent Color**: Forest Green `#1d6f42` (HSL 142 58% 28%) — industry icons, badges, checklist icons
- **Background**: Pure white `hsl(0 0% 100%)`
- **Section Alt**: Light gray `hsl(220 14% 97%)` for alternating sections
- **Stats Band**: Dark green `#1a5c35` with amber numbers
- **CTA Banner**: Dark green `#0f3d22` with white text + amber CTA
- **Footer**: Dark gray `gray-900` with white text
- **Card Style**: `bg-white border border-gray-100 shadow-sm card-hover` — lifts + amber border on hover
- **Typography**: Inter font, clamp-based responsive sizing, bold uppercase tracking-wide labels
- **Animations**: Floating hero dots, gradient text (`.text-gradient-hero`), AnimatedCounter (scroll-triggered), btn-shimmer
- **Logo**: Original iOne Techlabs PNG (`attached_assets/logo_transparent.png`) — NEVER modify or recreate
- **Logo in footer**: Wrapped in `bg-white rounded-xl p-2` for visibility on dark footer

## Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: wouter (single page `/`)
- **Styling**: Tailwind CSS with custom light-theme design tokens in `index.css`
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion (whileInView fadeUp, stagger, AnimatedCounter)
- **UI Components**: shadcn/ui
- **Logo**: `client/src/components/Logo.tsx` — renders `attached_assets/logo_transparent.png` via `@assets` alias

### Backend (server/)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API Endpoints**:
  - `POST /api/contact` — Submit contact form `{name, email, company, message}`
  - `POST /api/newsletter` — Subscribe `{email}`

### Key Files
- `client/src/pages/home.tsx` — Main landing page (~700 lines), complete light-theme with rich content
- `client/src/index.css` — Light CSS variables, card-hover lift, shimmer, keyframes
- `client/src/components/Logo.tsx` — Logo rendering (DO NOT change)
- `attached_assets/logo_transparent.png` — Original iOne Techlabs brand PNG (LOCKED)
- `shared/schema.ts` — Data models
- `server/routes.ts` — API endpoints
- `server/storage.ts` — Data storage

## Page Sections (top → bottom)
1. **Nav** — Sticky white/frosted backdrop with border on scroll, dark links with amber hover underline, amber "Get Started" CTA
2. **Hero** — White background + dot grid pattern + amber/green decorative blobs, gradient "outcomes." headline, amber trust badge, two CTAs, 4-card grid (right col), stats row
3. **Trust Bar** — AWS, AZURE text, GCP logos + ISO 27001, SOC 2, HIPAA certifications (light gray bg)
4. **Services** — 6 white cards (3×2 grid): Custom Software, Cloud, IoT, AI, Mobility, Data — each with description + 4 feature checklist items
5. **Industries** — 8 white cards (4×2 grid) each with: icon, amber stat, description, 4 chevron use-cases
6. **Stats Band** — Dark green (#1a5c35) full-width: 200+, 8, 50+, 10+ with amber numbers
7. **Process** — 4 horizontal cards: Discovery, Design, Development, Deploy — each with icon, description, 4 deliverables
8. **Testimonials** — 3 white quote cards + client logo badges (light gray bg)
9. **About** — 2-col: company story + 4 metric cards + 5-item why-choose-us checklist
10. **CTA Banner** — Dark green (#0f3d22) with dot pattern, amber button + phone CTA
11. **Contact** — Form (white card) + contact details + "What happens next" green box (section-alt bg)
12. **Footer** — Dark gray-900: logo (white bg) + 3 columns (Services, Company, Contact) + newsletter + socials + copyright

## Rich Content Per Section
- **Services**: 6 cards × 4 features each
- **Industries**: 8 industries × (description + stat + 4 use-cases each)
- **Process**: 4 steps × (description + 4 deliverables each)
- **About**: Company story + 4 metrics + 5 differentiators

## Contact Info
- Phone: +91 99599 33363
- Email: hello@ionetechlabs.com
- Address: 2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016

## Running the Project
`npm run dev` starts Express backend + Vite frontend on port 5000.

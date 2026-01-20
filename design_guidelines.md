# Website Crafter App - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from leading web development platforms: Webflow (sophisticated layouts), Framer (modern interactions), and Linear (clean typography). This SaaS product demands visual credibility while showcasing technical capability.

## Core Design Elements

### Typography
- **Headings**: Inter, 600-700 weight
  - H1: text-5xl md:text-6xl lg:text-7xl
  - H2: text-3xl md:text-4xl lg:text-5xl
  - H3: text-2xl md:text-3xl
- **Body**: Inter, 400-500 weight
  - Large: text-lg md:text-xl
  - Regular: text-base
  - Small: text-sm

### Layout System
Spacing primitives: **2, 4, 6, 8, 12, 16, 20, 24** (tailwind units)
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 md:gap-12
- Card padding: p-6 md:p-8
- Max-width: max-w-7xl for containers

### Page Structure (7 Sections)

**1. Hero Section (90vh)**
- Split layout: 50/50 text-left, visual-right on desktop
- Headline showcasing value proposition
- Subheadline with key differentiator
- CTA group: Primary button + Secondary "Watch Demo" button with blurred background overlay
- Trust indicator: "Trusted by 50,000+ creators" with logo strip

**2. Interactive Demo Preview**
- Full-width browser mockup showing the app interface in action
- Tabbed interface displaying different features (drag-drop, templates, code export)
- Screenshot carousel with smooth transitions

**3. Key Features Grid (3 columns)**
- Visual icon + Feature title + 2-line description
- Features: Drag & Drop Builder, Template Library, Code Export, Real-time Collaboration, Responsive Preview, SEO Optimizer
- Each card with hover elevation effect

**4. Use Case Showcase (2-column alternating)**
- 3 use cases: Freelancers, Agencies, Startups
- Each row: Image (screenshot/illustration) + Text content
- Alternate image-left/image-right pattern
- Include specific metrics/outcomes

**5. Social Proof Section**
- 3-column testimonial cards with customer photos
- Star ratings, company logos, detailed feedback
- "Case Studies" link to full stories

**6. Pricing Tiers (3 columns)**
- Starter, Professional, Enterprise
- Feature comparison list
- Highlighted "Most Popular" tier
- CTA buttons per tier

**7. Final CTA + Footer**
- Centered CTA block with gradient background
- Compelling headline + Primary action button
- Comprehensive footer: Product links, Resources, Company, Social links, Newsletter signup form

## Component Library

### Navigation
- Sticky header with logo (use provided image)
- Horizontal menu: Product, Features, Pricing, Resources, Blog
- Right-aligned: Login (text) + "Start Free Trial" (button)

### Cards
- Rounded-xl with subtle shadow
- Hover: scale-105 transition with increased shadow
- Consistent padding: p-8

### Buttons
- Primary: Rounded-lg, px-8 py-4, font-semibold
- Secondary: Outlined with backdrop-blur when on images
- CTA buttons: Larger scale (px-10 py-5) with icon arrows

### Forms
- Newsletter: Single-line horizontal layout (email + button)
- Consistent input styling: rounded-lg, px-4 py-3
- Focus states with ring-2 treatment

## Images Section

**Hero Image**: Professional screenshot of the website builder interface showing drag-and-drop functionality, template selection panel, and live preview - placed right side of split hero layout

**Use Case Images**:
1. Freelancer workspace mockup showing portfolio creation
2. Agency team collaboration view with multiple users
3. Startup dashboard displaying analytics and site performance

**Feature Section**: Icon illustrations for each feature (modern, geometric style)

**Testimonial Photos**: Professional headshots of 6 diverse customers

**Demo Preview**: High-fidelity interface screenshots showing:
- Template gallery view
- Code export panel
- Mobile responsive preview

**Logo Strip**: 8-10 recognizable company logos using the product

All images should be high-resolution, professionally lit/designed, and maintain consistent visual style. Use subtle shadows and rounded corners (rounded-lg) for all product screenshots.
# iOne Techlabs - Professional Website Design Guidelines

## Brand Identity
**Company**: iOne Techlabs - A cutting-edge technology company delivering innovative software solutions
**Brand Colors**: 
- Primary Green: #1B6B3D (deep forest green)
- Accent Gold: #E5A623 (vibrant golden yellow)
- Supporting: Clean whites and subtle grays for professional appearance

## Design Approach
**Reference-Based Approach** drawing from leading enterprise tech companies: Salesforce (trust/enterprise), Stripe (clarity/elegance), and Linear (modern minimalism). This technology services company demands visual credibility while showcasing technical capability.

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

### Page Structure (8 Sections)

**1. Navigation Header (Sticky)**
- Logo (iOne Techlabs) on left
- Horizontal menu: Services, Solutions, About, Industries, Contact
- Right-aligned: "Get Started" CTA button

**2. Hero Section (90vh)**
- Split layout: 50/50 text-left, visual-right on desktop
- Headline showcasing core value proposition for digital transformation
- Subheadline with key differentiator
- CTA group: Primary button "Schedule Consultation" + Secondary "View Our Work"
- Trust indicator: Stats like "500+ Projects Delivered" and "50+ Enterprise Clients"

**3. Services Overview (3 columns)**
- Visual icon + Service title + 2-line description
- Services: Custom Software Development, Cloud Solutions, Mobile App Development, Data Analytics, DevOps & Automation, UI/UX Design
- Each card with hover elevation effect

**4. Why Choose Us (Key Differentiators)**
- 4-column grid with compelling stats and icons
- Technical Expertise, Agile Methodology, 24/7 Support, Proven Track Record
- Include metrics like "10+ Years Experience", "99.9% Uptime", "150+ Engineers"

**5. Solutions Showcase (2-column alternating)**
- 3 solution areas: Enterprise Software, Digital Transformation, Startup Acceleration
- Each row: Image (relevant tech visual) + Text content
- Alternate image-left/image-right pattern
- Include specific outcomes and benefits

**6. Client Testimonials**
- 3-column testimonial cards with client photos
- Company logos, roles, detailed feedback
- Star ratings for credibility

**7. Industries We Serve**
- Grid of industry icons with labels
- Healthcare, Finance, E-commerce, Education, Manufacturing, Logistics
- Brief description of expertise in each

**8. CTA Section + Footer**
- Centered CTA block with gradient background (green to gold subtle)
- "Ready to Transform Your Business?" headline
- Primary action button + Contact info
- Comprehensive footer: Services, Solutions, Company, Resources, Social links, Newsletter

## Component Library

### Navigation
- Sticky header with logo (provided iOne Techlabs logo)
- Horizontal menu: Services, Solutions, About, Industries, Contact
- Right-aligned: "Get Started" primary button

### Cards
- Rounded-lg with subtle shadow
- Hover: scale-102 transition with increased shadow
- Consistent padding: p-6 md:p-8

### Buttons
- Primary: Green background, white text, rounded-lg, px-6 py-3
- Secondary: Outlined with gold accent border
- CTA buttons: Larger scale (px-8 py-4) with icon arrows

### Forms
- Contact form: Name, Email, Company, Message
- Newsletter: Single-line horizontal layout (email + button)
- Consistent input styling: rounded-lg, px-4 py-3
- Focus states with ring-2 treatment

## Images Available

**Hero Image**: Team collaboration photo showing technology professionals
**Use Case Images**:
1. Software development workspace
2. Cloud computing visualization
3. Mobile app development
4. Data analytics dashboard

**Testimonial Photos**: Professional headshots (6 diverse business professionals)

**Logo**: iOne Techlabs logo (attached_assets/image_1768908388633.png)

All images should be professionally presented with subtle shadows and rounded corners (rounded-lg) for product screenshots.

## Color Variables (for index.css)
Use these HSL values:
- Primary (Green): 148 58% 26%
- Primary Foreground: 0 0% 100%
- Accent (Gold): 42 80% 52%
- Accent Foreground: 42 80% 10%

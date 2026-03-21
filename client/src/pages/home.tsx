import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight, Menu, X, Mail, Phone, MapPin,
  Linkedin, Twitter, Loader2, Code2, Cloud, Cpu, Smartphone,
  BrainCircuit, BarChart3, Zap, Shield, Globe, Layers,
  Play, Building2, Factory, ShoppingCart, Radio, Truck, Award,
  Target, TrendingUp, Lock, Quote, CheckCircle2, Star,
  Users, Clock, ChevronRight, Database,
} from "lucide-react";
import { SiAmazonwebservices, SiGooglecloud } from "react-icons/si";
import Logo from "@/components/Logo";

/* ── Animated counter ───────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (t: number) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Shared utilities ───────────────────────────────────────────── */
const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

/* ── Motion variants ────────────────────────────────────────────── */
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof contactForm) => {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => { toast({ title: "Message Sent!", description: data.message || "We'll get back to you within 24 hours." }); setContactForm({ name: "", email: "", company: "", message: "" }); },
    onError: (e: Error) => { toast({ title: "Error", description: e.message, variant: "destructive" }); },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => { toast({ title: "Subscribed!", description: data.message || "You'll receive our latest updates." }); setNewsletterEmail(""); },
    onError: (e: Error) => { toast({ title: "Error", description: e.message, variant: "destructive" }); },
  });

  /* ── Page Data ───────────────────────────────────────────────── */
  const services = [
    {
      icon: Code2, title: "Custom Software Development",
      desc: "Enterprise-grade web platforms, microservices, REST & GraphQL APIs, and legacy modernisation — delivered with production CI/CD pipelines and rigorous code review.",
      features: ["Enterprise Web Platforms", "Microservices & APIs", "Legacy System Modernization", "CI/CD & DevOps Automation"],
    },
    {
      icon: Cloud, title: "Cloud & DevOps",
      desc: "Security-first cloud architecture across AWS, Azure, and GCP. We design, migrate, and manage infrastructure that scales, with cost optimisation built in from day one.",
      features: ["Cloud Migration Strategy", "Infrastructure as Code (Terraform)", "Multi-Cloud & Hybrid Cloud", "FinOps & Cost Optimization"],
    },
    {
      icon: Cpu, title: "IoT & Edge Computing",
      desc: "End-to-end connected systems with real-time SCADA integration, edge computing, predictive analytics, and advanced metering infrastructure for energy and industrial sectors.",
      features: ["SCADA System Integration", "Edge Computing & Gateways", "AMI & Smart Metering", "Predictive Maintenance Platforms"],
    },
    {
      icon: BrainCircuit, title: "AI & Machine Learning",
      desc: "Production-ready ML pipelines, predictive models, NLP systems, and computer vision solutions that drive measurable business outcomes — not just prototypes.",
      features: ["ML Model Development & MLOps", "Predictive Analytics Engines", "NLP & Conversational AI", "Computer Vision Systems"],
    },
    {
      icon: Smartphone, title: "Enterprise Mobility",
      desc: "Cross-platform mobile experiences with native performance. iOS, Android, Flutter, and React Native — from concept through app store launch and continuous improvement.",
      features: ["iOS & Android Native Apps", "Cross-Platform (Flutter / RN)", "Offline-First Architecture", "App Store Optimization & Analytics"],
    },
    {
      icon: BarChart3, title: "Data Engineering & Analytics",
      desc: "Unified data platforms, real-time pipelines, and BI dashboards that convert raw data into boardroom-ready intelligence for enterprise decision makers.",
      features: ["Real-time Data Pipelines", "BI Dashboards & Reporting", "Data Warehouse & Lakehouse", "Data Governance & Quality"],
    },
  ];

  const industries = [
    {
      icon: Zap, label: "Energy & Utilities",
      desc: "Smart grid modernization, SCADA integration, IoT-powered demand forecasting, and renewable energy management for power utilities and distribution companies.",
      useCases: ["Grid Monitoring & SCADA", "AMI Implementation", "Predictive Fault Detection", "Renewable Energy Integration"],
      stat: "60%", statLabel: "Outage Reduction",
    },
    {
      icon: TrendingUp, label: "Financial Services",
      desc: "Cloud-native trading platforms, real-time compliance engines, AI fraud detection, and digital banking infrastructure for banks, NBFCs, and fintech companies.",
      useCases: ["Core Banking Modernization", "Real-time Fraud Detection", "Regulatory Compliance (RBI/SEBI)", "High-Frequency Trading"],
      stat: "99.99%", statLabel: "Uptime SLA",
    },
    {
      icon: Shield, label: "Healthcare",
      desc: "HIPAA-compliant patient management, AI-powered diagnostics, telemedicine platforms, and electronic health records for hospital networks and healthcare providers.",
      useCases: ["Patient Management Systems", "AI Diagnostic Imaging", "Telemedicine Platforms", "Hospital Network Integration"],
      stat: "40%", statLabel: "Cost Reduction",
    },
    {
      icon: Factory, label: "Manufacturing",
      desc: "Digital twin technology, IoT-based predictive maintenance, automated quality control, and production optimization for large-scale manufacturing facilities.",
      useCases: ["Digital Twin Implementation", "Predictive Maintenance", "Computer Vision QA", "OEE Optimization"],
      stat: "45%", statLabel: "Downtime Reduction",
    },
    {
      icon: Truck, label: "Logistics & Supply Chain",
      desc: "Real-time shipment tracking, AI route optimization, warehouse automation integration, and predictive demand planning for national logistics networks.",
      useCases: ["End-to-End Visibility", "AI Route Optimization", "Warehouse Automation", "Demand Planning & Forecasting"],
      stat: "38%", statLabel: "Cost Saved",
    },
    {
      icon: ShoppingCart, label: "Retail & E-Commerce",
      desc: "AI-driven demand forecasting, dynamic pricing engines, omnichannel platforms, and personalized customer experiences for multi-store retail chains.",
      useCases: ["AI Demand Forecasting", "Dynamic Pricing Engine", "Customer Personalization", "Inventory Optimization"],
      stat: "32%", statLabel: "Revenue Growth",
    },
    {
      icon: Building2, label: "Government & Smart Cities",
      desc: "Urban IoT command centers, traffic management, environmental monitoring, and citizen engagement platforms for smart city and e-Governance initiatives.",
      useCases: ["Smart City Command Center", "Traffic Signal Optimization", "Environmental Monitoring", "Citizen Engagement Portals"],
      stat: "55%", statLabel: "Faster Response",
    },
    {
      icon: Radio, label: "Telecommunications",
      desc: "AI-powered network intelligence, zero-touch provisioning, predictive capacity planning, and customer experience platforms for telecom operators.",
      useCases: ["Network Intelligence Platform", "Zero-Touch Provisioning", "Predictive Capacity Planning", "Churn Prediction & Retention"],
      stat: "70%", statLabel: "Faster Provisioning",
    },
  ];

  const steps = [
    {
      num: "01", icon: Target, title: "Discovery & Strategy",
      desc: "We align your business goals to technical requirements through in-depth stakeholder interviews, system audits, and competitive analysis. You get a concrete roadmap — not a vague plan.",
      deliverables: ["Technical Requirements Document", "Architecture Recommendation", "Project Roadmap & Milestones", "Risk Assessment Report"],
    },
    {
      num: "02", icon: Layers, title: "Design & Architecture",
      desc: "Every architectural decision is peer-reviewed and stress-tested before a single line of code is written. Paired with pixel-perfect UX design that converts.",
      deliverables: ["System Architecture Diagrams", "High-Fidelity UI/UX Prototypes", "API Design & Data Models", "Infrastructure Blueprint"],
    },
    {
      num: "03", icon: Code2, title: "Agile Development",
      desc: "Two-week sprints with working demos every cycle. Full transparency through shared dashboards. You see real progress — not a six-month surprise reveal.",
      deliverables: ["Sprint Demos (Every 2 Weeks)", "Code Reviews & QA Reports", "Shared Progress Dashboard", "Automated Test Coverage"],
    },
    {
      num: "04", icon: Globe, title: "Deploy & Scale",
      desc: "Production deployment with 24/7 monitoring, automated alerting, SLA-backed uptime, and dedicated support. Post-launch optimization to grow with your business.",
      deliverables: ["Zero-Downtime Deployment", "24/7 Monitoring & Alerting", "Performance Optimization", "Dedicated Support Team"],
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar", role: "CTO", company: "National Power Grid Corp",
      quote: "iOne Techlabs transformed our grid operations. Their IoT solution reduced our outage response time from hours to minutes. The team's deep domain expertise in energy made all the difference.",
      avatar: "RK", stars: 5,
    },
    {
      name: "Priya Sharma", role: "VP Engineering", company: "FinServ Holdings",
      quote: "We evaluated five vendors. iOne was the only one that understood both the technical complexity and regulatory requirements of our trading platform. Delivered on time, under budget.",
      avatar: "PS", stars: 5,
    },
    {
      name: "Dr. Anand Mehta", role: "Director of IT", company: "Metro Health Network",
      quote: "The patient management system they built has fundamentally changed how our 12 hospitals operate — 40% reduction in administrative costs while improving care quality.",
      avatar: "AM", stars: 5,
    },
  ];

  const clients = ["Tata Power", "HDFC Bank", "Apollo Hospitals", "Mahindra Group", "Reliance Retail", "NTPC Limited", "Bharti Airtel", "Delhivery"];
  const navItems = ["Services", "Industries", "Process", "About", "Contact"];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ══════════════════ NAV ══════════════════ */}
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-white/80 backdrop-blur-md border-b border-transparent"}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0" data-testid="link-home">
              <Logo className="h-10 md:h-12 w-auto" />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item} href={`#${slugify(item)}`}
                  className="relative text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 tracking-wide uppercase px-4 py-2 rounded-md hover:bg-gray-50 group"
                  data-testid={`link-${slugify(item)}`}
                >
                  {item}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919959933363" className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-800 transition-colors group" data-testid="link-phone">
                <span className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Phone className="h-3 w-3 text-amber-600" />
                </span>
                <span className="hidden xl:inline">+91 99599 33363</span>
              </a>
              <div className="w-px h-5 bg-gray-200" />
              <a href="#contact">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm btn-shimmer" data-testid="button-get-started">
                  Get Started <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </a>
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div className="lg:hidden py-4 border-t border-gray-100" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a key={item} href={`#${slugify(item)}`} className="text-gray-600 hover:text-gray-900 text-sm font-medium py-3 px-2 transition-colors border-b border-gray-50" onClick={() => setMobileMenuOpen(false)} data-testid={`link-mobile-${slugify(item)}`}>{item}</a>
                  ))}
                  <div className="pt-3 mt-1">
                    <a href="#contact"><Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" data-testid="button-mobile-get-started">Get Started</Button></a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#94a3b8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dots)" />
          </svg>
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-amber-400/8 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green-700/5 blur-[80px]" />
          <div className="absolute top-1/3 right-1/5 w-3 h-3 rounded-full bg-amber-400 animate-float opacity-50" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-green-600 animate-float opacity-40" style={{ animationDelay: "2s" }} />
        </div>

        {/* Amber left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-amber-400/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 md:pt-44 md:pb-28 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
              {/* Trust badge */}
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2" data-testid="badge-trust">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping-amber absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="text-[13px] text-amber-800 font-semibold">Trusted by 200+ enterprises across India</span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-gray-900 mb-6" data-testid="text-hero-title">
                Technology that<br />delivers{" "}
                <span className="text-gradient-hero">outcomes.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl" data-testid="text-hero-description">
                iOne Techlabs engineers software, cloud, IoT, and AI solutions for enterprises that need results — not reports. From energy grids to financial platforms, we build what matters.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                <a href="#contact">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md btn-shimmer" data-testid="button-hero-started">
                    Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#industries">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400" data-testid="button-hero-cases">
                    <Play className="mr-2 h-3.5 w-3.5 fill-current text-amber-500" /> View Case Studies
                  </Button>
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-gray-100">
                {[
                  { v: <><AnimatedCounter end={200} suffix="+" /></>, label: "Enterprises Served" },
                  { v: <><AnimatedCounter end={8} /></>, label: "Industries" },
                  { v: <><AnimatedCounter end={50} suffix="+" /></>, label: "Engineers" },
                  { v: <><AnimatedCounter end={10} suffix="+" /></>, label: "Years" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{s.v}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-[0.14em] font-medium">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero right — feature cards */}
            <motion.div className="hidden lg:grid grid-cols-2 gap-4" initial="initial" animate="animate" variants={stagger}>
              {[
                { icon: Code2, title: "Custom Software", stat: "500+ Apps Built", color: "bg-amber-50 border-amber-100" },
                { icon: Cloud, title: "Cloud & DevOps", stat: "AWS • Azure • GCP", color: "bg-green-50 border-green-100" },
                { icon: BrainCircuit, title: "AI & ML", stat: "Production AI Systems", color: "bg-green-50 border-green-100" },
                { icon: Cpu, title: "IoT & Edge", stat: "10K+ Connected Devices", color: "bg-amber-50 border-amber-100" },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className={`${f.color} border rounded-2xl p-6 flex flex-col gap-3`}
                  data-testid={`card-hero-${i}`}
                >
                  <f.icon className="h-6 w-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{f.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{f.stat}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUST BAR ══════════════════ */}
      <section className="py-10 md:py-14 section-alt border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold whitespace-nowrap">Cloud Partners</span>
              <div className="flex items-center gap-7">
                <SiAmazonwebservices className="h-7 w-auto text-gray-400 hover:text-gray-700 transition-colors" />
                <span className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors tracking-widest">AZURE</span>
                <SiGooglecloud className="h-5 w-auto text-gray-400 hover:text-gray-700 transition-colors" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: Award, text: "ISO 27001 Certified" },
                { icon: Shield, text: "SOC 2 Type II Compliant" },
                { icon: Lock, text: "HIPAA Ready" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500 bg-white border border-gray-200 rounded-full px-4 py-1.5 font-medium shadow-xs">
                  <b.icon className="h-3.5 w-3.5 text-green-700" /> {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Our Capabilities</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-services-title">What We Build</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Full-spectrum technology services from architecture through deployment, backed by senior engineers with deep domain expertise across six practice areas.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover group"
                data-testid={`card-service-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                  <s.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ INDUSTRIES ══════════════════ */}
      <section id="industries" className="py-24 md:py-36 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-green-700 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Industry Expertise</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-industries-title">Industries We Serve</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Deep domain knowledge across eight verticals — so we speak your language from day one.
            </motion.p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {industries.map((ind, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover"
                data-testid={`card-industry-${i}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <ind.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-500">{ind.stat}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{ind.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{ind.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{ind.desc}</p>
                <div className="space-y-1.5">
                  {ind.useCases.map((uc, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-gray-600">
                      <ChevronRight className="h-3 w-3 text-amber-500 flex-shrink-0" />
                      {uc}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STATS BAND ══════════════════ */}
      <section className="py-16 md:py-20 bg-[#1a5c35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: <AnimatedCounter end={200} suffix="+" />, label: "Enterprises Served", sub: "Across India & globally" },
              { v: <AnimatedCounter end={8} />, label: "Industry Verticals", sub: "Deep domain expertise" },
              { v: <AnimatedCounter end={50} suffix="+" />, label: "Senior Engineers", sub: "Full-stack & domain experts" },
              { v: <AnimatedCounter end={10} suffix="+" />, label: "Years of Delivery", sub: "Founded in Hyderabad" },
            ].map((s, i) => (
              <motion.div key={i} className="text-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} data-testid={`stat-${i}`}>
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-1">{s.v}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
                <div className="text-green-200 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section id="process" className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">How We Work</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-process-title">Our Proven Process</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Four disciplined phases that take your project from ambiguous requirement to production-grade solution — with full visibility at every step.
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div key={i}
                className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 bg-white border border-gray-100 shadow-sm rounded-2xl p-8 card-hover"
                initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                data-testid={`step-${i}`}
              >
                <div className="flex md:flex-col items-center gap-4 md:gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-amber-300 to-transparent mt-2" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-5 w-5 text-green-700" />
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                </div>
                <div className="md:min-w-[220px]">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Deliverables</div>
                  <ul className="space-y-2">
                    {step.deliverables.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="py-24 md:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-green-700 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Client Voices</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight" data-testid="text-testimonials-title">What Our Clients Say</motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col card-hover"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-amber-300 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Client logos */}
          <motion.div className="mt-14 text-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-6">Trusted by India's Leading Companies</p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {clients.map((c, i) => (
                <span key={i} className="text-sm font-semibold text-gray-400 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:text-gray-700 hover:border-gray-300 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Our Story</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6" data-testid="text-about-title">
                Built by engineers,<br />for enterprises.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5">
                Founded over a decade ago in Hyderabad, iOne Techlabs has grown from a boutique software studio into a full-spectrum enterprise technology partner. We've shipped 500+ solutions across 8 verticals for clients ranging from national power utilities to fast-scaling fintech platforms.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5">
                Our team of 50+ senior engineers brings both technical depth and domain expertise — meaning we speak the language of energy grids, trading floors, hospital networks, and supply chains, not just code repositories.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                What sets us apart is our relentless focus on outcomes over activity. Every engagement is measured against business KPIs — not just delivery milestones — and we stand behind our work with SLA-backed commitments.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="#contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white btn-shimmer" data-testid="button-about-contact">
                    Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    See Our Services
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Projects Delivered", icon: Code2, color: "text-amber-500" },
                  { num: "99.9%", label: "Uptime Guarantee", icon: Shield, color: "text-green-700" },
                  { num: "10+", label: "Years in Operation", icon: Clock, color: "text-amber-500" },
                  { num: "8", label: "Industry Verticals", icon: Globe, color: "text-green-700" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center card-hover" data-testid={`card-about-${i}`}>
                    <item.icon className={`h-6 w-6 ${item.color} mx-auto mb-3`} />
                    <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.num}</div>
                    <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Core values */}
              <motion.div variants={fadeUp} className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-sm">Why Enterprises Choose Us</h4>
                <div className="space-y-3">
                  {[
                    "Senior-only engineering teams — no juniors on client projects",
                    "Outcome-based contracts with measurable KPIs",
                    "Domain experts, not just generalist developers",
                    "Transparent delivery with real-time dashboards",
                    "Post-launch SLA with 24/7 monitoring included",
                  ].map((v, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {v}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="py-20 md:py-28 bg-[#0f3d22] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-400 text-[11px] font-bold tracking-[0.24em] uppercase mb-6">Let's Build</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6" data-testid="text-cta-title">
              Ready to build what matters?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-green-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 200+ enterprises that chose iOne Techlabs to engineer their most critical systems.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a href="#contact">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold text-base px-8 shadow-lg btn-shimmer" data-testid="button-cta">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="tel:+919959933363">
                <Button size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50">
                  <Phone className="mr-2 h-4 w-4" /> +91 99599 33363
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" className="py-24 md:py-36 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Get In Touch</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6" data-testid="text-contact-title">
                Let's start a conversation.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-10">
                Tell us about your challenge. We'll respond within 24 hours with a clear assessment and a concrete plan of action. No sales pitch — just honest advice.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-5 mb-10">
                {[
                  { icon: Phone, label: "+91 99599 33363", sub: "Call us Mon–Sat, 9am–7pm IST", href: "tel:+919959933363" },
                  { icon: Mail, label: "hello@ionetechlabs.com", sub: "We reply within 24 hours", href: "mailto:hello@ionetechlabs.com" },
                  { icon: MapPin, label: "2nd Floor, Myhome Tycoon", sub: "Kundhanbagh, Begumpet, Hyderabad-500016", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="flex items-start gap-4 group">
                    <span className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <c.icon className="h-4 w-4 text-amber-600" />
                    </span>
                    <div className="pt-1">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">{c.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>
                    </div>
                  </a>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-700" />
                  <span className="text-sm font-bold text-green-800">What happens after you submit?</span>
                </div>
                <div className="space-y-2">
                  {["We review your message within 4 business hours", "A senior engineer — not a salesperson — will call you", "You'll receive a preliminary assessment within 24 hours", "No commitment required for the first consultation"].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-green-700">
                      <ChevronRight className="h-3 w-3 flex-shrink-0" /> {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
              <form onSubmit={(e) => { e.preventDefault(); if (!contactForm.name || !contactForm.email || !contactForm.message) { toast({ title: "Required Fields", description: "Please fill all required fields.", variant: "destructive" }); return; } contactMutation.mutate(contactForm); }} className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 space-y-5">
                <h3 className="font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Full Name *</label>
                    <Input value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="border-gray-200 focus:border-amber-400 focus:ring-amber-400/20" data-testid="input-name" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Work Email *</label>
                    <Input type="email" value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className="border-gray-200 focus:border-amber-400 focus:ring-amber-400/20" data-testid="input-email" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Company / Organisation</label>
                  <Input value={contactForm.company} onChange={(e) => setContactForm(f => ({ ...f, company: e.target.value }))} placeholder="Your company name" className="border-gray-200 focus:border-amber-400 focus:ring-amber-400/20" data-testid="input-company" />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Tell Us About Your Project *</label>
                  <Textarea value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="What are you building? What challenges are you facing? What's your timeline?" rows={5} className="border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 resize-none" data-testid="input-message" />
                </div>
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold btn-shimmer" disabled={contactMutation.isPending} data-testid="button-contact-submit">
                  {contactMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
                <p className="text-[11px] text-gray-400 text-center">By submitting, you agree to our Privacy Policy. We never spam.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="bg-gray-900 text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="bg-white rounded-xl inline-block p-2 mb-5">
                <Logo className="h-9 w-auto" />
              </div>
              <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
                Enterprise technology solutions for India's most ambitious companies. Software, Cloud, IoT & AI — delivered with accountability.
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/50 transition-all" data-testid={`link-social-${i}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: ["Custom Software Development", "Cloud & DevOps", "IoT & Edge Computing", "AI & Machine Learning", "Enterprise Mobility", "Data Engineering"],
              },
              {
                title: "Company",
                links: ["About Us", "Our Process", "Case Studies", "Careers", "Blog", "Press"],
              },
              {
                title: "Contact",
                links: ["+91 99599 33363", "hello@ionetechlabs.com", "Begumpet, Hyderabad-500016", "Get in Touch"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Stay ahead with enterprise tech insights</p>
                <p className="text-xs text-gray-500">Monthly digest — no spam, unsubscribe anytime.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) newsletterMutation.mutate(newsletterEmail); }} className="flex gap-2 w-full sm:w-auto">
                <Input type="email" placeholder="your@email.com" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 w-56 focus:border-amber-500" data-testid="input-newsletter" />
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0 btn-shimmer" disabled={newsletterMutation.isPending} data-testid="button-newsletter">
                  {newsletterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2026 iOne Techlabs Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
                <a key={i} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

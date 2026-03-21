import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight, Menu, X, Mail, Phone, MapPin,
  Linkedin, Twitter, Loader2, Code2, Cloud, Cpu, Smartphone,
  BrainCircuit, BarChart3, Zap, Shield, Globe, Layers, Server,
  Play, Building2, Factory, ShoppingCart, Radio, Truck, Award,
  Target, TrendingUp, Lock, Quote,
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
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
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
    const h = () => setScrolled(window.scrollY > 30);
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
    onSuccess: (data) => { toast({ title: "Message Sent", description: data.message || "We'll get back to you within 24 hours." }); setContactForm({ name: "", email: "", company: "", message: "" }); },
    onError: (e: Error) => { toast({ title: "Error", description: e.message, variant: "destructive" }); },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => { toast({ title: "Subscribed", description: data.message || "You'll receive our latest updates." }); setNewsletterEmail(""); },
    onError: (e: Error) => { toast({ title: "Error", description: e.message, variant: "destructive" }); },
  });

  /* ── Data ────────────────────────────────────────────────────── */
  const services = [
    { icon: Code2, title: "Custom Software Development", desc: "Enterprise-grade web platforms, microservices, REST & GraphQL APIs, and legacy modernisation — delivered with production-grade CI/CD pipelines." },
    { icon: Cloud, title: "Cloud & DevOps", desc: "Security-first cloud architecture across AWS, Azure, and GCP. We design, migrate, and manage infrastructure that scales with cost optimisation built in." },
    { icon: Cpu, title: "IoT & Edge Computing", desc: "End-to-end connected systems with real-time SCADA integration, edge computing, predictive analytics, and AMI for energy and industrial sectors." },
    { icon: BrainCircuit, title: "AI & Machine Learning", desc: "Production-ready ML pipelines, predictive models, NLP systems, and computer vision solutions. AI that actually ships — not just prototypes." },
    { icon: Smartphone, title: "Enterprise Mobility", desc: "Cross-platform mobile experiences with native performance. iOS, Android, Flutter, and React Native — from concept through app store launch." },
    { icon: BarChart3, title: "Data Engineering & Analytics", desc: "Unified data platforms, real-time pipelines, and BI dashboards that turn raw data into boardroom-ready insights for decision makers." },
  ];

  const industries = [
    { icon: Zap, label: "Energy & Utilities" },
    { icon: TrendingUp, label: "Financial Services" },
    { icon: Shield, label: "Healthcare" },
    { icon: Factory, label: "Manufacturing" },
    { icon: Truck, label: "Logistics & Supply Chain" },
    { icon: ShoppingCart, label: "Retail & E-Commerce" },
    { icon: Building2, label: "Government & Smart Cities" },
    { icon: Radio, label: "Telecommunications" },
  ];

  const steps = [
    { num: "01", icon: Target, title: "Discovery & Strategy", desc: "We map your business goals to technical requirements through stakeholder interviews, audits, and competitive analysis." },
    { num: "02", icon: Layers, title: "Design & Architecture", desc: "Scalable system architecture paired with pixel-perfect UX. Every decision is peer-reviewed before code is written." },
    { num: "03", icon: Code2, title: "Agile Development", desc: "Two-week sprints with working demos. Real progress every cycle — full transparency through shared dashboards." },
    { num: "04", icon: Globe, title: "Deploy & Scale", desc: "Production deployment with 24/7 monitoring, automated alerting, and dedicated support that grows with your business." },
  ];

  const stats = [
    { v: <AnimatedCounter end={200} suffix="+" />, label: "Enterprises Served" },
    { v: <AnimatedCounter end={8} />, label: "Industries" },
    { v: <AnimatedCounter end={50} suffix="+" />, label: "Engineers" },
    { v: <><AnimatedCounter end={10} />+</>, label: "Years Experience" },
  ];

  const testimonials = [
    { name: "Rajesh Kumar", role: "CTO", company: "National Power Grid Corp", quote: "iOne Techlabs transformed our grid operations. Their IoT solution reduced our outage response time from hours to minutes. Deep domain expertise made all the difference.", avatar: "RK" },
    { name: "Priya Sharma", role: "VP Engineering", company: "FinServ Holdings", quote: "We evaluated five vendors. iOne was the only one that understood both the technical complexity and regulatory requirements. Delivered on time, under budget.", avatar: "PS" },
    { name: "Dr. Anand Mehta", role: "Director of IT", company: "Metro Health Network", quote: "The patient management system fundamentally changed how our 12 hospitals operate — 40% cost reduction while improving care quality.", avatar: "AM" },
  ];

  const navItems = ["Services", "Industries", "Process", "About", "Contact"];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ══════════════════ NAV ══════════════════ */}
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0 group" data-testid="link-home">
              <Logo className="h-10 md:h-12 w-auto transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(245,166,35,0.5)]" />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item} href={`#${slugify(item)}`}
                  className="relative text-[13px] font-medium text-white/55 hover:text-white transition-all duration-300 tracking-wide uppercase px-4 py-2 rounded-md hover:bg-white/[0.05] group"
                  data-testid={`link-${slugify(item)}`}
                >
                  {item}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919959933363" className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-300 group">
                <span className="w-7 h-7 rounded-full bg-white/[0.06] group-hover:bg-primary/20 flex items-center justify-center transition-all">
                  <Phone className="h-3 w-3 group-hover:text-primary transition-colors" />
                </span>
                <span className="hidden xl:inline">+91 99599 33363</span>
              </a>
              <div className="w-px h-5 bg-white/10" />
              <a href="#contact">
                <Button size="sm" className="glow-amber bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" data-testid="button-get-started">
                  Get Started <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </a>
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden text-white/70 hover:text-white hover:bg-white/[0.06]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div className="lg:hidden py-4 border-t border-white/10" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a key={item} href={`#${slugify(item)}`} className="text-white/60 hover:text-white text-sm font-medium py-3 px-2 transition-colors" onClick={() => setMobileMenuOpen(false)} data-testid={`link-mobile-${slugify(item)}`}>{item}</a>
                  ))}
                  <div className="pt-3 border-t border-white/10 mt-2">
                    <a href="#contact"><Button className="w-full bg-primary text-primary-foreground" data-testid="button-mobile-get-started">Get Started</Button></a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060d18]">

        {/* Animated ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#F5A623]/[0.10] blur-[130px] animate-orb-1" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#22C55E]/[0.08] blur-[110px] animate-orb-2" />
          <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#F5A623]/[0.06] blur-[100px] animate-orb-3" />

          {/* Subtle grid mesh */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          {/* Accent vertical line */}
          <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-48 md:pb-36 w-full">
          <motion.div className="max-w-4xl" initial="initial" animate="animate" variants={stagger}>

            {/* Trust badge */}
            <motion.div variants={fadeUp} className="mb-10">
              <span className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-full px-5 py-2.5" data-testid="badge-trust">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-amber absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[13px] text-white/75 font-medium tracking-wide">Trusted by 200+ enterprises across 8 industries</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[1.04] tracking-tight mb-8" data-testid="text-hero-title">
              <span className="text-white">Technology that</span>
              <br />
              <span className="text-white">delivers </span>
              <span className="text-gradient-hero">outcomes.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed mb-12" data-testid="text-hero-description">
              iOne Techlabs engineers software, cloud, IoT, and AI solutions for enterprises
              that need results — not reports. From energy grids to financial platforms,
              we build what matters.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-24">
              <a href="#contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-amber shadow-2xl font-semibold" data-testid="button-hero-started">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#industries">
                <Button size="lg" variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/[0.07] hover:border-white/30 backdrop-blur-sm" data-testid="button-hero-cases">
                  <Play className="mr-2 h-3.5 w-3.5 fill-current" /> View Case Studies
                </Button>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-12 gap-y-6 border-t border-white/[0.10] pt-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{s.v}</div>
                  <div className="text-[11px] text-white/40 mt-1 uppercase tracking-[0.14em] font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════ TRUST BAR ══════════════════ */}
      <section className="py-10 md:py-14 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium whitespace-nowrap">Cloud Partners</span>
              <span className="text-border">|</span>
              <div className="flex items-center gap-7">
                <SiAmazonwebservices className="h-7 w-auto text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors" />
                <span className="text-sm font-semibold text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors tracking-wider">AZURE</span>
                <SiGooglecloud className="h-5 w-auto text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[{ icon: Award, text: "ISO 27001 Certified" }, { icon: Shield, text: "SOC 2 Compliant" }, { icon: Lock, text: "HIPAA Ready" }].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground/40 uppercase tracking-[0.14em] font-medium">
                  <b.icon className="h-3.5 w-3.5" /> {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" className="py-24 md:py-36 relative">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 max-w-2xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">Capabilities</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-5" data-testid="text-services-title">What We Build</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
              Full-spectrum technology services — from architecture through deployment, backed by senior engineers with deep domain expertise.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="glass-card rounded-2xl p-8 cursor-default"
                data-testid={`card-service-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ INDUSTRIES ══════════════════ */}
      <section id="industries" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14 max-w-2xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">Verticals</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-industries-title">Industries We Serve</motion.h2>
          </motion.div>

          {/* Mobile: horizontal scroll  |  md+: flex-wrap centered */}
          <div className="md:hidden flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {industries.map((ind, i) => (
              <div key={i}
                className="flex items-center gap-2.5 glass rounded-full px-5 py-2.5 shrink-0 cursor-default"
                data-testid={`badge-industry-${i}`}
              >
                <ind.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-white/80 whitespace-nowrap">{ind.label}</span>
              </div>
            ))}
          </div>
          <motion.div className="hidden md:flex flex-wrap justify-center gap-4" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {industries.map((ind, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-3 glass rounded-full px-6 py-3 hover:border-accent/30 hover:bg-accent/[0.05] transition-all duration-300 cursor-default"
                data-testid={`badge-industry-md-${i}`}
              >
                <ind.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-white/80">{ind.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-accent/[0.04]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div key={i}
                className="bg-card/60 backdrop-blur-sm p-10 md:p-12 flex flex-col items-center text-center"
                initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                data-testid={`stat-${i}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">{s.v}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-[0.16em] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section id="process" className="py-24 md:py-36 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 max-w-2xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">Methodology</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-process-title">Our Process</motion.h2>
          </motion.div>

          <div className="relative">
            {/* Animated connecting line — reveals left-to-right on scroll */}
            <motion.div
              className="hidden md:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

          <motion.div className="grid md:grid-cols-4 gap-8 relative" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>

            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative flex flex-col items-center text-center" data-testid={`step-${i}`}>
                <div className="relative z-10 w-11 h-11 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(245,166,35,0.15)]">
                  <span className="text-primary font-bold text-xs">{step.num}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="py-24 md:py-32 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 max-w-2xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">Client Voices</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-testimonials-title">What Our Clients Say</motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="glass-card rounded-2xl p-8 flex flex-col"
                data-testid={`card-testimonial-${i}`}
              >
                <Quote className="h-8 w-8 text-primary/40 mb-6 flex-shrink-0" />
                <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">About Us</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6" data-testid="text-about-title">
                Built by engineers, for enterprises.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                Founded over a decade ago in Hyderabad, iOne Techlabs has grown from a boutique software studio into a full-spectrum enterprise technology partner. We've shipped 500+ solutions across 8 verticals for clients ranging from national power utilities to fast-scaling fintech platforms.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
                What sets us apart is our relentless focus on outcomes — not effort. Every engagement is measured against business KPIs, not just delivery milestones.
              </motion.p>
              <motion.div variants={fadeUp}>
                <a href="#contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-amber" data-testid="button-about-contact">
                    Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              {[
                { num: "500+", label: "Projects Delivered", color: "text-primary" },
                { num: "99.9%", label: "Uptime Guarantee", color: "text-accent" },
                { num: "10+", label: "Years in Operation", color: "text-primary" },
                { num: "8", label: "Industry Verticals", color: "text-accent" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-6 text-center" data-testid={`card-about-${i}`}>
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.num}</div>
                  <div className="text-xs text-muted-foreground font-medium">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f2d] to-[#060d18]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/[0.08] blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase mb-6">Let's Build</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6" data-testid="text-cta-title">
              Ready to build<br />what matters?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 200+ enterprises that chose iOne Techlabs to engineer their most critical systems.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="#contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-amber text-base font-semibold px-10" data-testid="button-cta">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">Contact</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6" data-testid="text-contact-title">
                Let's start a conversation.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
                Tell us about your challenge. We'll get back to you within 24 hours with a clear assessment and a plan of action.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-5">
                {[
                  { icon: Phone, label: "+91 99599 33363", href: "tel:+919959933363" },
                  { icon: Mail, label: "hello@ionetechlabs.com", href: "mailto:hello@ionetechlabs.com" },
                  { icon: MapPin, label: "2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="flex items-start gap-4 group">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                      <c.icon className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors pt-2.5">{c.label}</span>
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
              <form onSubmit={(e) => { e.preventDefault(); if (!contactForm.name || !contactForm.email || !contactForm.message) { toast({ title: "Required Fields", description: "Please fill all required fields.", variant: "destructive" }); return; } contactMutation.mutate(contactForm); }} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2 block">Name *</label>
                    <Input value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="bg-white/[0.04] border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50" data-testid="input-name" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2 block">Email *</label>
                    <Input type="email" value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="bg-white/[0.04] border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50" data-testid="input-email" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2 block">Company</label>
                  <Input value={contactForm.company} onChange={(e) => setContactForm(f => ({ ...f, company: e.target.value }))} placeholder="Your company" className="bg-white/[0.04] border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50" data-testid="input-company" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2 block">Message *</label>
                  <Textarea value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your project..." rows={5} className="bg-white/[0.04] border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 resize-none" data-testid="input-message" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" disabled={contactMutation.isPending} data-testid="button-contact-submit">
                  {contactMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="border-t border-border/30 py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <Logo className="h-10 w-auto mb-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]" />
              <p className="text-sm text-muted-foreground/60 mb-6 max-w-xs leading-relaxed">
                Enterprise technology solutions for India's most ambitious companies. Software, Cloud, IoT & AI.
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-muted-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-300" data-testid={`link-social-${i}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Services", links: ["Custom Software", "Cloud & DevOps", "IoT & Edge", "AI & ML", "Enterprise Mobility", "Data Engineering"] },
              { title: "Company", links: ["About Us", "Our Process", "Case Studies", "Careers", "Blog"] },
              { title: "Contact", links: ["+91 99599 33363", "hello@ionetechlabs.com", "Begumpet, Hyderabad", "Get in Touch"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60 mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-muted-foreground/50 hover:text-foreground/80 transition-colors duration-200">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-border/30 pt-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground/50">Stay ahead with enterprise tech insights.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) newsletterMutation.mutate(newsletterEmail); }} className="flex gap-2 w-full sm:w-auto">
                <Input type="email" placeholder="your@email.com" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="bg-white/[0.04] border-white/10 text-foreground placeholder:text-muted-foreground/40 w-56" data-testid="input-newsletter" />
                <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0" disabled={newsletterMutation.isPending} data-testid="button-newsletter">
                  {newsletterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/35">© 2026 iOne Techlabs. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
                <a key={i} href="#" className="text-xs text-muted-foreground/35 hover:text-muted-foreground/60 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

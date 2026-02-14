import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight, ArrowUpRight, Menu, X, Mail, Phone, MapPin,
  Linkedin, Twitter, Loader2, Code2, Cloud, Cpu, Smartphone,
  BrainCircuit, Palette, ChevronRight, Zap, Shield, BarChart3,
  Globe, Server, Layers, CheckCircle2, Play,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import logo from "@assets/image_1768908388633.png";
import heroImage from "@assets/images/hero-main.png";
import devImage from "@assets/images/service-software-dev.png";
import cloudDataImage from "@assets/images/service-cloud.png";
import smartGridImage from "@assets/images/service-iot-smartgrid.png";
import mobileImage from "@assets/images/service-mobile.png";
import analyticsImage from "@assets/images/service-ai-data.png";
import teamWorkImage from "@assets/images/about-team.png";
import uiuxImage from "@assets/images/service-uiux.png";
import usecaseEnergyImage from "@assets/images/usecase-energy.png";
import usecaseFinanceImage from "@assets/images/usecase-finance.png";
import usecaseHealthcareImage from "@assets/images/usecase-healthcare.png";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
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
    onError: (error: Error) => { toast({ title: "Error", description: error.message, variant: "destructive" }); },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => { toast({ title: "Subscribed!", description: data.message || "You'll receive our latest updates." }); setNewsletterEmail(""); },
    onError: (error: Error) => { toast({ title: "Error", description: error.message, variant: "destructive" }); },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) { toast({ title: "Required Fields", description: "Please fill in all required fields.", variant: "destructive" }); return; }
    contactMutation.mutate(contactForm);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) { toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" }); return; }
    newsletterMutation.mutate(newsletterEmail);
  };

  const services = [
    { title: "Custom Software", desc: "Enterprise applications built with modern architectures — full-stack web, microservices, APIs, and legacy modernization.", image: devImage, icon: Code2, features: ["Custom Web Apps", "API Development", "Legacy Modernization", "DevOps & CI/CD"] },
    { title: "Cloud & Infrastructure", desc: "Security-first cloud architecture across AWS, Azure, and GCP. Migrate, optimize, and manage with confidence.", image: cloudDataImage, icon: Cloud, features: ["Cloud Migration", "Infrastructure as Code", "Cost Optimization", "Multi-Cloud"] },
    { title: "IoT & Smart Grid", desc: "Intelligent connected systems with real-time monitoring, predictive analytics, and edge computing for energy and manufacturing.", image: smartGridImage, icon: Cpu, features: ["Smart Grid Systems", "Edge Computing", "Real-Time Monitoring", "Predictive Maintenance"] },
    { title: "Mobile Applications", desc: "Cross-platform mobile experiences with native performance — from ideation through app store launch and beyond.", image: mobileImage, icon: Smartphone, features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"] },
    { title: "AI & Data Analytics", desc: "Machine learning models, predictive analytics, and AI-powered automation that transforms how your business operates.", image: analyticsImage, icon: BrainCircuit, features: ["Machine Learning", "Predictive Analytics", "NLP & Computer Vision", "Data Pipelines"] },
    { title: "UI/UX Design", desc: "Human-centered design backed by research. Interfaces that drive engagement, increase conversion, and delight users.", image: uiuxImage, icon: Palette, features: ["User Research", "Prototyping", "Design Systems", "Accessibility"] },
  ];

  const layers = [
    { num: "01", title: "Discovery & Strategy", desc: "Deep-dive into your goals, technical landscape, and user needs to define the right approach.", icon: Globe, color: "primary" },
    { num: "02", title: "Architecture & Design", desc: "Scalable, secure solution architecture paired with intuitive, beautiful experience design.", icon: Layers, color: "primary" },
    { num: "03", title: "Agile Development", desc: "Iterative sprints with continuous delivery. You see progress every two weeks, not after six months.", icon: Zap, color: "accent" },
    { num: "04", title: "Launch & Scale", desc: "Deploy, monitor, optimize. Post-launch support ensures your solution grows with your business.", icon: Server, color: "accent" },
  ];

  const useCases = [
    { title: "Energy & Utilities", stat: "60%", statLabel: "Outage Reduction", desc: "Modernized grid infrastructure for a major power utility with IoT sensors, real-time analytics, and predictive maintenance — reducing outages by 60% and operational costs by 35%.", features: ["Real-time grid monitoring across 10,000+ nodes", "AI-powered predictive fault detection", "Automated load balancing & demand response"], icon: Zap, image: usecaseEnergyImage, metrics: [{ v: "60%", l: "Fewer Outages" }, { v: "35%", l: "Cost Reduction" }, { v: "99.9%", l: "Uptime" }] },
    { title: "Financial Services", stat: "3x", statLabel: "Faster Processing", desc: "Built a cloud-native trading platform processing millions of transactions with sub-millisecond latency and 99.99% uptime for a leading financial institution.", features: ["High-frequency data processing pipeline", "Real-time regulatory compliance engine", "AI-powered fraud detection system"], icon: BarChart3, image: usecaseFinanceImage, metrics: [{ v: "3x", l: "Faster Processing" }, { v: "99.99%", l: "Uptime" }, { v: "$2M+", l: "Fraud Prevented" }] },
    { title: "Healthcare Technology", stat: "40%", statLabel: "Cost Savings", desc: "Developed a patient management system with AI-driven diagnostics, reducing administrative overhead and improving care quality for a hospital network.", features: ["HIPAA-compliant cloud architecture", "AI diagnostic support & image analysis", "Integrated telemedicine platform"], icon: Shield, image: usecaseHealthcareImage, metrics: [{ v: "40%", l: "Cost Savings" }, { v: "3x", l: "Faster Diagnostics" }, { v: "50K+", l: "Patients Served" }] },
  ];

  const clients = ["Tata Power", "NTPC", "Adani Power", "Telangana State Power", "BSES Rajdhani", "Torrent Power", "CESC Limited", "UPPCL"];

  const navItems = ["Services", "Process", "Use Cases", "About", "Contact"];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── NAV ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/40" : "bg-transparent"}`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <img src={logo} alt="iOne Techlabs" className="h-10 md:h-12 w-auto" data-testid="img-logo" />
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 relative group"
                  data-testid={`link-${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            <div className="hidden md:block">
              <a href="#contact"><Button data-testid="button-get-started">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div className="md:hidden py-4 border-t border-border/30" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground hover:text-foreground text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid={`link-mobile-${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
                  ))}
                  <Button className="w-full mt-2" data-testid="button-mobile-get-started">Get Started</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImage} alt="" className="w-full h-[120%] object-cover" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 w-full" style={{ opacity: heroOpacity }}>
          <motion.div className="max-w-4xl" initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Trusted by 200+ enterprises across India
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8" data-testid="text-hero-title">
              <span className="text-gradient-white">Build Smarter.</span>
              <br />
              <span className="text-gradient-white">Scale Faster.</span>
              <br />
              <span className="text-gradient-gold">Win Together.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10" data-testid="text-hero-description">
              iOne Techlabs is your end-to-end technology partner for software, cloud,
              IoT, and AI — delivering measurable outcomes, not just code.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
              <a href="#contact">
                <Button size="lg" className="glow-green" data-testid="button-hero-started">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#use-cases">
                <Button size="lg" variant="outline" className="backdrop-blur-sm border-white/20" data-testid="button-hero-cases">
                  <Play className="mr-2 h-4 w-4" /> See Our Work
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-8 max-w-lg">
              {[{ v: "500+", l: "Projects Delivered" }, { v: "99.9%", l: "Uptime SLA" }, { v: "40%", l: "Avg Cost Savings" }].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{s.v}</div>
                  <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div className="w-1 h-1.5 rounded-full bg-white/50" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS (PenguinAI style) ── */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              The Challenge
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto" data-testid="text-challenges-title">
              Digital transformation is hard.
              <br className="hidden md:block" />
              <span className="text-muted-foreground"> We make it predictable.</span>
            </motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {[
              { num: "70%", label: "of digital transformations fail due to poor execution and vendor lock-in.", icon: Shield },
              { num: "$1.3T", label: "wasted globally on IT projects that don't deliver business outcomes.", icon: BarChart3 },
              { num: "18mo", label: "average time-to-value for enterprise technology projects. We do it in 90 days.", icon: Zap },
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="p-8 md:p-10 h-full border-border/20 gradient-border overflow-visible relative group" data-testid={`card-challenge-${i}`}>
                  <p.icon className="h-8 w-8 text-primary/40 mb-6 transition-colors duration-300 group-hover:text-primary/70" />
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">{p.num}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">What We Do</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl" data-testid="text-services-title">
              End-to-end technology capabilities
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10">
            <motion.div className="lg:col-span-5 space-y-1" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              {services.map((s, i) => {
                const Icon = s.icon;
                const active = activeService === i;
                return (
                  <motion.div key={i} variants={fadeUp} onClick={() => setActiveService(i)} role="button" tabIndex={0}
                    className={`w-full text-left rounded-md transition-all flex items-center gap-4 group relative cursor-pointer p-4 md:p-5 ${active ? "bg-primary/10 border border-primary/20 glow-green" : "border border-transparent hover-elevate"}`}
                    data-testid={`button-service-${i}`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 ${active ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground group-hover:text-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm transition-colors duration-300 ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} data-testid={`text-service-title-${i}`}>
                        {s.title}
                      </h3>
                      <AnimatePresence>
                        {active && (
                          <motion.p className="text-xs text-muted-foreground mt-1.5 leading-relaxed" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                            {s.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${active ? "text-primary rotate-90" : "text-muted-foreground/30"}`} />
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div key={activeService} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5 }}
                  className="sticky top-28"
                >
                  <div className="relative rounded-md overflow-hidden group" data-testid={`card-service-detail-${activeService}`}>
                    <img src={services[activeService].image} alt={services[activeService].title} className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute top-6 left-6 right-6">
                      <div className="flex flex-wrap gap-2">
                        {services[activeService].features.map((f, j) => (
                          <motion.span key={f} className="text-[11px] font-medium text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.06 + 0.15 }}>
                            {f}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{services[activeService].title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed max-w-md mb-4">{services[activeService].desc}</p>
                      <a href="#contact" className="inline-flex items-center gap-2 text-primary text-sm font-semibold group/link" data-testid={`link-service-learn-${activeService}`}>
                        Discuss this service
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS (PenguinAI Layers) ── */}
      <section id="process" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="text-center mb-20 max-w-3xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">How We Work</span>
              <span className="w-10 h-px bg-primary" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight" data-testid="text-process-title">
              From idea to <span className="text-gradient-gold">impact</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Our proven methodology de-risks adoption and ensures every project delivers measurable results — with low barriers to entry and exit.
            </motion.p>
          </motion.div>

          <motion.div className="relative" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent -translate-y-1/2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {layers.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.div key={i} variants={fadeUp} data-testid={`card-process-${i}`}>
                    <Card className="p-6 md:p-8 h-full border-border/20 group transition-all duration-500 hover:border-primary/30 overflow-visible relative gradient-border">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl font-bold text-gradient-green">{l.num}</span>
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:glow-green">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3">{l.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="text-center mt-14" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <a href="#contact">
              <Button size="lg" className="glow-green" data-testid="button-process-start">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section id="use-cases" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-20" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Proven Results</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl" data-testid="text-use-cases-title">
              Real outcomes, <span className="text-gradient-gold">not promises</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-12">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              const isReversed = i % 2 !== 0;
              return (
                <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger} data-testid={`card-usecase-${i}`}>
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${isReversed ? "lg:direction-rtl" : ""}`}>
                    <motion.div variants={fadeUp} className={isReversed ? "lg:order-2" : ""}>
                      <div className="relative rounded-md overflow-hidden group">
                        <img src={uc.image} alt={uc.title} className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex gap-4">
                            {uc.metrics.map((m, mi) => (
                              <div key={mi} className="bg-black/50 backdrop-blur-md rounded-md px-4 py-3 border border-white/10">
                                <div className="text-xl font-bold text-accent">{m.v}</div>
                                <div className="text-[10px] text-white/50 uppercase tracking-wider">{m.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className={`space-y-6 ${isReversed ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <span className="text-accent text-sm font-semibold uppercase tracking-wider">{uc.title}</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                        <span className="text-gradient-gold">{uc.stat}</span> {uc.statLabel}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">{uc.desc}</p>

                      <ul className="space-y-3 pt-2">
                        {uc.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm text-foreground/80">
                            <CheckCircle2 className="h-5 w-5 text-primary/60 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a href="#contact" className="inline-flex items-center gap-2 text-accent text-sm font-semibold group/link pt-2" data-testid={`link-usecase-${i}`}>
                        Read full case study
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <div className="relative rounded-md overflow-hidden group">
                <img src={teamWorkImage} alt="iOne Techlabs Team" className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-[1.04]" data-testid="img-team" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  {[{ v: "10+", l: "Years" }, { v: "150+", l: "Engineers" }, { v: "6", l: "Industries" }].map((s) => (
                    <div key={s.l} className="bg-black/50 backdrop-blur-md rounded-md px-4 py-3 border border-white/10 flex-1 text-center">
                      <div className="text-xl font-bold text-white">{s.v}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-px bg-primary" />
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">About Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-about-title">
                Built by engineers, <span className="text-gradient-green">for engineers</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                iOne Techlabs is a global technology company delivering secure, scalable, and innovative
                solutions. We combine deep industry expertise with cutting-edge engineering to help
                businesses navigate digital transformation with confidence.
              </p>
              <div className="space-y-3 pt-2">
                {["ISO 27001 certified security practices", "Agile methodology with 2-week sprint cycles", "24/7 monitoring and dedicated support teams", "Multi-cloud expertise across AWS, Azure & GCP"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <a href="#contact"><Button variant="outline" data-testid="button-about-contact">Work With Us <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Trusted by leading enterprises</span>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {clients.map((c, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="flex items-center justify-center p-6 md:p-8 border-border/20 group transition-all duration-500 hover:border-primary/20 overflow-visible relative gradient-border" data-testid={`card-client-${i}`}>
                  <span className="font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors duration-500 text-center">{c}</span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-8">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight" data-testid="text-cta-title">
              <span className="text-gradient-white">Ready to</span>{" "}
              <span className="text-gradient-green">Transform</span>
              <br />
              <span className="text-gradient-white">Your Business?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join 200+ enterprises that trust iOne Techlabs to deliver technology
              solutions that actually move the needle.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#contact"><Button size="lg" className="glow-green" data-testid="button-cta-contact">Start a Conversation <ArrowRight className="ml-2 h-5 w-5" /></Button></a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-px bg-primary" />
                  <span className="text-primary text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4" data-testid="text-contact-title">
                  Let's build <span className="text-gradient-green">something great</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have a project in mind? Our team responds within 24 hours.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@ionetechlabs.com" },
                  { icon: Phone, label: "Phone", value: "+91 99599 33363" },
                  { icon: MapPin, label: "Office", value: "2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:glow-green">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{item.label}</div>
                      <div className="text-muted-foreground text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.form variants={fadeUp} className="flex gap-2" onSubmit={handleNewsletterSubmit} data-testid="form-newsletter">
                <Input type="email" placeholder="Subscribe to updates..." value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} disabled={newsletterMutation.isPending} data-testid="input-newsletter-email" />
                <Button type="submit" disabled={newsletterMutation.isPending} data-testid="button-subscribe">
                  {newsletterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </motion.form>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
              <Card className="p-6 md:p-8 border-border/20 gradient-border" data-testid="card-contact-form">
                <form className="space-y-5" onSubmit={handleContactSubmit} data-testid="form-contact">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input placeholder="John Doe" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} disabled={contactMutation.isPending} data-testid="input-name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input type="email" placeholder="john@company.com" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} disabled={contactMutation.isPending} data-testid="input-email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <Input placeholder="Your Company Name" value={contactForm.company} onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })} disabled={contactMutation.isPending} data-testid="input-company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea placeholder="Tell us about your project..." rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} disabled={contactMutation.isPending} data-testid="input-message" />
                  </div>
                  <Button type="submit" className="w-full glow-green" size="lg" disabled={contactMutation.isPending} data-testid="button-submit-contact">
                    {contactMutation.isPending ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</>) : (<>Send Message <ArrowRight className="ml-2 h-5 w-5" /></>)}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/20 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="iOne Techlabs" className="h-10 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-sm text-muted-foreground/70 mb-6">Transforming businesses through innovative technology.</p>
              <div className="flex gap-3">
                {[{ icon: Linkedin, id: "linkedin" }, { icon: Twitter, id: "twitter" }, { icon: SiGithub, id: "github" }].map((s) => (
                  <a key={s.id} href="#" className="w-9 h-9 rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:border-primary/30 transition-all duration-300" data-testid={`link-${s.id}`}>
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: [{ name: "Software Development", href: "#services" }, { name: "Cloud Solutions", href: "#services" }, { name: "IoT & Smart Grid", href: "#services" }, { name: "Data & AI", href: "#services" }] },
              { title: "Company", links: [{ name: "About Us", href: "#about" }, { name: "Use Cases", href: "#use-cases" }, { name: "Contact", href: "#contact" }] },
              { title: "Resources", links: [{ name: "Case Studies", href: "#use-cases" }, { name: "Blog", href: "#" }, { name: "Privacy Policy", href: "#" }] },
            ].map((sec) => (
              <div key={sec.title}>
                <h4 className="font-semibold text-foreground/80 mb-4 text-sm">{sec.title}</h4>
                <ul className="space-y-3 text-sm">
                  {sec.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-muted-foreground/50 hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-1">
                        {link.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/40" data-testid="text-copyright">&copy; {new Date().getFullYear()} iOne Techlabs. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground/40">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

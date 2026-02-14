import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Loader2,
  Code2,
  Cloud,
  Cpu,
  Smartphone,
  BrainCircuit,
  Palette,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Server,
  Database,
  Layers,
  CheckCircle2,
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
import iotDevicesImage from "@assets/images/hero-main.png";

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

function FloatingGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: `${10 + i * 15}%`,
            top: `${5 + i * 12}%`,
            background: i % 2 === 0
              ? 'radial-gradient(circle, hsl(148 55% 38% / 0.04) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(42 80% 52% / 0.03) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 15 * (i % 2 === 0 ? -1 : 1), 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GlowLine({ color = "primary" }: { color?: "primary" | "accent" }) {
  const c = color === "primary" ? "hsl(148 55% 38%)" : "hsl(42 80% 52%)";
  return (
    <motion.div
      className="h-px w-full"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${c} 50%, transparent 100%)`,
        opacity: 0.4,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof contactForm) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => {
      toast({ title: "Message Sent!", description: data.message || "We'll get back to you within 24 hours." });
      setContactForm({ name: "", email: "", company: "", message: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => {
      toast({ title: "Subscribed!", description: data.message || "You'll receive our latest updates." });
      setNewsletterEmail("");
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({ title: "Required Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    contactMutation.mutate(contactForm);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    newsletterMutation.mutate(newsletterEmail);
  };

  const services = [
    {
      title: "Software Development",
      description: "Build robust, scalable enterprise applications with modern architectures. We work across full-stack web, microservices, APIs, and legacy modernization.",
      image: devImage,
      icon: Code2,
      features: ["Custom Web Applications", "API Development", "Legacy Modernization", "DevOps & CI/CD"],
    },
    {
      title: "Cloud Solutions",
      description: "Migrate, optimize, and manage your cloud infrastructure with security-first architecture across AWS, Azure, and GCP. Reduce costs while increasing performance.",
      image: cloudDataImage,
      icon: Cloud,
      features: ["Cloud Migration", "Infrastructure as Code", "Cost Optimization", "Multi-Cloud Strategy"],
    },
    {
      title: "IoT & Smart Grid",
      description: "Deploy intelligent connected systems with real-time monitoring, predictive analytics, and edge computing for energy, manufacturing, and smart cities.",
      image: smartGridImage,
      icon: Cpu,
      features: ["Smart Grid Systems", "Edge Computing", "Real-Time Monitoring", "Predictive Maintenance"],
    },
    {
      title: "Mobile Applications",
      description: "Cross-platform mobile experiences that engage users with native performance. From ideation to app store — we handle the entire lifecycle.",
      image: mobileImage,
      icon: Smartphone,
      features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"],
    },
    {
      title: "Data & AI",
      description: "Turn data into decisions with advanced analytics, machine learning models, and AI-powered automation that transforms how your business operates.",
      image: analyticsImage,
      icon: BrainCircuit,
      features: ["Machine Learning", "Predictive Analytics", "NLP & Computer Vision", "Data Pipelines"],
    },
    {
      title: "UI/UX Design",
      description: "Human-centered design that drives engagement. Research-backed interfaces that users love to interact with, increasing conversion and retention.",
      image: uiuxImage,
      icon: Palette,
      features: ["User Research", "Prototyping", "Design Systems", "Accessibility"],
    },
  ];

  const layers = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We deep-dive into your business goals, technical landscape, and user needs to define the right approach and roadmap.",
      icon: Globe,
    },
    {
      number: "02",
      title: "Architecture & Design",
      description: "Our architects design scalable, secure solutions while our designers craft intuitive, beautiful experiences.",
      icon: Layers,
    },
    {
      number: "03",
      title: "Agile Development",
      description: "Iterative sprints with continuous delivery. You see progress every two weeks with full transparency and collaboration.",
      icon: Zap,
    },
    {
      number: "04",
      title: "Launch & Scale",
      description: "We deploy, monitor, and optimize. Post-launch support ensures your solution grows with your business needs.",
      icon: Server,
    },
  ];

  const useCases = [
    {
      title: "Energy & Utilities",
      stat: "60%",
      statLabel: "Outage Reduction",
      description: "Modernized grid infrastructure for a major power utility with IoT sensors, real-time analytics, and predictive maintenance.",
      features: ["Real-time grid monitoring", "Predictive fault detection", "Automated load balancing"],
      icon: Zap,
      image: usecaseEnergyImage,
    },
    {
      title: "Financial Services",
      stat: "3x",
      statLabel: "Faster Processing",
      description: "Built a cloud-native trading platform processing millions of transactions with sub-millisecond latency and 99.99% uptime.",
      features: ["High-frequency data processing", "Regulatory compliance", "Fraud detection AI"],
      icon: BarChart3,
      image: usecaseFinanceImage,
    },
    {
      title: "Healthcare",
      stat: "40%",
      statLabel: "Cost Savings",
      description: "Developed a patient management system with AI-driven diagnostics, reducing administrative overhead and improving care quality.",
      features: ["HIPAA-compliant architecture", "AI diagnostic support", "Telemedicine platform"],
      icon: Shield,
      image: usecaseHealthcareImage,
    },
  ];

  const clients = [
    "Tata Power", "NTPC", "Adani Power", "Telangana State Power",
    "BSES Rajdhani", "Torrent Power", "CESC Limited", "UPPCL",
  ];

  const techStack = [
    { name: "React", icon: Code2 },
    { name: "Node.js", icon: Server },
    { name: "Python", icon: BrainCircuit },
    { name: "AWS", icon: Cloud },
    { name: "Kubernetes", icon: Database },
    { name: "TensorFlow", icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo} alt="iOne Techlabs" className="h-10 md:h-12 w-auto" data-testid="img-logo" />
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["Services", "Process", "Use Cases", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative group"
                  data-testid={`link-${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              <a href="#contact">
                <Button data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden py-4 border-t border-border/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-4">
                  {["Services", "Process", "Use Cases", "About", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.toLowerCase().replace(" ", "-")}`}
                    >
                      {item}
                    </a>
                  ))}
                  <div className="pt-4">
                    <Button className="w-full" data-testid="button-mobile-get-started">Get Started</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImage} alt="Technology Innovation" className="w-full h-full object-cover scale-110" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <FloatingGrid />

        <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40" style={{ opacity: heroOpacity }}>
          <motion.div
            className="max-w-3xl space-y-8"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
                <span className="w-8 h-px bg-primary" />
                Enterprise Technology Partner
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] text-white tracking-tight"
              variants={fadeUp}
              data-testid="text-hero-title"
            >
              Evolving Your Business with{" "}
              <span className="relative inline-block">
                <span className="text-accent">Intelligent</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-accent/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </span>{" "}
              <span className="text-accent">Technology</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
              variants={fadeUp}
              data-testid="text-hero-description"
            >
              From strategy to implementation, we deliver software, cloud, and IoT solutions
              that drive real business outcomes for enterprises worldwide.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeUp}>
              <a href="#contact">
                <Button size="lg" data-testid="button-hero-started">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#use-cases">
                <Button size="lg" variant="outline" className="backdrop-blur-sm" data-testid="button-hero-cases">
                  View Case Studies
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
              variants={fadeUp}
            >
              {[
                { label: "Enterprise Clients", value: "200+" },
                { label: "Projects Delivered", value: "500+" },
                { label: "Uptime SLA", value: "99.9%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid md:grid-cols-3 gap-12 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              { end: 500, suffix: "+", label: "Projects delivered across 6 industries with consistent on-time delivery", icon: CheckCircle2 },
              { end: 40, suffix: "%", label: "Average cost reduction through cloud optimization and automation", icon: BarChart3 },
              { end: 99, suffix: ".9%", label: "Uptime guaranteed across all managed infrastructure and applications", icon: Shield },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative"
                data-testid={`text-stat-${i}`}
              >
                <div className="absolute -left-4 top-0 w-px h-full bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden md:block" />
                <div className="flex items-center gap-3 mb-4">
                  <stat.icon className="h-5 w-5 text-primary/60" />
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
                  {stat.suffix === ".9%" ? (
                    <><AnimatedCounter end={stat.end} />.9%</>
                  ) : (
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <GlowLine />
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" className="py-24 md:py-32 relative overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="mb-16 max-w-2xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                <span className="w-8 h-px bg-primary" />
                Our Services
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
              variants={fadeUp}
              data-testid="text-services-title"
            >
              Technology solutions that deliver
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground mt-6" variants={fadeUp}>
              End-to-end capabilities across the full technology lifecycle
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Service tabs - left side */}
            <motion.div
              className="lg:col-span-5 space-y-2"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeService === index;
                return (
                  <motion.button
                    key={index}
                    variants={fadeUp}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left p-5 rounded-md transition-all duration-300 flex items-start gap-4 group relative ${
                      isActive
                        ? "bg-primary/10 border border-primary/20"
                        : "border border-transparent hover:border-border/50"
                    }`}
                    data-testid={`button-service-${index}`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300 ${
                      isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`} data-testid={`text-service-title-${index}`}>
                        {service.title}
                      </h3>
                      {isActive && (
                        <motion.p
                          className="text-sm text-muted-foreground mt-2 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </div>
                    <ChevronRight className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      isActive ? "text-primary rotate-90" : "text-muted-foreground/40"
                    }`} />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Service detail - right side */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="sticky top-28"
                >
                  <div className="relative rounded-md overflow-hidden group cursor-pointer" data-testid={`card-service-detail-${activeService}`}>
                    <motion.img
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {services[activeService].features.map((feature, i) => (
                          <motion.span
                            key={feature}
                            className="text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 + 0.2 }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {services[activeService].title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                        {services[activeService].description}
                      </p>

                      <motion.div
                        className="flex items-center gap-2 text-primary mt-4 text-sm font-medium"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a href="#contact" className="flex items-center gap-2" data-testid={`link-service-learn-${activeService}`}>
                          Discuss this service <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section id="process" className="py-24 md:py-32 relative overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20 max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4 mx-auto">
                <span className="w-8 h-px bg-primary" />
                Our Process
                <span className="w-8 h-px bg-primary" />
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
              variants={fadeUp}
              data-testid="text-process-title"
            >
              From idea to impact
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground mt-6" variants={fadeUp}>
              Our proven methodology de-risks adoption and ensures every project delivers measurable results
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group relative"
                  data-testid={`card-process-${index}`}
                >
                  <Card className="p-6 md:p-8 h-full border-border/30 transition-all duration-500 group-hover:border-primary/30 relative overflow-visible">
                    <div className="absolute -top-5 left-6">
                      <span className="text-xs font-bold text-primary bg-background border border-primary/30 px-3 py-1.5 rounded-md">
                        {layer.number}
                      </span>
                    </div>

                    <div className="mt-4 mb-5">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{layer.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{layer.description}</p>
                    </div>

                    {index < 3 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ChevronRight className="h-5 w-5 text-primary/30" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <a href="#contact">
              <Button size="lg" data-testid="button-process-start">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <GlowLine color="accent" />

      {/* ═══════════════ USE CASES ═══════════════ */}
      <section id="use-cases" className="py-24 md:py-32 relative overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="mb-16 max-w-2xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                <span className="w-8 h-px bg-accent" />
                Use Cases
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
              variants={fadeUp}
              data-testid="text-use-cases-title"
            >
              Real outcomes across industries
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground mt-6" variants={fadeUp}>
              See how we've helped leading enterprises transform their operations with technology
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {useCases.map((uc, index) => {
              const Icon = uc.icon;
              return (
                <motion.div key={index} variants={fadeUp}>
                  <Card
                    className="h-full border-border/30 group transition-all duration-500 hover:border-accent/30 overflow-hidden relative"
                    data-testid={`card-usecase-${index}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={uc.image}
                        alt={uc.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/20">
                            <Icon className="h-5 w-5 text-accent" />
                          </div>
                          <h3 className="font-bold text-lg text-white">{uc.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 pt-4 md:pt-4">
                      <div className="mb-5">
                        <div className="text-5xl font-bold text-accent tracking-tight" data-testid={`text-usecase-stat-${index}`}>
                          {uc.stat}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{uc.statLabel}</div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {uc.description}
                      </p>

                      <ul className="space-y-2">
                        {uc.features.map((feature, fi) => (
                          <li key={fi} className="flex items-center gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className="h-4 w-4 text-primary/60 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-border/30">
                        <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300 group-hover:text-accent" data-testid={`link-usecase-${index}`}>
                          Read full case study
                          <motion.span className="inline-block" whileHover={{ x: 4 }}>
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.span>
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════ TECH STACK MARQUEE ═══════════════ */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Technologies We Work With</p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-muted-foreground/50 hover:text-foreground/70 transition-colors duration-500 group"
                  data-testid={`tech-${i}`}
                >
                  <Icon className="h-6 w-6 transition-colors duration-300 group-hover:text-primary/60" />
                  <span className="text-lg font-semibold">{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <div className="relative rounded-md overflow-hidden group">
                <img
                  src={teamWorkImage}
                  alt="iOne Techlabs Team"
                  className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                  data-testid="img-team"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                  {[
                    { value: "10+", label: "Years" },
                    { value: "150+", label: "Engineers" },
                    { value: "6", label: "Industries" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-black/40 backdrop-blur-sm rounded-md px-4 py-3 border border-white/10">
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase">
                <span className="w-8 h-px bg-primary" />
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-about-title">
                Innovative strategies, tailored solutions, sustainable growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                iOne Techlabs is a global technology company committed to delivering secure, scalable, and innovative
                solutions. We combine deep industry expertise with cutting-edge engineering to help businesses
                navigate digital transformation with confidence.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "ISO 27001 certified security practices",
                  "Agile methodology with 2-week sprint cycles",
                  "24/7 monitoring and dedicated support teams",
                  "Multi-cloud expertise across AWS, Azure & GCP",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a href="#contact">
                  <Button variant="outline" data-testid="button-about-contact">
                    Work With Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════ CLIENTS ═══════════════ */}
      <section id="clients" className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-wider mb-4 mx-auto">
              <span className="w-8 h-px bg-border" />
              Trusted By
              <span className="w-8 h-px bg-border" />
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight" data-testid="text-clients-title">
              Leading Enterprises Across India
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {clients.map((client, index) => (
              <motion.div key={index} variants={fadeUp}>
                <Card
                  className="flex items-center justify-center p-6 md:p-8 border-border/30 hover:border-primary/20 transition-all duration-500 group overflow-visible relative"
                  data-testid={`card-client-${index}`}
                >
                  <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
                    {client}
                  </span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowLine color="accent" />

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={iotDevicesImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
        </div>
        <FloatingGrid />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
              variants={fadeUp}
              data-testid="text-cta-title"
            >
              Ready to{" "}
              <span className="text-primary">Transform</span>{" "}
              Your Business?
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
              Join 200+ enterprises that trust iOne Techlabs to deliver technology solutions that matter.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4 pt-4" variants={fadeUp}>
              <a href="#contact">
                <Button size="lg" data-testid="button-cta-contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <FloatingGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                  <span className="w-8 h-px bg-primary" />
                  Connect With Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4" data-testid="text-contact-title">
                  Let's Build Together
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have a project in mind? Our team will get back to you within 24 hours.
                </p>
              </motion.div>

              <motion.div className="space-y-5" variants={fadeUp}>
                {[
                  { icon: Mail, label: "Email", value: "hello@ionetechlabs.com" },
                  { icon: Phone, label: "Phone", value: "+91 99599 33363" },
                  { icon: MapPin, label: "Office", value: "Flat No:210/3 Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
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
                <Input
                  type="email"
                  placeholder="Subscribe to updates..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterMutation.isPending}
                  data-testid="input-newsletter-email"
                />
                <Button type="submit" disabled={newsletterMutation.isPending} data-testid="button-subscribe">
                  {newsletterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </motion.form>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="p-6 md:p-8 border-border/30" data-testid="card-contact-form">
                <form className="space-y-5" onSubmit={handleContactSubmit} data-testid="form-contact">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        disabled={contactMutation.isPending}
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        disabled={contactMutation.isPending}
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <Input
                      placeholder="Your Company Name"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      disabled={contactMutation.isPending}
                      data-testid="input-company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      disabled={contactMutation.isPending}
                      data-testid="input-message"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={contactMutation.isPending} data-testid="button-submit-contact">
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-border/30 py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="iOne Techlabs" className="h-10 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-sm text-muted-foreground mb-4">
                Transforming businesses through innovative technology solutions.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, id: "linkedin" },
                  { icon: Twitter, id: "twitter" },
                  { icon: SiGithub, id: "github" },
                ].map((social) => (
                  <a
                    key={social.id}
                    href="#"
                    className="w-9 h-9 rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                    data-testid={`link-${social.id}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: [
                  { name: "Software Development", href: "#services" },
                  { name: "Cloud Solutions", href: "#services" },
                  { name: "IoT & Smart Grid", href: "#services" },
                  { name: "Data & AI", href: "#services" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "#about" },
                  { name: "Use Cases", href: "#use-cases" },
                  { name: "Clients", href: "#clients" },
                  { name: "Contact", href: "#contact" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Case Studies", href: "#use-cases" },
                  { name: "Blog", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-4 text-sm">{section.title}</h4>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-1">
                        {link.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} iOne Techlabs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

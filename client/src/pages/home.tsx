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
  Globe, Server, Layers, CheckCircle2, Play, Building2, Factory,
  ShoppingCart, Radio, Truck, Award, Users, Clock, Target,
  TrendingUp, Lock, Headphones, Quote,
} from "lucide-react";
import { SiGithub, SiAmazonwebservices, SiGooglecloud } from "react-icons/si";

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
import usecaseManufacturingImage from "@assets/images/usecase-manufacturing.png";
import usecaseRetailImage from "@assets/images/usecase-retail.png";
import usecaseGovernmentImage from "@assets/images/usecase-government.png";
import usecaseTelecomImage from "@assets/images/usecase-telecom.png";
import usecaseLogisticsImage from "@assets/images/usecase-logistics.png";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

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
    onSuccess: (data) => { toast({ title: "Message Sent", description: data.message || "We'll get back to you within 24 hours." }); setContactForm({ name: "", email: "", company: "", message: "" }); },
    onError: (error: Error) => { toast({ title: "Error", description: error.message, variant: "destructive" }); },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");
      return result;
    },
    onSuccess: (data) => { toast({ title: "Subscribed", description: data.message || "You'll receive our latest updates." }); setNewsletterEmail(""); },
    onError: (error: Error) => { toast({ title: "Error", description: error.message, variant: "destructive" }); },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) { toast({ title: "Required Fields", description: "Please fill in all required fields.", variant: "destructive" }); return; }
    contactMutation.mutate(contactForm);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    newsletterMutation.mutate(newsletterEmail);
  };

  const services = [
    { title: "Custom Software Engineering", desc: "Enterprise applications built with modern architectures. Full-stack web platforms, microservices, REST & GraphQL APIs, and legacy system modernization — delivered with production-grade CI/CD pipelines.", image: devImage, icon: Code2, features: ["Enterprise Web Platforms", "Microservices & APIs", "Legacy Modernization", "DevOps & CI/CD"] },
    { title: "Cloud & Infrastructure", desc: "Security-first cloud architecture across AWS, Azure, and GCP. We design, migrate, and manage infrastructure that scales — with cost optimization built in from day one.", image: cloudDataImage, icon: Cloud, features: ["Cloud Migration", "Infrastructure as Code", "Cost Optimization", "Multi-Cloud Strategy"] },
    { title: "IoT & Smart Grid Solutions", desc: "End-to-end connected systems with real-time SCADA integration, edge computing, predictive analytics, and advanced metering infrastructure for energy and industrial sectors.", image: smartGridImage, icon: Cpu, features: ["SCADA Integration", "Edge Computing", "AMI Systems", "Predictive Maintenance"] },
    { title: "Mobile Engineering", desc: "Cross-platform mobile experiences with native performance. From concept through app store launch — including ongoing analytics, A/B testing, and continuous improvement.", image: mobileImage, icon: Smartphone, features: ["iOS & Android Native", "Cross-Platform (Flutter/RN)", "Offline-First Architecture", "App Store Optimization"] },
    { title: "AI & Data Intelligence", desc: "Production-ready machine learning pipelines, predictive models, NLP systems, and computer vision solutions. We build AI that actually ships — not just prototypes.", image: analyticsImage, icon: BrainCircuit, features: ["ML Model Development", "Predictive Analytics", "NLP & Computer Vision", "Real-Time Data Pipelines"] },
    { title: "Product Design & UX", desc: "Research-driven design that converts. We combine user research, rapid prototyping, and design systems to create interfaces that drive measurable business outcomes.", image: uiuxImage, icon: Palette, features: ["User Research & Testing", "Rapid Prototyping", "Design Systems", "Conversion Optimization"] },
  ];

  const layers = [
    { num: "01", title: "Discovery & Strategy", desc: "We map your business goals to technical requirements. Stakeholder interviews, technical audits, and competitive analysis — so we build the right thing, not just any thing.", icon: Target },
    { num: "02", title: "Architecture & Design", desc: "Scalable system architecture paired with pixel-perfect UX. Every decision is documented, peer-reviewed, and stress-tested before a single line of code is written.", icon: Layers },
    { num: "03", title: "Iterative Development", desc: "Two-week sprints with working demos. You see real progress every cycle — not a surprise reveal after six months. Full transparency through shared dashboards.", icon: Zap },
    { num: "04", title: "Launch, Monitor & Scale", desc: "Production deployment with 24/7 monitoring, automated alerting, and dedicated support. Post-launch optimization ensures your solution grows with your business.", icon: Server },
  ];

  const industries = [
    { id: "energy", label: "Energy & Utilities", icon: Zap },
    { id: "finance", label: "Financial Services", icon: BarChart3 },
    { id: "healthcare", label: "Healthcare", icon: Shield },
    { id: "manufacturing", label: "Manufacturing", icon: Factory },
    { id: "retail", label: "Retail & E-Commerce", icon: ShoppingCart },
    { id: "government", label: "Government & Smart Cities", icon: Building2 },
    { id: "telecom", label: "Telecommunications", icon: Radio },
    { id: "logistics", label: "Logistics & Supply Chain", icon: Truck },
  ];

  const useCases = [
    { id: "energy", title: "Energy & Utilities", headline: "Smart Grid Modernization", stat: "60%", statLabel: "Outage Reduction", desc: "Modernized grid infrastructure for a major Indian power distribution company. Deployed 10,000+ IoT sensors with real-time SCADA integration, AI-powered fault prediction, and automated demand response — cutting outages by 60% and operational costs by 35%.", features: ["Real-time grid monitoring across 10,000+ sensor nodes", "AI-powered predictive fault detection (95% accuracy)", "Automated load balancing & demand response system", "SCADA system integration with legacy infrastructure"], image: usecaseEnergyImage, metrics: [{ v: "60%", l: "Fewer Outages" }, { v: "35%", l: "Cost Reduction" }, { v: "99.9%", l: "Grid Uptime" }] },
    { id: "finance", title: "Financial Services", headline: "Cloud-Native Trading Platform", stat: "3x", statLabel: "Processing Speed", desc: "Architected a cloud-native trading platform handling millions of daily transactions with sub-millisecond latency. Built real-time compliance engine, AI-powered fraud detection, and automated reporting for regulatory requirements.", features: ["High-frequency data processing with <1ms latency", "Real-time regulatory compliance automation", "AI-powered fraud detection (prevented $2M+ in fraud)", "Automated MIS and regulatory reporting"], image: usecaseFinanceImage, metrics: [{ v: "3x", l: "Faster Processing" }, { v: "99.99%", l: "Uptime SLA" }, { v: "$2M+", l: "Fraud Prevented" }] },
    { id: "healthcare", title: "Healthcare", headline: "Patient Management & AI Diagnostics", stat: "40%", statLabel: "Administrative Savings", desc: "Built an end-to-end patient management system with AI-driven diagnostic support, integrated telemedicine, and automated billing — reducing administrative overhead by 40% while improving diagnostic accuracy for a hospital network.", features: ["HIPAA-compliant cloud infrastructure on AWS", "AI diagnostic imaging support (radiology & pathology)", "Integrated telemedicine with real-time vitals", "Automated insurance verification & billing"], image: usecaseHealthcareImage, metrics: [{ v: "40%", l: "Cost Savings" }, { v: "3x", l: "Faster Diagnostics" }, { v: "50K+", l: "Patients Served" }] },
    { id: "manufacturing", title: "Manufacturing", headline: "Digital Twin & Predictive Maintenance", stat: "45%", statLabel: "Downtime Reduction", desc: "Implemented digital twin technology and IoT-based predictive maintenance for a large-scale manufacturing facility. Real-time equipment monitoring, automated quality control, and production optimization reduced unplanned downtime by 45%.", features: ["Digital twin simulation for production optimization", "IoT-based real-time equipment health monitoring", "Automated quality control with computer vision", "Predictive maintenance scheduling with ML models"], image: usecaseManufacturingImage, metrics: [{ v: "45%", l: "Less Downtime" }, { v: "28%", l: "Yield Increase" }, { v: "3x", l: "ROI in Year 1" }] },
    { id: "retail", title: "Retail & E-Commerce", headline: "AI-Powered Retail Analytics Platform", stat: "32%", statLabel: "Revenue Uplift", desc: "Developed a unified retail analytics platform with AI-driven demand forecasting, dynamic pricing, and personalized customer experiences — driving a 32% revenue uplift and 50% reduction in inventory waste for a multi-store retail chain.", features: ["AI demand forecasting with 94% accuracy", "Dynamic pricing engine with competitive intelligence", "Customer behavior analytics & personalization", "Real-time inventory optimization across 200+ stores"], image: usecaseRetailImage, metrics: [{ v: "32%", l: "Revenue Growth" }, { v: "50%", l: "Less Waste" }, { v: "94%", l: "Forecast Accuracy" }] },
    { id: "government", title: "Government & Smart Cities", headline: "Urban IoT Command Center", stat: "55%", statLabel: "Faster Response", desc: "Designed and deployed a smart city command center integrating traffic management, environmental monitoring, public safety, and utility management systems — improving emergency response times by 55% across the metropolitan area.", features: ["Unified IoT platform for city-wide sensor network", "Real-time traffic optimization & signal control", "Environmental monitoring (air quality, noise, water)", "Citizen engagement portal with real-time dashboards"], image: usecaseGovernmentImage, metrics: [{ v: "55%", l: "Faster Response" }, { v: "40%", l: "Energy Savings" }, { v: "2M+", l: "Citizens Served" }] },
    { id: "telecom", title: "Telecommunications", headline: "Network Intelligence Platform", stat: "70%", statLabel: "Faster Provisioning", desc: "Built an AI-powered network intelligence platform for a major telecom provider. Automated network provisioning, predictive capacity planning, and real-time anomaly detection reduced provisioning time by 70% and network incidents by 40%.", features: ["AI-driven network capacity planning & optimization", "Automated provisioning with zero-touch deployment", "Real-time network anomaly detection & self-healing", "Customer experience scoring with churn prediction"], image: usecaseTelecomImage, metrics: [{ v: "70%", l: "Faster Provisioning" }, { v: "40%", l: "Fewer Incidents" }, { v: "25%", l: "Churn Reduction" }] },
    { id: "logistics", title: "Logistics & Supply Chain", headline: "End-to-End Supply Chain Visibility", stat: "38%", statLabel: "Cost Optimization", desc: "Created an intelligent supply chain platform with real-time tracking, AI-powered route optimization, warehouse automation integration, and predictive demand planning — reducing logistics costs by 38% for a national distribution network.", features: ["Real-time shipment tracking with GPS & IoT sensors", "AI route optimization reducing fuel costs by 22%", "Warehouse automation integration (pick, pack, ship)", "Predictive demand planning with supplier management"], image: usecaseLogisticsImage, metrics: [{ v: "38%", l: "Cost Reduction" }, { v: "22%", l: "Fuel Savings" }, { v: "99.2%", l: "On-Time Delivery" }] },
  ];

  const filteredUseCases = activeIndustry === "all" ? useCases : useCases.filter(uc => uc.id === activeIndustry);

  const testimonials = [
    { name: "Rajesh Kumar", role: "CTO, National Power Grid Corp", quote: "iOne Techlabs transformed our grid operations. Their IoT solution reduced our outage response time from hours to minutes. The team's deep domain expertise in energy made all the difference.", avatar: "RK" },
    { name: "Priya Sharma", role: "VP Engineering, FinServ Holdings", quote: "We evaluated five vendors. iOne was the only one that understood both the technical complexity and regulatory requirements of our trading platform. Delivered on time, under budget.", avatar: "PS" },
    { name: "Dr. Anand Mehta", role: "Director of IT, Metro Health Network", quote: "The patient management system they built has fundamentally changed how our 12 hospitals operate. 40% reduction in administrative costs while improving patient care quality.", avatar: "AM" },
  ];

  const clients = ["Tata Power", "HDFC Bank", "Apollo Hospitals", "Mahindra Group", "Reliance Retail", "NTPC", "Bharti Airtel", "Delhivery"];
  const navItems = ["Services", "Industries", "Process", "About", "Contact"];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ══════════════════ NAV ══════════════════ */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"}`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 md:h-20">
            <a href="#" className="flex-shrink-0 group" data-testid="link-home">
              <img src={logo} alt="iOne Techlabs" className="h-9 md:h-11 w-auto transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(27,107,61,0.3)]" data-testid="img-logo" />
            </a>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative text-[13px] font-medium text-white/50 hover:text-white transition-all duration-300 tracking-wide uppercase px-4 py-2 rounded-md hover:bg-white/[0.04] group"
                  data-testid={`link-${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                  <span className="absolute bottom-0.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919959933363" className="group flex items-center gap-2 text-[13px] text-white/40 hover:text-white transition-all duration-300">
                <span className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300">
                  <Phone className="h-3 w-3 text-white/40 group-hover:text-primary transition-colors duration-300" />
                </span>
                <span className="hidden xl:inline">+91 99599 33363</span>
              </a>
              <div className="w-px h-5 bg-white/[0.06]" />
              <a href="#contact"><Button size="sm" className="group/btn" data-testid="button-get-started">Get Started <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" /></Button></a>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div className="lg:hidden py-4 border-t border-border/20" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground hover:text-foreground text-sm font-medium py-3 px-2" onClick={() => setMobileMenuOpen(false)} data-testid={`link-mobile-${item.toLowerCase()}`}>{item}</a>
                  ))}
                  <div className="pt-3 border-t border-border/20 mt-2">
                    <a href="#contact"><Button className="w-full" data-testid="button-mobile-get-started">Get Started</Button></a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImage} alt="" className="w-full h-[120%] object-cover" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
        </div>

        <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-44 md:pb-32 w-full" style={{ opacity: heroOpacity }}>
          <motion.div className="max-w-4xl" initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="inline-flex items-center gap-3 bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-full px-5 py-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[13px] text-white/60 font-medium tracking-wide">Trusted by 200+ enterprises across 8 industries</span>
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[1.05] tracking-tight mb-8" data-testid="text-hero-title">
              <span className="text-gradient-white">Technology that</span>
              <br />
              <span className="text-gradient-white">delivers </span>
              <span className="text-gradient-gold">outcomes.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed mb-12 font-light" data-testid="text-hero-description">
              iOne Techlabs engineers software, cloud, IoT, and AI solutions
              for enterprises that need results — not reports. From energy grids to
              financial platforms, we build what matters.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-20">
              <a href="#contact">
                <Button size="lg" className="glow-green" data-testid="button-hero-started">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#industries">
                <Button size="lg" variant="outline" className="backdrop-blur-sm border-white/15 text-white/80" data-testid="button-hero-cases">
                  <Play className="mr-2 h-3.5 w-3.5" /> View Case Studies
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="flex flex-wrap gap-x-12 gap-y-6 border-t border-white/[0.06] pt-8">
                {[
                  { v: <AnimatedCounter end={500} suffix="+" />, l: "Projects Delivered" },
                  { v: <AnimatedCounter end={8} />, l: "Industry Verticals" },
                  { v: "99.9%", l: "Uptime Guarantee" },
                  { v: <><AnimatedCounter end={10} />{"+"}</>, l: "Years in Operation" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{s.v}</div>
                    <div className="text-[11px] text-white/30 mt-1.5 uppercase tracking-[0.15em] font-medium">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ TRUST BAR ══════════════════ */}
      <section className="py-12 md:py-16 border-y border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 text-muted-foreground/30">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground/50 whitespace-nowrap">Cloud Partners</span>
              <span className="text-white/10">|</span>
              <div className="flex items-center gap-8">
                <SiAmazonwebservices className="h-7 w-auto text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors" />
                <span className="text-sm font-semibold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors tracking-wide">Azure</span>
                <SiGooglecloud className="h-5 w-auto text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {[
                { icon: Award, text: "ISO 27001 Certified" },
                { icon: Shield, text: "SOC 2 Compliant" },
                { icon: Lock, text: "HIPAA Ready" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">
                  <b.icon className="h-3.5 w-3.5" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PAIN POINTS ══════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 max-w-3xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">The Problem</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight" data-testid="text-challenges-title">
              Most digital transformations fail.
              <span className="text-muted-foreground"> We exist to change that.</span>
            </motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-px bg-border/20 rounded-md overflow-hidden" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {[
              { num: "70%", sub: "Failure Rate", label: "of enterprise digital transformations fail due to poor vendor selection, scope creep, and misaligned incentives.", icon: Target },
              { num: "$1.3T", sub: "Wasted Annually", label: "spent globally on IT projects that don't deliver measurable business outcomes. Most enterprises never see ROI.", icon: TrendingUp },
              { num: "18mo", sub: "Avg Time-to-Value", label: "to see first results from traditional IT engagements. We deliver working solutions in 90 days.", icon: Clock },
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card p-8 md:p-10 hover-elevate cursor-default" data-testid={`card-challenge-${i}`}>
                <p.icon className="h-6 w-6 text-primary/30 mb-8" />
                <div className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-1">{p.num}</div>
                <div className="text-[11px] text-primary uppercase tracking-[0.15em] font-semibold mb-4">{p.sub}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Capabilities</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight max-w-2xl" data-testid="text-services-title">
                Full-spectrum technology services
              </h2>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed lg:text-right">
                From architecture through deployment. Every engagement is backed by senior engineers with domain expertise in your industry.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 space-y-1">
              {services.map((s, i) => {
                const Icon = s.icon;
                const active = activeService === i;
                return (
                  <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                    onClick={() => setActiveService(i)} role="button" tabIndex={0}
                    className={`w-full text-left rounded-md transition-all cursor-pointer flex items-center gap-4 group relative p-4 ${active ? "bg-primary/[0.07] border border-primary/15" : "border border-transparent hover-elevate"}`}
                    data-testid={`button-service-${i}`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 ${active ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm transition-colors duration-300 truncate ${active ? "text-foreground" : "text-muted-foreground"}`} data-testid={`text-service-title-${i}`}>{s.title}</h3>
                      <AnimatePresence>
                        {active && (
                          <motion.p className="text-xs text-muted-foreground mt-1.5 leading-relaxed" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>{s.desc}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${active ? "text-primary rotate-90" : "text-muted-foreground/20"}`} />
                  </motion.div>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div key={activeService} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }} className="sticky top-28">
                  <div className="relative rounded-md overflow-hidden" data-testid={`card-service-detail-${activeService}`}>
                    <img src={services[activeService].image} alt={services[activeService].title} className="w-full aspect-[16/10] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    <div className="absolute top-5 left-5 right-5">
                      <div className="flex flex-wrap gap-2">
                        {services[activeService].features.map((f, j) => (
                          <motion.span key={f} className="text-[11px] font-medium text-white/80 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.06]"
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.05 + 0.1 }}>{f}</motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{services[activeService].title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed max-w-lg mb-4">{services[activeService].desc}</p>
                      <a href="#contact" className="inline-flex items-center gap-2 text-primary text-sm font-semibold" data-testid={`link-service-learn-${activeService}`}>
                        Discuss this capability <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ INDUSTRIES / USE CASES ══════════════════ */}
      <section id="industries" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Industry Expertise</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight max-w-3xl" data-testid="text-use-cases-title">
                Proven results across <span className="text-gradient-gold">8 industries</span>
              </h2>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed lg:text-right">
                Deep domain expertise means we understand your industry's unique challenges, compliance requirements, and opportunities.
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="mb-12 flex flex-wrap gap-2" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <Button
              variant={activeIndustry === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveIndustry("all")}
              data-testid="button-industry-all"
            >All Industries</Button>
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Button
                  key={ind.id}
                  variant={activeIndustry === ind.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveIndustry(ind.id)}
                  data-testid={`button-industry-${ind.id}`}
                ><Icon className="mr-1.5 h-3.5 w-3.5" />{ind.label}</Button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeIndustry} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-16">
              {filteredUseCases.map((uc, i) => {
                const isReversed = i % 2 !== 0;
                return (
                  <div key={uc.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`} data-testid={`card-usecase-${uc.id}`}>
                    <div className={isReversed ? "lg:order-2" : ""}>
                      <div className="relative rounded-md overflow-hidden">
                        <img src={uc.image} alt={uc.title} className="w-full aspect-[16/10] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                          <div className="flex flex-wrap gap-2">
                            {uc.metrics.map((m, mi) => (
                              <div key={mi} className="bg-black/50 backdrop-blur-md rounded-md px-3.5 py-2.5 border border-white/[0.08]">
                                <div className="text-lg font-bold text-accent leading-none">{m.v}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{m.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`space-y-5 ${isReversed ? "lg:order-1" : ""}`}>
                      <div>
                        <span className="text-[11px] text-accent uppercase tracking-[0.2em] font-semibold">{uc.title}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-2">{uc.headline}</h3>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gradient-gold">{uc.stat}</span>
                        <span className="text-muted-foreground text-sm">{uc.statLabel}</span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">{uc.desc}</p>

                      <ul className="space-y-2.5">
                        {uc.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm text-foreground/70">
                            <CheckCircle2 className="h-4 w-4 text-primary/50 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a href="#contact" className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold pt-1" data-testid={`link-usecase-${uc.id}`}>
                        Read full case study <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section id="process" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 max-w-3xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Methodology</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-process-title">
              From discovery to <span className="text-gradient-green">production</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-5 text-sm leading-relaxed max-w-2xl mx-auto">
              A battle-tested methodology that de-risks adoption and ensures every project delivers measurable results. Low barriers to entry — and exit.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/20 rounded-md overflow-hidden" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {layers.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="bg-card p-6 md:p-8 hover-elevate cursor-default" data-testid={`card-process-${i}`}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-bold text-primary/15 tracking-tight">{l.num}</span>
                    <div className="w-9 h-9 rounded-md bg-primary/[0.06] flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary/60" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">{l.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Client Voices</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              What our clients say
            </motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-px bg-border/20 rounded-md overflow-hidden" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card p-6 md:p-8 flex flex-col hover-elevate cursor-default" data-testid={`card-testimonial-${i}`}>
                <Quote className="h-6 w-6 text-accent/20 mb-6" />
                <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-8">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-border/20 pt-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <div className="relative rounded-md overflow-hidden">
                <img src={teamWorkImage} alt="iOne Techlabs Engineering Team" className="w-full aspect-[4/3] object-cover" data-testid="img-team" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="grid grid-cols-4 gap-2">
                    {[{ v: "10+", l: "Years" }, { v: "150+", l: "Engineers" }, { v: "8", l: "Verticals" }, { v: "200+", l: "Clients" }].map((s) => (
                      <div key={s.l} className="bg-black/50 backdrop-blur-md rounded-md px-3 py-2.5 border border-white/[0.06] text-center">
                        <div className="text-lg font-bold text-white leading-none">{s.v}</div>
                        <div className="text-[9px] text-white/40 uppercase tracking-wider mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 order-1 lg:order-2">
              <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">About iOne Techlabs</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-about-title">
                Engineering excellence, <span className="text-gradient-green">delivered.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We're a technology company of 150+ engineers headquartered in Hyderabad, India — specializing
                in enterprise software, cloud infrastructure, IoT systems, and AI solutions. Our clients span
                energy, finance, healthcare, manufacturing, retail, telecom, and logistics — India's most demanding sectors.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Award, text: "ISO 27001 certified security" },
                  { icon: Clock, text: "2-week agile sprint cycles" },
                  { icon: Headphones, text: "24/7 monitoring & support" },
                  { icon: Globe, text: "Multi-cloud (AWS, Azure, GCP)" },
                  { icon: Users, text: "Dedicated project managers" },
                  { icon: Shield, text: "SOC 2 & HIPAA compliant" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-primary/50 flex-shrink-0" />
                    <span className="text-foreground/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <a href="#contact"><Button variant="outline" data-testid="button-about-contact">Talk to Our Team <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CLIENTS ══════════════════ */}
      <section className="py-16 md:py-20 border-y border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-[11px] text-muted-foreground/40 font-medium uppercase tracking-[0.2em]">Trusted by India's leading enterprises</span>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-border/10 rounded-md overflow-hidden" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {clients.map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card flex items-center justify-center p-5 md:p-6 min-h-[70px] hover-elevate cursor-default" data-testid={`card-client-${i}`}>
                <span className="text-[13px] font-semibold text-muted-foreground/40 text-center leading-tight">{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-[150px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-8">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="text-cta-title">
              <span className="text-gradient-white">Ready to build</span>{" "}
              <span className="text-gradient-green">what matters?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              No sales pitch. No slide decks. Just a 30-minute conversation with a
              senior engineer who understands your industry.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2">
              <a href="#contact"><Button size="lg" className="glow-green" data-testid="button-cta-contact">Schedule a Call <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              <a href="tel:+919959933363"><Button size="lg" variant="outline" className="border-white/10" data-testid="button-cta-phone"><Phone className="mr-2 h-4 w-4" />+91 99599 33363</Button></a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div className="lg:col-span-2" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Contact</p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4" data-testid="text-contact-title">
                  Let's talk.
                </h2>
                <p className="text-muted-foreground mb-10">
                  We respond within 24 hours. Tell us about your project and we'll
                  match you with the right engineering team.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5 mb-10">
                {[
                  { icon: Mail, label: "hello@ionetechlabs.com", href: "mailto:hello@ionetechlabs.com" },
                  { icon: Phone, label: "+91 99599 33363", href: "tel:+919959933363" },
                  { icon: MapPin, label: "2nd Floor, Myhome Tycoon, Kundhanbagh, Begumpet, Hyderabad-500016" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-primary/60" />
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">{item.label}</a>
                    ) : (
                      <span className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.label}</span>
                    )}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="text-[11px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium mb-3">Stay updated</p>
                <form className="flex gap-2" onSubmit={handleNewsletterSubmit} data-testid="form-newsletter">
                  <Input type="email" placeholder="Your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} disabled={newsletterMutation.isPending} className="flex-1" data-testid="input-newsletter-email" />
                  <Button type="submit" size="sm" disabled={newsletterMutation.isPending} data-testid="button-subscribe">
                    {newsletterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                  </Button>
                </form>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
              <Card className="p-6 md:p-8 border-border/20" data-testid="card-contact-form">
                <form className="space-y-5" onSubmit={handleContactSubmit} data-testid="form-contact">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input placeholder="John Doe" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} disabled={contactMutation.isPending} data-testid="input-name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Work Email *</label>
                      <Input type="email" placeholder="john@company.com" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} disabled={contactMutation.isPending} data-testid="input-email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <Input placeholder="Your Company" value={contactForm.company} onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })} disabled={contactMutation.isPending} data-testid="input-company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tell us about your project *</label>
                    <Textarea placeholder="What are you looking to build? What's the timeline? Any specific technology requirements?" rows={5} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} disabled={contactMutation.isPending} data-testid="input-message" />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={contactMutation.isPending} data-testid="button-submit-contact">
                    {contactMutation.isPending ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</>) : (<>Send Message <ArrowRight className="ml-2 h-5 w-5" /></>)}
                  </Button>
                  <p className="text-[11px] text-muted-foreground/40 text-center">We'll respond within 24 hours. No spam, ever.</p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="border-t border-border/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-2">
              <img src={logo} alt="iOne Techlabs" className="h-9 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-sm text-muted-foreground/50 mb-5 max-w-xs leading-relaxed">
                Enterprise technology solutions for India's most ambitious companies. Software, Cloud, IoT & AI.
              </p>
              <div className="flex gap-2">
                {[{ icon: Linkedin, id: "linkedin" }, { icon: Twitter, id: "twitter" }, { icon: SiGithub, id: "github" }].map((s) => (
                  <a key={s.id} href="#" className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-muted-foreground/30 hover:text-foreground hover:border-primary/20 transition-all duration-300" data-testid={`link-${s.id}`}>
                    <s.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: [{ name: "Custom Software", href: "#services" }, { name: "Cloud & Infrastructure", href: "#services" }, { name: "IoT & Smart Grid", href: "#services" }, { name: "AI & Data Intelligence", href: "#services" }, { name: "Mobile Engineering", href: "#services" }] },
              { title: "Industries", links: [{ name: "Energy & Utilities", href: "#industries" }, { name: "Financial Services", href: "#industries" }, { name: "Healthcare", href: "#industries" }, { name: "Manufacturing", href: "#industries" }, { name: "View All (8)", href: "#industries" }] },
              { title: "Company", links: [{ name: "About Us", href: "#about" }, { name: "Case Studies", href: "#industries" }, { name: "Contact", href: "#contact" }, { name: "Privacy Policy", href: "#" }, { name: "Terms of Service", href: "#" }] },
            ].map((sec) => (
              <div key={sec.title}>
                <h4 className="font-semibold text-foreground/60 mb-4 text-[11px] uppercase tracking-[0.15em]">{sec.title}</h4>
                <ul className="space-y-2.5">
                  {sec.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-muted-foreground/40 hover:text-foreground transition-colors duration-300 text-sm">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-muted-foreground/30" data-testid="text-copyright">&copy; {new Date().getFullYear()} iOne Techlabs Pvt. Ltd. All rights reserved.</p>
            <p className="text-[11px] text-muted-foreground/20">Hyderabad, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  BrainCircuit, BarChart3, Zap, Shield, Globe, Layers, Server,
  Play, Building2, Factory, ShoppingCart, Radio, Truck, Award,
  Target, TrendingUp, Lock, Quote, CheckCircle2, Star,
  Clock, ChevronRight, Database, Users, Briefcase,
  GitBranch, Terminal, Gauge, FileCheck,
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

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

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

  /* ══════════════════ PAGE DATA ══════════════════ */

  const services = [
    {
      icon: Code2, title: "Custom Software Development",
      desc: "Enterprise-grade web platforms, microservices, REST & GraphQL APIs, and legacy modernisation — delivered with production CI/CD pipelines and rigorous architectural review by senior engineers.",
      features: [
        "Enterprise Web Platforms & Portals",
        "Microservices & Event-Driven APIs",
        "Legacy System Modernization",
        "CI/CD, DevOps & Automated Testing",
        "SaaS Product Engineering",
        "Third-Party & ERP Integration",
      ],
    },
    {
      icon: Cloud, title: "Cloud & DevOps",
      desc: "Security-first cloud architecture across AWS, Azure, and GCP. We design, migrate, and manage infrastructure that scales — with cost optimisation, compliance, and reliability built in from day one.",
      features: [
        "Cloud Migration & Lift-and-Shift",
        "Infrastructure as Code (Terraform / Pulumi)",
        "Multi-Cloud & Hybrid Cloud Strategy",
        "FinOps & Cloud Cost Optimization",
        "Kubernetes & Container Orchestration",
        "Site Reliability Engineering (SRE)",
      ],
    },
    {
      icon: Cpu, title: "IoT & Edge Computing",
      desc: "End-to-end connected systems with real-time SCADA integration, edge computing, predictive analytics, and advanced metering infrastructure for energy utilities, industrial plants, and smart buildings.",
      features: [
        "SCADA System Integration & Upgrades",
        "Edge Computing Gateway Platforms",
        "Advanced Metering Infrastructure (AMI)",
        "IoT Device Management at Scale",
        "Predictive Maintenance Platforms",
        "Digital Twin Engineering",
      ],
    },
    {
      icon: BrainCircuit, title: "AI & Machine Learning",
      desc: "Production-ready ML pipelines, predictive models, NLP systems, and computer vision solutions that drive measurable business outcomes — not just research demos. Full MLOps lifecycle included.",
      features: [
        "ML Model Development & MLOps",
        "Predictive Analytics & Forecasting",
        "NLP, LLM Integration & Chatbots",
        "Computer Vision & Image Recognition",
        "Recommendation & Personalization Engines",
        "Real-time AI Inference Infrastructure",
      ],
    },
    {
      icon: Smartphone, title: "Enterprise Mobility",
      desc: "Cross-platform mobile experiences with native performance. iOS, Android, Flutter, and React Native — from concept through app store launch, with offline-first architecture and enterprise-grade security.",
      features: [
        "iOS & Android Native Application Development",
        "Cross-Platform Apps (Flutter / React Native)",
        "Offline-First & Sync Architecture",
        "Enterprise MDM & Security Integration",
        "App Store Optimization & Compliance",
        "Mobile API Design & Backend Integration",
      ],
    },
    {
      icon: BarChart3, title: "Data Engineering & Analytics",
      desc: "Unified data platforms, real-time pipelines, and BI dashboards that convert raw data into boardroom-ready intelligence. From raw ingestion to executive dashboards with full data governance.",
      features: [
        "Real-time Data Pipelines (Kafka / Spark)",
        "Data Warehouse & Lakehouse Architecture",
        "BI Dashboards (Power BI, Looker, Metabase)",
        "ETL / ELT Pipeline Development",
        "Data Quality, Governance & Cataloguing",
        "Self-Serve Analytics Platforms",
      ],
    },
  ];

  const industries = [
    {
      icon: Zap, label: "Energy & Utilities",
      desc: "Smart grid modernization, SCADA integration, IoT-powered demand forecasting, outage management, and renewable energy management platforms for power utilities and distribution companies.",
      useCases: [
        "Grid Monitoring & SCADA Control",
        "Advanced Metering Infrastructure",
        "Predictive Fault Detection & Outage Prevention",
        "Renewable Energy Integration & Optimization",
      ],
      stat: "60%", statLabel: "Outage Reduction",
      highlight: "Trusted by 3 national power utilities",
    },
    {
      icon: TrendingUp, label: "Financial Services",
      desc: "Cloud-native trading platforms, real-time compliance engines, AI fraud detection, digital lending, and core banking modernization for banks, NBFCs, wealth managers, and fintech startups.",
      useCases: [
        "Core Banking Modernization (CBS)",
        "Real-time Fraud Detection & AML",
        "Regulatory Compliance (RBI / SEBI / IRDAI)",
        "Digital Lending & Credit Underwriting",
      ],
      stat: "99.99%", statLabel: "Uptime SLA",
      highlight: "PCI-DSS compliant delivery",
    },
    {
      icon: Shield, label: "Healthcare",
      desc: "HIPAA-compliant patient management, AI-powered diagnostics, telemedicine platforms, clinical decision support, and hospital information systems for hospital networks and healthcare providers.",
      useCases: [
        "Hospital Information & HMIS Systems",
        "AI-Powered Diagnostic Imaging Support",
        "Telemedicine & Remote Patient Monitoring",
        "EMR / EHR Integration & Interoperability",
      ],
      stat: "40%", statLabel: "Admin Cost Cut",
      highlight: "HL7 FHIR compliant",
    },
    {
      icon: Factory, label: "Manufacturing",
      desc: "Digital twin technology, IoT-based predictive maintenance, automated quality control, OEE optimization, and smart production planning for large-scale manufacturing and process industries.",
      useCases: [
        "Digital Twin Implementation",
        "Predictive Maintenance & Condition Monitoring",
        "Computer Vision Quality Control",
        "OEE Tracking & Production Optimization",
      ],
      stat: "45%", statLabel: "Downtime Reduced",
      highlight: "Industry 4.0 certified approach",
    },
    {
      icon: Truck, label: "Logistics & Supply Chain",
      desc: "Real-time shipment tracking, AI-powered route optimization, warehouse management systems, last-mile delivery platforms, and predictive demand planning for 3PL and logistics companies.",
      useCases: [
        "End-to-End Shipment Visibility",
        "AI Route & Fleet Optimization",
        "Warehouse Management System (WMS)",
        "Demand Planning & Inventory Optimization",
      ],
      stat: "38%", statLabel: "Logistics Cost Saved",
      highlight: "GST-ready, TMS integrated",
    },
    {
      icon: ShoppingCart, label: "Retail & E-Commerce",
      desc: "AI-driven demand forecasting, dynamic pricing engines, omnichannel customer platforms, loyalty programs, and hyper-personalized experiences for modern retail and direct-to-consumer brands.",
      useCases: [
        "Omnichannel Commerce Platforms",
        "AI Demand Forecasting & Inventory Planning",
        "Dynamic Pricing & Promotion Engine",
        "Customer Personalization & Loyalty",
      ],
      stat: "32%", statLabel: "Revenue Growth",
      highlight: "Works with D2C & marketplace brands",
    },
    {
      icon: Building2, label: "Government & Smart Cities",
      desc: "Urban IoT command centers, intelligent traffic management, environmental monitoring networks, citizen engagement portals, and e-Governance platforms for municipal corporations and state agencies.",
      useCases: [
        "Integrated Smart City Command Center",
        "Adaptive Traffic Signal Optimization",
        "Environmental & Air Quality Monitoring",
        "Citizen Self-Service & Grievance Portals",
      ],
      stat: "55%", statLabel: "Faster Response Time",
      highlight: "MeitY & NIC compliant",
    },
    {
      icon: Radio, label: "Telecommunications",
      desc: "AI-powered network intelligence, zero-touch provisioning automation, predictive capacity planning, customer experience platforms, and churn prediction systems for telecom operators.",
      useCases: [
        "Network Intelligence & Fault Prediction",
        "Zero-Touch Provisioning Automation",
        "Predictive Capacity Planning",
        "Customer Churn Prediction & Retention",
      ],
      stat: "70%", statLabel: "Faster Provisioning",
      highlight: "OSS/BSS integration expertise",
    },
  ];

  const steps = [
    {
      num: "01", icon: Target, title: "Discovery & Strategy",
      desc: "We align your business goals to precise technical requirements through in-depth stakeholder workshops, system audits, and competitive landscape analysis. The output is a concrete, costed roadmap — not a vague plan document.",
      deliverables: [
        "Technical Requirements Document (TRD)",
        "System Architecture Recommendation",
        "Detailed Project Roadmap & Milestones",
        "Risk Assessment & Mitigation Plan",
        "Effort Estimate & Resource Plan",
      ],
    },
    {
      num: "02", icon: Layers, title: "Design & Architecture",
      desc: "Every architectural decision is peer-reviewed and stress-tested for scale, security, and maintainability before a single line of production code is written. Paired with UX designs validated through user testing.",
      deliverables: [
        "System Architecture Diagrams (C4 Model)",
        "High-Fidelity UI/UX Prototypes",
        "API Contract Design & Data Models",
        "Infrastructure & Security Blueprint",
        "Technology Stack Justification",
      ],
    },
    {
      num: "03", icon: Code2, title: "Agile Development",
      desc: "Two-week sprints with working software demonstrated at the end of every cycle. Complete transparency through live dashboards. You see real, tested progress — not status-update theatre.",
      deliverables: [
        "Sprint Demos (Working Software, Every 2 Weeks)",
        "Code Reviews & Static Analysis Reports",
        "Real-time Progress Dashboard Access",
        "Automated Test Suite (Unit + Integration)",
        "QA Sign-Off Before Each Release",
      ],
    },
    {
      num: "04", icon: Globe, title: "Deploy, Monitor & Scale",
      desc: "Zero-downtime production deployment with full observability from day one. 24/7 monitoring, SLA-backed uptime commitments, and a dedicated support team that grows your system alongside your business.",
      deliverables: [
        "Zero-Downtime Deployment Pipeline",
        "24/7 Monitoring, Alerting & Runbooks",
        "Performance Optimization & Load Testing",
        "Dedicated Tier-1 Support Team",
        "Post-Launch SLA Report (Monthly)",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar", role: "CTO", company: "National Power Grid Corp",
      quote: "iOne Techlabs transformed our grid operations. Their IoT SCADA platform reduced outage response time from hours to under 8 minutes. The team's deep domain expertise in energy made all the difference — they spoke our language from day one.",
      avatar: "RK", stars: 5, project: "Smart Grid Modernization", outcome: "60% reduction in outage duration",
    },
    {
      name: "Priya Sharma", role: "VP Engineering", company: "FinServ Holdings",
      quote: "We evaluated five vendors. iOne was the only one that truly understood both the technical complexity and the regulatory requirements of our trading platform. Delivered on time, under budget, and passed RBI audit on the first attempt.",
      avatar: "PS", stars: 5, project: "Core Banking & Trading Platform", outcome: "99.99% uptime, passed RBI audit",
    },
    {
      name: "Dr. Anand Mehta", role: "Director of IT", company: "Metro Health Network",
      quote: "The patient management and HMIS system they built has fundamentally changed how our 12 hospitals operate. We achieved a 40% reduction in administrative costs within 6 months of go-live — while simultaneously improving clinical care quality.",
      avatar: "AM", stars: 5, project: "Hospital Management System", outcome: "40% admin cost reduction across 12 hospitals",
    },
  ];

  const caseStudies = [
    {
      tag: "Energy & IoT", title: "Smart Grid Command Center for a National Power Utility",
      desc: "Designed and deployed a real-time SCADA and IoT command center monitoring 4,200+ grid nodes across three states. The platform ingests 2M+ sensor readings daily, surfaces fault predictions 45 minutes before failure, and integrates with legacy SCADA systems via OPC-UA.",
      metrics: [
        { val: "60%", label: "Outage Duration Reduced" },
        { val: "45 min", label: "Early Fault Warning" },
        { val: "₹18 Cr", label: "Annual Savings" },
      ],
      stack: ["AWS IoT Core", "Kafka", "TimescaleDB", "React", "Python"],
      color: "border-amber-200 bg-amber-50/40",
      iconColor: "text-amber-600",
      Icon: Zap,
    },
    {
      tag: "FinTech & Cloud", title: "Real-Time Fraud Detection Platform for an NBFC",
      desc: "Built an ML-powered fraud detection engine processing 80,000 transactions/day with sub-100ms decision latency. The model stack uses gradient boosted trees + LSTM networks trained on 5 years of transaction data, with full explainability for RBI compliance.",
      metrics: [
        { val: "94%", label: "Fraud Detection Accuracy" },
        { val: "<100ms", label: "Decision Latency" },
        { val: "₹12 Cr", label: "Prevented Fraud Loss" },
      ],
      stack: ["GCP", "BigQuery", "Python/XGBoost", "FastAPI", "React"],
      color: "border-green-200 bg-green-50/40",
      iconColor: "text-green-700",
      Icon: TrendingUp,
    },
    {
      tag: "Healthcare & AI", title: "AI-Powered HMIS Across 12-Hospital Network",
      desc: "Replaced a fragmented, paper-heavy system across 12 hospitals with a unified HMIS platform covering OPD/IPD workflows, EMR, pharmacy, lab, and billing. AI modules flag sepsis risk, bed occupancy, and supply shortages in real time.",
      metrics: [
        { val: "40%", label: "Admin Cost Reduction" },
        { val: "12 Hospitals", label: "Network Unified" },
        { val: "6 Months", label: "Go-Live Timeline" },
      ],
      stack: ["Azure", "HL7 FHIR", "Node.js", "React Native", "PostgreSQL"],
      color: "border-blue-200 bg-blue-50/40",
      iconColor: "text-blue-700",
      Icon: Shield,
    },
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Flutter", "React Native", "Swift", "Kotlin"] },
    { category: "Backend", items: ["Node.js", "Python", "Java / Spring", "Go", "FastAPI", ".NET Core", "GraphQL"] },
    { category: "Cloud & Infra", items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Docker", "ArgoCD"] },
    { category: "Data & AI", items: ["Kafka", "Spark", "Airflow", "PyTorch", "scikit-learn", "BigQuery", "dbt"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "TimescaleDB", "Elasticsearch", "Cassandra"] },
    { category: "IoT & Edge", items: ["MQTT", "OPC-UA", "SCADA", "AWS IoT", "Modbus", "EdgeX Foundry"] },
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
          <div className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-amber-400 animate-float opacity-50" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-green-600 animate-float opacity-40" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-amber-400/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 md:pt-44 md:pb-28 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2" data-testid="badge-trust">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping-amber absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="text-[13px] text-amber-800 font-semibold">Trusted by 200+ enterprises across India</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-gray-900 mb-6" data-testid="text-hero-title">
                Technology that<br />delivers{" "}
                <span className="text-gradient-hero">outcomes.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl" data-testid="text-hero-description">
                iOne Techlabs engineers software, cloud, IoT, and AI solutions for enterprises that need results — not reports. From energy grids to financial platforms, we build what matters.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                <a href="#contact">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md btn-shimmer" data-testid="button-hero-started">
                    Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#case-studies">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400" data-testid="button-hero-cases">
                    <Play className="mr-2 h-3.5 w-3.5 fill-current text-amber-500" /> View Case Studies
                  </Button>
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-gray-100">
                {[
                  { v: <AnimatedCounter end={200} suffix="+" />, label: "Enterprises Served" },
                  { v: <AnimatedCounter end={8} />, label: "Industries" },
                  { v: <AnimatedCounter end={50} suffix="+" />, label: "Senior Engineers" },
                  { v: <AnimatedCounter end={10} suffix="+" />, label: "Years of Delivery" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{s.v}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-[0.14em] font-medium">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="hidden lg:grid grid-cols-2 gap-4" initial="initial" animate="animate" variants={stagger}>
              {[
                { icon: Code2, title: "Custom Software", sub: "500+ applications delivered", color: "bg-amber-50 border-amber-100" },
                { icon: Cloud, title: "Cloud & DevOps", sub: "AWS · Azure · GCP certified", color: "bg-green-50 border-green-100" },
                { icon: BrainCircuit, title: "AI & Machine Learning", sub: "Production AI in 8 verticals", color: "bg-green-50 border-green-100" },
                { icon: Cpu, title: "IoT & Edge Computing", sub: "10,000+ connected devices", color: "bg-amber-50 border-amber-100" },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className={`${f.color} border rounded-2xl p-6 flex flex-col gap-3 card-hover`} data-testid={`card-hero-${i}`}>
                  <f.icon className="h-6 w-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{f.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{f.sub}</div>
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
                <SiAmazonwebservices className="h-7 w-auto text-gray-400 hover:text-gray-700 transition-colors" title="Amazon Web Services" />
                <span className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors tracking-widest">AZURE</span>
                <SiGooglecloud className="h-5 w-auto text-gray-400 hover:text-gray-700 transition-colors" title="Google Cloud Platform" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: Award, text: "ISO 27001 Certified" },
                { icon: Shield, text: "SOC 2 Type II Compliant" },
                { icon: Lock, text: "HIPAA Ready" },
                { icon: FileCheck, text: "VAPT Audited" },
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
              Full-spectrum technology services — from architecture and design through development, deployment, and long-term support — backed by senior engineers with deep domain expertise.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover group flex flex-col"
                data-testid={`card-service-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                  <s.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <ul className="space-y-2 pt-4 border-t border-gray-50">
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
            <motion.p variants={fadeUp} className="text-green-700 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Vertical Expertise</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-industries-title">Industries We Serve</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Eight industry verticals where we have years of accumulated domain knowledge, certified engineers, and production-grade reference architectures.
            </motion.p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {industries.map((ind, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover flex flex-col"
                data-testid={`card-industry-${i}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
                    <ind.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-500">{ind.stat}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{ind.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{ind.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{ind.desc}</p>
                <div className="space-y-1.5 mb-3">
                  {ind.useCases.map((uc, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <ChevronRight className="h-3 w-3 text-amber-500 flex-shrink-0" />
                      {uc}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1 font-semibold text-center mt-auto">
                  {ind.highlight}
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
              { v: <AnimatedCounter end={500} suffix="+" />, label: "Projects Delivered", sub: "On-time & within budget" },
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

      {/* ══════════════════ CASE STUDIES ══════════════════ */}
      <section id="case-studies" className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">Client Success Stories</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-case-studies-title">Real Projects. Real Results.</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Here's a snapshot of what we've delivered for enterprises across three of our core verticals.
            </motion.p>
          </motion.div>

          <motion.div className="grid lg:grid-cols-3 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {caseStudies.map((cs, i) => (
              <motion.div key={i} variants={fadeUp}
                className={`rounded-2xl border p-7 flex flex-col card-hover ${cs.color}`}
                data-testid={`card-case-${i}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    <cs.Icon className={`h-4.5 w-4.5 ${cs.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{cs.tag}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug">{cs.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{cs.desc}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {cs.metrics.map((m, j) => (
                    <div key={j} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-xs">
                      <div className="text-sm font-bold text-gray-900">{m.val}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Stack Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.stack.map((t, j) => (
                      <span key={j} className="bg-white border border-gray-200 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
      <section className="py-16 md:py-20 section-alt border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-3">Technology</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight" data-testid="text-tech-title">Our Technology Stack</motion.h2>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {techStack.map((group, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm" data-testid={`tech-group-${i}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <span key={j} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md hover:border-amber-300 hover:text-gray-800 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section id="process" className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-amber-600 text-[11px] font-bold tracking-[0.24em] uppercase mb-4">How We Work</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5" data-testid="text-process-title">Our Proven Process</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Four disciplined phases that take your project from ambiguous requirement to production-grade, monitored software — with full visibility and zero surprises at every step.
            </motion.p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div key={i}
                className="grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 bg-white border border-gray-100 shadow-sm rounded-2xl p-8 card-hover"
                initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                data-testid={`step-${i}`}
              >
                <div className="flex md:flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-px h-8 bg-gradient-to-b from-amber-300 to-transparent mt-1" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 text-green-700" />
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                <div className="md:min-w-[240px]">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Key Deliverables</div>
                  <ul className="space-y-2">
                    {step.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
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
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-amber-300 mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mb-5">
                  <div className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">{t.project}</div>
                  <div className="text-xs text-amber-800 font-bold mt-0.5">↑ {t.outcome}</div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
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

          <motion.div className="mt-14 text-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-6">Trusted by India's Leading Companies</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {clients.map((c, i) => (
                <span key={i} className="text-sm font-semibold text-gray-400 border border-gray-200 bg-white rounded-lg px-5 py-2.5 hover:text-gray-700 hover:border-gray-300 transition-colors">
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
                Founded over a decade ago in Hyderabad, iOne Techlabs has grown from a boutique software studio into a full-spectrum enterprise technology partner. We've shipped 500+ solutions across 8 verticals for clients ranging from national power utilities to fast-scaling fintech platforms and government smart city initiatives.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5">
                Our team of 50+ senior engineers brings both technical depth and domain expertise — meaning we understand the language of energy grids, trading floors, hospital networks, and supply chains, not just code repositories. Every engagement is led by a senior architect from day one.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                What sets us apart is our relentless focus on outcomes over activity. Contracts are tied to business KPIs, not just delivery milestones — and we back every production deployment with SLA-guaranteed uptime and a dedicated support team.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="#contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white btn-shimmer" data-testid="button-about-contact">
                    Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Explore Services
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Projects Delivered", icon: Briefcase, color: "text-amber-500" },
                  { num: "99.9%", label: "SLA Uptime Guarantee", icon: Shield, color: "text-green-700" },
                  { num: "10+", label: "Years in Operation", icon: Clock, color: "text-amber-500" },
                  { num: "8", label: "Industry Verticals", icon: Globe, color: "text-green-700" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center card-hover" data-testid={`card-about-${i}`}>
                    <item.icon className={`h-5 w-5 ${item.color} mx-auto mb-3`} />
                    <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.num}</div>
                    <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  Why Enterprises Choose iOne Techlabs
                </h4>
                <div className="space-y-3">
                  {[
                    "Senior-only engineering teams — no juniors on client work",
                    "Outcome-based contracts tied to measurable business KPIs",
                    "Domain experts embedded in every engagement from day one",
                    "Full transparency: live dashboards, sprint demos, shared access",
                    "Post-launch SLA with 24/7 monitoring and dedicated support",
                    "ISO 27001 & SOC 2 compliant delivery process end-to-end",
                  ].map((v, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {v}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-700" />
                  Our Engagement Models
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Fixed-Scope", desc: "Clear deliverables, fixed price" },
                    { label: "Time & Material", desc: "Flexible teams, transparent billing" },
                    { label: "Dedicated Team", desc: "Embedded engineers, long-term" },
                  ].map((em, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-green-100">
                      <div className="text-xs font-bold text-green-800 mb-1">{em.label}</div>
                      <div className="text-[10px] text-gray-500 leading-tight">{em.desc}</div>
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
            <motion.p variants={fadeUp} className="text-amber-400 text-[11px] font-bold tracking-[0.24em] uppercase mb-6">Let's Build Together</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6" data-testid="text-cta-title">
              Ready to build what matters?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-green-200 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
              Join 200+ enterprises that chose iOne Techlabs to engineer their most critical systems. First consultation is always free.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-8">
              {["No long-term commitment required", "Senior engineer on first call — not a salesperson", "Response within 4 business hours"].map((v, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-green-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> {v}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a href="#contact">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold text-base px-8 shadow-lg btn-shimmer" data-testid="button-cta">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="tel:+919959933363">
                <Button size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50">
                  <Phone className="mr-2 h-4 w-4" /> Call +91 99599 33363
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
                Tell us about your challenge. A senior engineer will respond within 24 hours with a clear, honest assessment — and a concrete plan of action.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-5 mb-10">
                {[
                  { icon: Phone, label: "+91 99599 33363", sub: "Call us Mon–Sat, 9 AM – 7 PM IST", href: "tel:+919959933363" },
                  { icon: Mail, label: "hello@ionetechlabs.com", sub: "Email — we reply within 24 hours", href: "mailto:hello@ionetechlabs.com" },
                  { icon: MapPin, label: "2nd Floor, Myhome Tycoon", sub: "Kundhanbagh, Begumpet, Hyderabad – 500016, Telangana", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="flex items-start gap-4 group" data-testid={`link-contact-${i}`}>
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
                  {[
                    "We acknowledge your submission within 2 hours",
                    "A senior engineer — not a salesperson — reviews your brief",
                    "We schedule a discovery call within 24 business hours",
                    "You receive a written assessment and indicative scope within 48 hours",
                    "No commitment required for the first consultation",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-green-700">
                      <ChevronRight className="h-3 w-3 flex-shrink-0 mt-0.5" /> {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!contactForm.name || !contactForm.email || !contactForm.message) {
                    toast({ title: "Required Fields", description: "Please fill in your name, email, and message.", variant: "destructive" });
                    return;
                  }
                  contactMutation.mutate(contactForm);
                }}
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 space-y-5"
              >
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Send Us a Message</h3>
                  <p className="text-xs text-gray-400">All fields marked * are required.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Full Name *</label>
                    <Input value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="border-gray-200 focus:border-amber-400" data-testid="input-name" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Work Email *</label>
                    <Input type="email" value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className="border-gray-200 focus:border-amber-400" data-testid="input-email" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Company / Organisation</label>
                  <Input value={contactForm.company} onChange={(e) => setContactForm(f => ({ ...f, company: e.target.value }))} placeholder="Your company name" className="border-gray-200 focus:border-amber-400" data-testid="input-company" />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold mb-1.5 block">Tell Us About Your Project *</label>
                  <Textarea value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="What are you building? What problem needs solving? What's your timeline and team size?" rows={5} className="border-gray-200 focus:border-amber-400 resize-none" data-testid="input-message" />
                </div>
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold btn-shimmer" disabled={contactMutation.isPending} data-testid="button-contact-submit">
                  {contactMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
                <p className="text-[11px] text-gray-400 text-center">By submitting this form you agree to our Privacy Policy. We never share your data.</p>
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
                Enterprise technology solutions for India's most ambitious organisations. Custom Software, Cloud, IoT & AI — delivered with accountability and measurable outcomes.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }, i) => (
                  <a key={i} href="#" aria-label={label} className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/50 transition-all" data-testid={`link-social-${i}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: [
                  "Custom Software Development",
                  "Cloud & DevOps",
                  "IoT & Edge Computing",
                  "AI & Machine Learning",
                  "Enterprise Mobility",
                  "Data Engineering & Analytics",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Our Process", "Case Studies", "Technology Stack", "Careers", "Blog & Insights"],
              },
              {
                title: "Contact",
                links: ["+91 99599 33363", "hello@ionetechlabs.com", "Begumpet, Hyderabad 500016", "Mon–Sat  9 AM – 7 PM IST"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors leading-snug block">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Stay ahead with enterprise technology insights</p>
                <p className="text-xs text-gray-500">Monthly digest — no spam, one-click unsubscribe.</p>
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
            <p className="text-xs text-gray-600">© 2026 iOne Techlabs Pvt. Ltd. All rights reserved. Hyderabad, India.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((link, i) => (
                <a key={i} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

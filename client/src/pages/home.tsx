import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Loader2,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

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
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);
  
  return <span ref={ref}>{count}{suffix}</span>;
}

import logo from "@assets/image_1768908388633.png";
import heroImage from "@assets/stock_images/modern_technology_te_e0b8fff8.jpg";
import teamImage from "@assets/stock_images/modern_technology_te_12e76ceb.jpg";
import devImage from "@assets/stock_images/software_development_ab7e0fa9.jpg";
import cloudImage from "@assets/stock_images/cloud_computing_tech_d92c4a19.jpg";
import mobileImage from "@assets/stock_images/mobile_app_developme_1a27f1de.jpg";
import analyticsImage from "@assets/stock_images/data_analytics_dashb_f154ce7f.jpg";
import smartGridImage from "@assets/stock_images/modern_smart_grid_po_98ffde9c.jpg";
import teamWorkImage from "@assets/stock_images/business_team_profes_34bf9c20.jpg";
import cloudDataImage from "@assets/stock_images/cloud_computing_serv_87c9c082.jpg";
import iotDevicesImage from "@assets/stock_images/iot_internet_of_thin_b80df81d.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof contactForm) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message || "Thank you for your message. We'll get back to you within 24 hours.",
      });
      setContactForm({ name: "", email: "", company: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
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
      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Subscribed!",
        description: data.message || "Thanks for subscribing! You'll receive our latest updates.",
      });
      setNewsletterEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(contactForm);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(newsletterEmail);
  };

  const services = [
    { 
      title: "Software Development", 
      description: "Build robust, scalable enterprise applications with modern architectures that streamline your operations.",
      image: devImage
    },
    { 
      title: "Cloud Solutions", 
      description: "Migrate, optimize, and manage your cloud infrastructure with security-first architecture on AWS, Azure, and GCP.",
      image: cloudDataImage
    },
    { 
      title: "IoT & Smart Grid", 
      description: "Deploy intelligent connected systems with real-time monitoring, predictive analytics, and edge computing.",
      image: smartGridImage
    },
    { 
      title: "Mobile Applications", 
      description: "Cross-platform mobile experiences that engage users with native performance and beautiful interfaces.",
      image: mobileImage
    },
    { 
      title: "Data & AI", 
      description: "Turn data into decisions with advanced analytics, machine learning models, and AI-powered automation.",
      image: analyticsImage
    },
    { 
      title: "UI/UX Design", 
      description: "Human-centered design that drives engagement. Research-backed interfaces that users love to interact with.",
      image: teamWorkImage
    }
  ];

  const layers = [
    {
      number: "1",
      title: "Discovery & Strategy",
      description: "We deep-dive into your business goals, technical landscape, and user needs to define the right approach."
    },
    {
      number: "2",
      title: "Architecture & Design",
      description: "Our architects design scalable, secure solutions. Our designers craft intuitive, beautiful experiences."
    },
    {
      number: "3",
      title: "Agile Development",
      description: "Iterative sprints with continuous delivery. You see progress every two weeks, not after six months."
    },
    {
      number: "4",
      title: "Launch & Scale",
      description: "We deploy, monitor, and optimize. Post-launch support ensures your solution grows with your business."
    }
  ];

  const clients = [
    "Tata Power", "NTPC", "Adani Power", "Telangana State Power", 
    "BSES Rajdhani", "Torrent Power", "CESC Limited", "UPPCL"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - PenguinAI style: dark, minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <img src={logo} alt="iOne Techlabs" className="h-10 md:h-12 w-auto" data-testid="img-logo" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-services">Services</a>
              <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-process">Process</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-about">About</a>
              <a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-clients">Clients</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-contact">Contact</a>
            </div>

            <div className="hidden md:flex items-center">
              <Button data-testid="button-get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col gap-4">
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-services">Services</a>
                <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-process">Process</a>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-about">About</a>
                <a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-clients">Clients</a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-contact">Contact</a>
                <div className="pt-4">
                  <Button className="w-full" data-testid="button-mobile-get-started">Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - PenguinAI style: dark, bold, impactful */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Technology Innovation" 
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <motion.div 
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white tracking-tight" data-testid="text-hero-title">
              Evolving Your Business with{" "}
              <span className="text-accent">Intelligent Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed" data-testid="text-hero-description">
              From strategy to implementation, we deliver software, cloud, and IoT solutions 
              that drive real business outcomes.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact">
                <Button size="lg" data-testid="button-hero-started">
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - PenguinAI style: large bold numbers */}
      <section className="py-24 md:py-32 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-3 gap-16 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} data-testid="text-stat-projects">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-xs">
                Projects delivered across 6 industries with consistent on-time delivery
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} data-testid="text-stat-reduction">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
                40%
              </div>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-xs">
                Average cost reduction for clients through cloud optimization and automation
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} data-testid="text-stat-uptime">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
                99.9%
              </div>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-xs">
                Uptime guaranteed across all managed infrastructure and applications
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - PruTech style: clean service grid */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-4" data-testid="text-services-label">Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl" data-testid="text-services-title">
              Dependable technology solutions
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 rounded-md overflow-hidden border border-border/30"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.a 
                key={index} 
                variants={fadeInUp}
                href="#contact"
                className="bg-background p-8 md:p-10 flex flex-col gap-5 hover-elevate overflow-visible relative"
                data-testid={`card-service-${index}`}
              >
                <div className="relative h-40 rounded-md overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-foreground" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium" data-testid={`link-service-learn-${index}`}>
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process / Layers - PenguinAI style: numbered layers */}
      <section id="process" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 lg:gap-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-4" data-testid="text-process-label">Our Process</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6" data-testid="text-process-title">
                Changing uncertainty to dependability
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Our proven methodology ensures every project delivers measurable results. Built to de-risk adoption with low barriers to entry.
              </p>
              <a href="#contact">
                <Button size="lg" data-testid="button-process-start">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-0">
              {layers.map((layer, index) => (
                <div 
                  key={index} 
                  className="flex gap-6 py-8 border-b border-border/30 last:border-b-0"
                  data-testid={`card-process-${index}`}
                >
                  <div className="flex-shrink-0">
                    <span className="text-5xl md:text-6xl font-bold text-primary/30">{layer.number}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-foreground mb-2">{layer.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{layer.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section - PruTech style */}
      <section className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="text-accent font-semibold tracking-wider uppercase text-sm">Case Study</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight" data-testid="text-case-study-title">
                Intelligent Grid Management Platform
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-case-study-desc">
                A leading energy utility partnered with iOne Techlabs to modernize their grid infrastructure. 
                We delivered a comprehensive IoT-powered platform featuring real-time monitoring, predictive 
                maintenance, and AI-driven analytics — reducing outages by 60% and operational costs by 35%.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-accent" data-testid="text-case-stat-1">60%</div>
                  <div className="text-sm text-muted-foreground mt-1">Fewer Outages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent" data-testid="text-case-stat-2">35%</div>
                  <div className="text-sm text-muted-foreground mt-1">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent" data-testid="text-case-stat-3">99.9%</div>
                  <div className="text-sm text-muted-foreground mt-1">Uptime Achieved</div>
                </div>
              </div>
              <div className="pt-2">
                <a href="#contact">
                  <Button variant="outline" data-testid="button-case-study-contact">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative rounded-md overflow-hidden">
                <img src={smartGridImage} alt="Smart Grid Platform" className="w-full h-auto object-cover aspect-[4/3]" data-testid="img-case-study" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Simplified, bold */}
      <section id="about" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <div className="relative rounded-md overflow-hidden">
                <img src={teamWorkImage} alt="iOne Techlabs Team" className="w-full h-auto object-cover aspect-[4/3]" data-testid="img-team" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8 order-1 lg:order-2">
              <p className="text-primary font-semibold tracking-wider uppercase text-sm">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-about-title">
                Innovative strategies, tailored solutions, sustainable growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                iOne Techlabs is a global technology company committed to delivering secure, scalable, and innovative 
                solutions. We combine deep industry expertise with cutting-edge engineering to help businesses 
                navigate digital transformation with confidence.
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground mt-1">Years</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">150+</div>
                  <div className="text-sm text-muted-foreground mt-1">Engineers</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">6</div>
                  <div className="text-sm text-muted-foreground mt-1">Industries</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section - Clean, dark */}
      <section id="clients" className="py-20 md:py-24 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-4">Trusted By</p>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight" data-testid="text-clients-title">
              Leading Enterprises Across India
            </h3>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-md overflow-hidden border border-border/30"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {clients.map((client, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="flex items-center justify-center p-8 bg-background" data-testid={`card-client-${index}`}>
                  <span className="font-semibold text-muted-foreground text-lg">{client}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - PenguinAI style: bold, dark, simple */}
      <section className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight" data-testid="text-cta-title">
              Your Journey to Digital Leadership Starts Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how iOne Techlabs helps you build better technology — faster.
            </p>
            <div className="pt-4">
              <a href="#contact">
                <Button size="lg" data-testid="button-cta-contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div>
                <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-4">Connect With Us</p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4" data-testid="text-contact-title">
                  Let's Build Together
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have a project in mind? Our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Email</div>
                    <div className="text-muted-foreground text-sm">hello@ionetechlabs.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Phone</div>
                    <div className="text-muted-foreground text-sm">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Office</div>
                    <div className="text-muted-foreground text-sm">Hyderabad, India</div>
                  </div>
                </div>
              </div>

              <form className="flex gap-2" onSubmit={handleNewsletterSubmit} data-testid="form-newsletter">
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
              </form>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="p-6 md:p-8" data-testid="card-contact-form">
                <form className="space-y-5" onSubmit={handleContactSubmit} data-testid="form-contact">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input 
                        placeholder="John Doe" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
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
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
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
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
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
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
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

      {/* Footer - Minimal, dark */}
      <footer className="border-t border-border/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="iOne Techlabs" className="h-10 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-sm text-muted-foreground mb-4">
                Transforming businesses through innovative technology solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-linkedin">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-github">
                  <SiGithub className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Software Development</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Cloud Solutions</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">IoT & Smart Grid</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Data & AI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors">Clients</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} iOne Techlabs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

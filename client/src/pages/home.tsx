import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Code2, 
  Cloud, 
  Smartphone, 
  BarChart3, 
  Palette,
  ArrowRight,
  Star,
  Trophy,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Loader2,
  Shield,
  Award,
  Lock,
  Layers,
  Target,
  Cpu,
  TrendingUp,
  Workflow
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
import testimonial1 from "@assets/stock_images/professional_busines_e7abe378.jpg";
import testimonial2 from "@assets/stock_images/professional_busines_2b65e838.jpg";
import testimonial3 from "@assets/stock_images/professional_busines_03341d21.jpg";
import smartGridImage from "@assets/stock_images/modern_smart_grid_po_98ffde9c.jpg";
import powerInfraImage from "@assets/stock_images/modern_smart_grid_po_1acb6f9a.jpg";
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
      icon: Code2, 
      title: "Software Development", 
      description: "Build robust, scalable enterprise applications with modern architectures that streamline your operations.",
      image: devImage
    },
    { 
      icon: Cloud, 
      title: "Cloud Solutions", 
      description: "Migrate, optimize, and manage your cloud infrastructure with security-first architecture on AWS, Azure, and GCP.",
      image: cloudDataImage
    },
    { 
      icon: Cpu, 
      title: "IoT & Smart Grid", 
      description: "Deploy intelligent connected systems with real-time monitoring, predictive analytics, and edge computing.",
      image: smartGridImage
    },
    { 
      icon: Smartphone, 
      title: "Mobile Applications", 
      description: "Cross-platform mobile experiences that engage users with native performance and beautiful interfaces.",
      image: mobileImage
    },
    { 
      icon: BarChart3, 
      title: "Data & AI", 
      description: "Turn data into decisions with advanced analytics, machine learning models, and AI-powered automation.",
      image: analyticsImage
    },
    { 
      icon: Palette, 
      title: "UI/UX Design", 
      description: "Human-centered design that drives engagement. Research-backed interfaces that users love to interact with.",
      image: teamWorkImage
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We deep-dive into your business goals, technical landscape, and user needs to define the right approach.",
      icon: Target
    },
    {
      number: "02",
      title: "Architecture & Design",
      description: "Our architects design scalable, secure solutions. Our designers craft intuitive, beautiful experiences.",
      icon: Layers
    },
    {
      number: "03",
      title: "Agile Development",
      description: "Iterative sprints with continuous delivery. You see progress every two weeks, not after six months.",
      icon: Workflow
    },
    {
      number: "04",
      title: "Launch & Scale",
      description: "We deploy, monitor, and optimize. Post-launch support ensures your solution grows with your business.",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      image: testimonial1,
      name: "Rajesh Kumar",
      role: "CTO, Energy Solutions Corp",
      rating: 5,
      text: "iOne Techlabs delivered our IoT platform 3 months ahead of schedule. Their technical depth in smart grid technology is unmatched."
    },
    {
      image: testimonial2,
      name: "Priya Sharma",
      role: "VP Engineering, TechScale",
      rating: 5,
      text: "They rebuilt our entire cloud infrastructure. 99.99% uptime and 40% cost reduction. The ROI speaks for itself."
    },
    {
      image: testimonial3,
      name: "Amit Patel",
      role: "Director, FinServ Group",
      rating: 5,
      text: "From concept to production in 8 weeks. iOne's agile team turned our vision into a product our customers love."
    }
  ];

  const clients = [
    "Tata Power", "NTPC", "Adani Power", "Telangana State Power", 
    "BSES Rajdhani", "Torrent Power", "CESC Limited", "UPPCL"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <img src={logo} alt="iOne Techlabs" className="h-10 md:h-12 w-auto" data-testid="img-logo" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-services">Services</a>
              <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-process">Process</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-about">About</a>
              <a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-clients">Clients</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-contact">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button data-testid="button-get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Process</a>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Clients</a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <div className="pt-4">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Full Width with Dark Wash */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Technology Innovation" 
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <motion.div 
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-semibold tracking-wider uppercase text-sm" data-testid="text-hero-label">
                iOne Techlabs
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white" data-testid="text-hero-title">
              Evolving Your Business with{" "}
              <span className="text-accent">Intelligent Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed" data-testid="text-hero-description">
              From strategy to implementation, we deliver software, cloud, and IoT solutions 
              that drive real business outcomes.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" data-testid="button-hero-started">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 border-white/20 text-white backdrop-blur-sm" data-testid="button-hero-services">
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div data-testid="text-stat-projects">
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-white/60 mt-1">Projects Delivered</div>
              </div>
              <div data-testid="text-stat-clients">
                <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
                <div className="text-sm text-white/60 mt-1">Enterprise Clients</div>
              </div>
              <div data-testid="text-stat-uptime">
                <div className="text-3xl md:text-4xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-white/60 mt-1">Uptime SLA</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section - PruTech inspired cards */}
      <section id="services" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground" data-testid="text-services-title">
              Technology Solutions That Scale
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full overflow-visible hover-elevate" data-testid={`card-service-${index}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-md">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-foreground" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    <div className="pt-2">
                      <a href="#contact" className="text-primary font-medium text-sm inline-flex items-center gap-1" data-testid={`link-service-learn-${index}`}>
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats - PenguinAI inspired large numbers */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Numbers That Speak for Themselves
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-3" data-testid="text-stat-section-projects">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-primary-foreground/70 font-medium">Projects delivered across 6 industries with consistent on-time delivery</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-3" data-testid="text-stat-section-reduction">
                40%
              </div>
              <div className="text-primary-foreground/70 font-medium">Average cost reduction for clients through cloud optimization and automation</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-3" data-testid="text-stat-section-uptime">
                99.9%
              </div>
              <div className="text-primary-foreground/70 font-medium">Uptime guaranteed across all managed infrastructure and applications</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-3" data-testid="text-stat-section-engineers">
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <div className="text-primary-foreground/70 font-medium">Engineers specializing in cloud, AI, IoT, and enterprise software</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - PenguinAI numbered layers style */}
      <section id="process" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">How We Work</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-process-title">
                From Idea to Impact in Four Steps
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our proven methodology ensures every project delivers measurable results. No fluff, no delays.
              </p>
              <Button size="lg" data-testid="button-process-start">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex gap-6"
                  data-testid={`card-process-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{step.number}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About / Why iOne Section - Image + Text */}
      <section id="about" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative order-2 lg:order-1">
              <div className="rounded-md overflow-hidden shadow-2xl">
                <img src={teamWorkImage} alt="iOne Techlabs Team" className="w-full h-auto object-cover" data-testid="img-team" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <Card className="p-5 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">ISO 27001</div>
                      <div className="text-sm text-muted-foreground">Certified Secure</div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">About Us</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground" data-testid="text-about-title">
                A Responsible Approach to Technology
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                iOne Techlabs is a global technology company committed to delivering secure, scalable, and innovative 
                solutions. We combine deep industry expertise with cutting-edge engineering to help businesses 
                navigate digital transformation with confidence.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-5 bg-card rounded-md border border-border">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground mt-1">Years</div>
                </div>
                <div className="text-center p-5 bg-card rounded-md border border-border">
                  <div className="text-3xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground mt-1">Industries</div>
                </div>
                <div className="text-center p-5 bg-card rounded-md border border-border">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground mt-1">Countries</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="px-3 py-1.5">
                  <Shield className="h-3.5 w-3.5 mr-1.5" /> ISO 27001
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5">
                  <Award className="h-3.5 w-3.5 mr-1.5" /> ISO 9001
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5">
                  <Trophy className="h-3.5 w-3.5 mr-1.5" /> CMMI Level 3
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5">
                  <Lock className="h-3.5 w-3.5 mr-1.5" /> SOC 2
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IoT Showcase Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-semibold tracking-wider uppercase text-sm">Featured Capability</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground" data-testid="text-iot-title">
              IoT & Smart Grid Technology
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative rounded-md overflow-hidden h-72 md:h-96">
              <img src={powerInfraImage} alt="Smart Grid Infrastructure" className="w-full h-full object-cover" data-testid="img-power-infra" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground">AI-Powered</Badge>
                <h3 className="text-2xl font-bold text-white mb-2" data-testid="text-iris-title">IRIS Platform</h3>
                <p className="text-white/70 max-w-sm">Intelligent grid management with real-time analytics and predictive maintenance.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative rounded-md overflow-hidden h-72 md:h-96">
              <img src={iotDevicesImage} alt="IoT Connected Devices" className="w-full h-full object-cover" data-testid="img-iot-devices" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Badge className="mb-3 bg-primary text-primary-foreground">5G Enabled</Badge>
                <h3 className="text-2xl font-bold text-white mb-2" data-testid="text-metering-title">Smart Metering</h3>
                <p className="text-white/70 max-w-sm">Next-gen AMI solutions with multi-protocol support and real-time data visibility.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos / Trust Section */}
      <section id="clients" className="py-16 md:py-20 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-2">Trusted By</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-clients-title">
              Leading Enterprises Across India
            </h3>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {clients.map((client, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="flex items-center justify-center p-6 bg-card rounded-md border border-border" data-testid={`card-client-${index}`}>
                  <span className="font-semibold text-foreground">{client}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground" data-testid="text-testimonials-title">
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full flex flex-col" data-testid={`card-testimonial-${index}`}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 flex-1 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={teamImage} alt="Technology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white" data-testid="text-cta-title">
              Your Journey to Digital Leadership Starts Here
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Let's discuss how iOne Techlabs can accelerate your business growth with the right technology strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" data-testid="button-cta-consultation">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 border-white/20 text-white backdrop-blur-sm" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm">Connect With Us</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-contact-title">
                  Let's Build Together
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have a project in mind? Our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">hello@ionetechlabs.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Office</div>
                    <div className="text-muted-foreground">Hyderabad, India</div>
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

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 md:py-16">
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
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Software Development</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cloud Solutions</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">IoT & Smart Grid</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Data & AI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#clients" className="text-muted-foreground hover:text-foreground transition-colors">Clients</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} iOne Techlabs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

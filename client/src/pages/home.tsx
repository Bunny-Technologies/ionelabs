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
  Settings, 
  Palette,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Clock,
  Building2,
  GraduationCap,
  ShoppingCart,
  Heart,
  Factory,
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
  Zap,
  Globe,
  ChevronRight,
  Play,
  Sparkles
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
    { icon: Code2, title: "Software Development", image: devImage },
    { icon: Cloud, title: "Cloud Solutions", image: cloudDataImage },
    { icon: Smartphone, title: "Mobile Apps", image: mobileImage },
    { icon: BarChart3, title: "Data Analytics", image: analyticsImage },
    { icon: Settings, title: "DevOps", image: cloudImage },
    { icon: Palette, title: "UI/UX Design", image: teamWorkImage }
  ];


  const solutions = [
    {
      image: devImage,
      title: "Enterprise Software",
      benefits: ["Custom ERP", "CRM Integration", "Workflow Automation"],
      reverse: false
    },
    {
      image: cloudImage,
      title: "Digital Transformation",
      benefits: ["Cloud Migration", "API Development", "System Integration"],
      reverse: true
    },
    {
      image: mobileImage,
      title: "Startup Acceleration",
      benefits: ["Rapid Prototyping", "MVP Development", "Scaling Strategy"],
      reverse: false
    }
  ];

  const testimonials = [
    {
      image: testimonial1,
      name: "J.T. Rao",
      role: "CEO, Winamr Systems",
      rating: 5,
      text: "Trusted technology partner for 5+ years. World-class AMI solutions."
    },
    {
      image: testimonial2,
      name: "Rajesh Kumar",
      role: "CTO, TSSPDCL",
      rating: 5,
      text: "SKOCH Award winning smart grid project. Unmatched technical expertise."
    },
    {
      image: testimonial3,
      name: "Priya Sharma",
      role: "VP, Tata Power",
      rating: 5,
      text: "On-time delivery with 99.99% data accuracy. Exceptional results."
    }
  ];

  const industries = [
    { icon: Heart, name: "Healthcare" },
    { icon: Building2, name: "Finance" },
    { icon: ShoppingCart, name: "E-commerce" },
    { icon: GraduationCap, name: "Education" },
    { icon: Factory, name: "Manufacturing" },
    { icon: Zap, name: "Energy" }
  ];

  const utilityClients = [
    { name: "Tata Power" },
    { name: "NTPC" },
    { name: "Adani Power" },
    { name: "Telangana State Power" },
    { name: "BSES Rajdhani" },
    { name: "Torrent Power" },
    { name: "CESC Limited" },
    { name: "UPPCL" }
  ];

  const certifications = [
    { name: "ISO 27001", icon: Shield },
    { name: "ISO 9001", icon: Award },
    { name: "CMMI L3", icon: Trophy },
    { name: "SOC 2", icon: Shield }
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-services">Services</a>
              <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-solutions">Solutions</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-about">About</a>
              <a href="#industries" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-industries">Industries</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="link-contact">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" data-testid="button-login">Login</Button>
              <Button data-testid="button-get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">Services</a>
                <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">Solutions</a>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">About</a>
                <a href="#industries" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">Industries</a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">Contact</a>
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" className="w-full">Login</Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium" data-testid="badge-hero">
                Trusted by 50+ Enterprise Clients
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground" data-testid="text-hero-title">
                Transform Your Business with 
                <span className="text-primary"> Innovative Technology</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl" data-testid="text-hero-description">
                We deliver cutting-edge software solutions that drive growth, optimize operations, and create exceptional digital experiences for forward-thinking organizations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="px-8" data-testid="button-schedule-consultation">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" data-testid="button-view-work">
                  View Our Work
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" data-testid="text-stat-projects">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" data-testid="text-stat-clients">50+</div>
                  <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" data-testid="text-stat-uptime">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Technology team collaboration" 
                  className="w-full h-auto object-cover"
                  data-testid="img-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border border-card-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Award Winning</div>
                    <div className="text-sm text-muted-foreground">Tech Solutions 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Visual Grid */}
      <section id="services" className="py-16 md:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-services">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-services-title">
              What We Build
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="relative group rounded-xl overflow-hidden h-48 md:h-64 hover-elevate" data-testid={`card-service-${index}`}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTEwIDEwdjZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-stat-section-projects">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-primary-foreground/80">Projects Delivered</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-stat-section-engineers">
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <div className="text-primary-foreground/80">Expert Engineers</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-stat-section-uptime">99.9%</div>
              <div className="text-primary-foreground/80">Uptime Guarantee</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-stat-section-experience">
                <AnimatedCounter end={10} suffix="+" />
              </div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Winamr Systems - Subsidiary Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="default" className="mb-4 bg-accent text-accent-foreground" data-testid="badge-subsidiary">
              <Building2 className="h-3 w-3 mr-1" />
              Our Subsidiary Company
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="text-subsidiary-title">
              Winamr Systems
            </h2>
            <p className="text-lg text-muted-foreground">
              Owned and operated by iOne Techlabs
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="overflow-hidden border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={smartGridImage} 
                    alt="Winamr Smart Grid Solutions" 
                    className="w-full h-full object-cover"
                    data-testid="img-winamr-showcase"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 lg:bg-gradient-to-l" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">Winamr Systems</div>
                      <div className="text-accent font-medium">iOne Techlabs Subsidiary</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-3xl font-bold text-primary">
                        <AnimatedCounter end={8} suffix="+" />
                      </div>
                      <div className="text-sm text-muted-foreground">Utility Clients</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-xl">
                      <div className="text-3xl font-bold text-accent">5G</div>
                      <div className="text-sm text-muted-foreground">Smart Meters</div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-3xl font-bold text-primary">AI</div>
                      <div className="text-sm text-muted-foreground">IRIS Platform</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {utilityClients.slice(0, 6).map((client, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {client.name}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="px-3 py-1">+2 more</Badge>
                  </div>

                  <Button size="lg" className="w-fit group" data-testid="button-explore-winamr">
                    Explore Winamr
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - Visual Compact Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-border"
              >
                <cert.icon className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{cert.name}</span>
              </motion.div>
            ))}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <Zap className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent">Make in India</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Best Smart Grid 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IoT & Smart Grid Technology Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Smart Grid Technology
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              IoT & Energy Solutions
            </h2>
          </motion.div>

          {/* Hero Image Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden h-64 md:h-80">
              <img src={powerInfraImage} alt="Power Infrastructure" className="w-full h-full object-cover" data-testid="img-power-infra" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <Badge className="mb-2 bg-accent text-accent-foreground">AI-Powered</Badge>
                <h3 className="text-2xl font-bold text-white">IRIS Platform</h3>
                <p className="text-white/80 text-sm">Intelligent grid management</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden h-64 md:h-80">
              <img src={iotDevicesImage} alt="IoT Smart Devices" className="w-full h-full object-cover" data-testid="img-iot-devices" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <Badge className="mb-2 bg-primary text-primary-foreground">5G Enabled</Badge>
                <h3 className="text-2xl font-bold text-white">Smart Meters</h3>
                <p className="text-white/80 text-sm">Real-time data visibility</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Icons Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: BarChart3, label: "MDMS Analytics", color: "primary" },
              { icon: Shield, label: "Grid Security", color: "accent" },
              { icon: Globe, label: "Multi-Protocol", color: "primary" },
              { icon: Sparkles, label: "AI Analytics", color: "accent" }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-4 text-center hover-elevate">
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-${item.color}/10 flex items-center justify-center mb-3`}>
                    <item.icon className={`h-6 w-6 text-${item.color}`} />
                  </div>
                  <div className="font-semibold text-foreground">{item.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-10 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button size="lg" className="group" data-testid="button-explore-technology">
              Explore Technology
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section - Visual Grid */}
      <section id="solutions" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-solutions">Solutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-solutions-title">
              What We Deliver
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {solutions.map((solution, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden h-full group hover-elevate" data-testid={`card-solution-${index}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={solution.image} 
                      alt={solution.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-solution-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Compact */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-testimonials">Client Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-testimonials-title">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-4 md:gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-5 h-full" data-testid={`card-testimonial-${index}`}>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
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

      {/* About Section with Team Image */}
      <section id="team" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={teamWorkImage} alt="Our Expert Team" className="w-full h-auto object-cover" data-testid="img-team" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border hidden md:flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">150+</div>
                  <div className="text-sm text-muted-foreground">Engineers</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <Badge variant="secondary">About iOne Techlabs</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Building Tomorrow's Technology Today
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
              </div>
              <Button size="lg" className="group" data-testid="button-about-learn-more">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries Section - Visual Icons */}
      <section id="industries" className="py-12 md:py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-industries-title">
              Industries We Serve
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 md:grid-cols-6 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {industries.map((industry, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="p-4 text-center hover-elevate rounded-xl group" data-testid={`card-industry-${index}`}>
                  <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                    <industry.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{industry.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground" data-testid="text-cta-title">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto" data-testid="text-cta-description">
              Let's discuss how iOne Techlabs can help you achieve your technology goals. Schedule a free consultation with our experts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8" data-testid="button-cta-consultation">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-contact">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 lg:py-32">
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
                <Badge variant="secondary" className="mb-4" data-testid="badge-contact">Contact Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
                  Let's Start a Conversation
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-contact-description">
                  Have a project in mind? We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">hello@ionetechlabs.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Office</div>
                    <div className="text-muted-foreground">123 Innovation Drive, Tech City, TC 12345</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="p-6 md:p-8" data-testid="card-contact-form">
                <form className="space-y-6" onSubmit={handleContactSubmit} data-testid="form-contact">
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 lg:col-span-1">
              <img src={logo} alt="iOne Techlabs" className="h-10 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-sm text-muted-foreground mb-4">
                Transforming businesses through innovative technology solutions since 2014.
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
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Data Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates.</p>
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit} data-testid="form-newsletter">
                <Input 
                  placeholder="Enter email" 
                  type="email"
                  className="flex-1" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterMutation.isPending}
                  data-testid="input-newsletter" 
                />
                <Button type="submit" disabled={newsletterMutation.isPending} data-testid="button-subscribe">
                  {newsletterMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2024 iOne Techlabs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

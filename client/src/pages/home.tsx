import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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
  Truck,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Loader2
} from "lucide-react";
import { SiGithub } from "react-icons/si";

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
      title: "Custom Software Development",
      description: "Tailored solutions built from the ground up to meet your unique business requirements and scale with your growth."
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Seamless cloud migration, infrastructure optimization, and managed services for maximum performance."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices."
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with our advanced analytics and business intelligence solutions."
    },
    {
      icon: Settings,
      title: "DevOps & Automation",
      description: "Streamline your development pipeline with CI/CD, infrastructure as code, and automated testing."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality for intuitive digital experiences."
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered", icon: Trophy },
    { value: "150+", label: "Expert Engineers", icon: Users },
    { value: "99.9%", label: "Uptime Guarantee", icon: Clock },
    { value: "10+", label: "Years Experience", icon: Building2 }
  ];

  const solutions = [
    {
      image: devImage,
      title: "Enterprise Software Solutions",
      description: "Build robust, scalable enterprise applications that streamline operations and drive efficiency across your organization.",
      benefits: ["Custom ERP Systems", "CRM Integration", "Workflow Automation", "Legacy Modernization"],
      reverse: false
    },
    {
      image: cloudImage,
      title: "Digital Transformation",
      description: "Embrace the future with comprehensive digital transformation strategies that revolutionize how you do business.",
      benefits: ["Cloud Migration", "Process Digitization", "API Development", "System Integration"],
      reverse: true
    },
    {
      image: mobileImage,
      title: "Startup Acceleration",
      description: "From MVP to market leader, we help startups build, launch, and scale their products with speed and precision.",
      benefits: ["Rapid Prototyping", "MVP Development", "Technical Advisory", "Scaling Strategy"],
      reverse: false
    }
  ];

  const testimonials = [
    {
      image: testimonial1,
      name: "Sarah Chen",
      role: "CTO, TechVentures Inc.",
      company: "TechVentures Inc.",
      rating: 5,
      text: "iOne Techlabs transformed our legacy systems into a modern, scalable platform. Their expertise in cloud migration was instrumental in our 40% cost reduction."
    },
    {
      image: testimonial2,
      name: "Michael Rodriguez",
      role: "VP of Engineering, FinServe Global",
      company: "FinServe Global",
      rating: 5,
      text: "The team's dedication to quality and timely delivery exceeded our expectations. They delivered a complex financial platform that handles millions of transactions daily."
    },
    {
      image: testimonial3,
      name: "Emily Thompson",
      role: "CEO, HealthTech Solutions",
      company: "HealthTech Solutions",
      rating: 5,
      text: "Working with iOne Techlabs was a game-changer. Their mobile app development team created an intuitive patient portal that increased engagement by 300%."
    }
  ];

  const industries = [
    { icon: Heart, name: "Healthcare", description: "HIPAA-compliant solutions" },
    { icon: Building2, name: "Finance", description: "Secure banking platforms" },
    { icon: ShoppingCart, name: "E-commerce", description: "Scalable retail solutions" },
    { icon: GraduationCap, name: "Education", description: "Learning management systems" },
    { icon: Factory, name: "Manufacturing", description: "Industry 4.0 solutions" },
    { icon: Truck, name: "Logistics", description: "Supply chain optimization" }
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

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 lg:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-services">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-services-title">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-services-description">
              From concept to deployment, we provide end-to-end technology services that empower your business to thrive in the digital age.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 md:p-8 h-full hover-elevate transition-all duration-300 group" data-testid={`card-service-${index}`}>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2" data-testid={`text-stat-${index}`}>{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-solutions">Solutions</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-solutions-title">
              Tailored Solutions for Every Challenge
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-solutions-description">
              Whether you're an enterprise looking to modernize or a startup ready to scale, we have the expertise to make it happen.
            </p>
          </motion.div>

          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <motion.div 
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${solution.reverse ? 'lg:flex-row-reverse' : ''}`}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className={`${solution.reverse ? 'lg:order-2' : ''}`}>
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={solution.image} 
                      alt={solution.title} 
                      className="w-full h-auto object-cover"
                      data-testid={`img-solution-${index}`}
                    />
                  </div>
                </div>
                <div className={`space-y-6 ${solution.reverse ? 'lg:order-1' : ''}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{solution.title}</h3>
                  <p className="text-lg text-muted-foreground">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4" data-testid={`button-learn-more-${index}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-testimonials">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-testimonials-title">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-testimonials-description">
              Don't just take our word for it. Here's what industry leaders have to say about working with iOne Techlabs.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 md:p-8 h-full" data-testid={`card-testimonial-${index}`}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-industries">Industries</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-industries-title">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-industries-description">
              Deep domain expertise across diverse industries enables us to deliver solutions that truly understand your business challenges.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {industries.map((industry, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover-elevate transition-all duration-300 group" data-testid={`card-industry-${index}`}>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                  <p className="text-xs text-muted-foreground">{industry.description}</p>
                </Card>
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

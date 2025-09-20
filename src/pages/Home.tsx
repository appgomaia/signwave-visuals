import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle,
  Eye,
  Palette,
  Wrench
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import heroImage from "@/assets/signage-business-hero.jpg";

const features = [
  {
    icon: Shield,
    title: "Premium Quality Materials",
    description: "We use only the highest quality materials to ensure your signage lasts for years to come."
  },
  {
    icon: Clock,
    title: "Fast Turnaround Times",
    description: "Quick production and delivery without compromising on quality. Most projects completed within 5-7 business days."
  },
  {
    icon: Palette,
    title: "Custom Design Services",
    description: "Our expert designers work with you to create unique, eye-catching signage that represents your brand perfectly."
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Expert installation services ensure your signage is mounted safely and looks perfect from day one."
  }
];

const stats = [
  { label: "Years Experience", value: "15+" },
  { label: "Happy Clients", value: "2,500+" },
  { label: "Projects Completed", value: "10,000+" },
  { label: "Success Rate", value: "99%" }
];

const featuredProducts = [
  {
    name: "Custom Business Signs",
    description: "Professional storefront signage that makes your business stand out",
    price: "Starting at $299",
    image: "/placeholder.svg"
  },
  {
    name: "Digital LED Displays",
    description: "Modern digital signage for dynamic content and maximum impact",
    price: "Starting at $899",
    image: "/placeholder.svg"
  },
  {
    name: "Vehicle Wraps",
    description: "Transform your vehicle into a mobile billboard for your business",
    price: "Starting at $1,299",
    image: "/placeholder.svg"
  },
  {
    name: "Trade Show Displays",
    description: "Portable, professional displays that attract attention at events",
    price: "Starting at $499",
    image: "/placeholder.svg"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Johnson's Bakery",
    text: "FBRSigns transformed our storefront with a beautiful custom sign. Sales increased 30% in the first month!",
    rating: 5
  },
  {
    name: "Mike Chen",
    company: "Tech Solutions Inc",
    text: "Professional service, fast turnaround, and exceptional quality. Highly recommend for any business signage needs.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    company: "Rodriguez Law Firm",
    text: "The team at FBRSigns understood our vision perfectly and delivered exactly what we needed. Outstanding work!",
    rating: 5
  }
];

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional signage solutions by FBRSigns"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/90" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
              Transform Your Vision Into<br />
              <span className="text-gradient">Stunning Visual Communication</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional signage solutions that make your brand stand out. 
              From custom business signs to digital displays, we bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <GlassButton variant="hero" size="xl" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlassButton>
              <GlassButton variant="outline" size="xl" asChild>
                <Link to="/contact">Get Free Quote</Link>
              </GlassButton>
            </div>
            
            {/* Featured Image */}
            <div className="relative max-w-2xl mx-auto mb-12 animate-scale-in">
              <GlassCard variant="hero" className="overflow-hidden">
                <img
                  src={heroImage}
                  alt="Professional signage solutions showcase by FBRSigns"
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </GlassCard>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-glow" />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-16 h-16 bg-gradient-primary rounded-full opacity-10 animate-glow" />
        <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-gradient-secondary rounded-full opacity-15 animate-glow" />
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">FBRSigns</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine cutting-edge technology with years of expertise to deliver 
              signage solutions that exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={feature.title} variant="interactive" className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most popular signage solutions, crafted with precision and designed to make an impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <GlassCard key={product.name} variant="interactive" className="group overflow-hidden">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gradient">{product.price}</span>
                  <GlassButton variant="outline" size="sm" asChild>
                    <Link to="/products">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <GlassButton variant="hero" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={testimonial.name} className="relative">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard variant="hero">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform <span className="text-gradient">Your Space?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with professional signage that makes a lasting impression. 
              Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlassButton>
              <GlassButton variant="outline" size="xl" asChild>
                <Link to="/portfolio">View Our Work</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
}
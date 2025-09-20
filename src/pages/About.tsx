import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years in the signage industry, Sarah leads our team with passion and expertise.",
    image: "/placeholder.svg"
  },
  {
    name: "Mike Rodriguez",
    role: "Creative Director", 
    bio: "Mike brings innovative design thinking and ensures every project exceeds expectations.",
    image: "/placeholder.svg"
  },
  {
    name: "Emily Chen",
    role: "Production Manager",
    bio: "Emily oversees quality control and ensures timely delivery of all our projects.",
    image: "/placeholder.svg"
  },
  {
    name: "David Thompson",
    role: "Installation Specialist",
    bio: "David leads our installation team with precision and commitment to safety.",
    image: "/placeholder.svg"
  }
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for perfection in every project, from design concept to final installation."
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Our clients' success is our success. We build lasting relationships through exceptional service."
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We embrace new technologies and creative solutions to stay ahead of industry trends."
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "Our collaborative approach ensures every project benefits from our collective expertise."
  }
];

const milestones = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Started with a vision to transform visual communication"
  },
  {
    year: "2012",
    title: "1,000 Projects",
    description: "Reached our first major milestone with 1,000 completed projects"
  },
  {
    year: "2015",
    title: "Digital Expansion",
    description: "Added digital signage and LED display services"
  },
  {
    year: "2018",
    title: "Regional Growth",
    description: "Expanded operations to serve clients across three states"
  },
  {
    year: "2021",
    title: "Sustainability Focus",
    description: "Launched eco-friendly materials and sustainable practices"
  },
  {
    year: "2024",
    title: "10,000+ Projects",
    description: "Celebrating over 10,000 successful projects and counting"
  }
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "2,500+", label: "Happy Clients" },
  { value: "10,000+", label: "Projects Completed" },
  { value: "50+", label: "Team Members" }
];

export default function About() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">FBRSigns</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For over 15 years, we've been transforming visions into stunning visual 
              communication solutions that help businesses stand out and succeed.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <GlassCard key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Founded in 2009 by Sarah Johnson, FBRSigns began with a simple mission: 
                  to help businesses communicate their message through exceptional visual signage. 
                  What started as a small operation has grown into a leading signage company 
                  serving clients across the region.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, from embracing digital 
                  signage technologies to implementing sustainable practices. We've completed 
                  over 10,000 projects, but what we're most proud of is the lasting relationships 
                  we've built with our clients.
                </p>
                <p>
                  Today, our team of 50+ professionals combines decades of experience with 
                  cutting-edge technology to deliver signage solutions that not only look 
                  amazing but drive real business results.
                </p>
              </div>
            </div>
            
            <GlassCard variant="hero" className="overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="FBRSigns team at work"
                className="w-full h-full object-cover rounded-lg"
              />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we work 
              with our clients and each other.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <GlassCard key={value.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented professionals behind every successful project. 
              Our team combines expertise, creativity, and dedication.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <GlassCard key={member.name} className="text-center group">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones that have shaped our company and defined our success.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-primary opacity-30 mt-4" />
                  )}
                </div>
                
                <GlassCard className="flex-1 group-hover:shadow-glass-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
              <p className="text-muted-foreground">
                123 Business Avenue<br />
                Suite 100<br />
                Your City, ST 12345
              </p>
            </GlassCard>
            
            <GlassCard className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow-secondary">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p className="text-muted-foreground">
                Main: (555) 123-4567<br />
                Emergency: (555) 987-6543<br />
                Mon-Fri: 8AM-6PM
              </p>
            </GlassCard>
            
            <GlassCard className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email Us</h3>
              <p className="text-muted-foreground">
                info@fbrsigns.com<br />
                support@fbrsigns.com<br />
                Response within 2 hours
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard variant="hero">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Work <span className="text-gradient">Together?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how our experience and expertise 
              can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlassButton>
              <GlassButton variant="outline" size="xl" asChild>
                <Link to="/portfolio">View Our Portfolio</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
}
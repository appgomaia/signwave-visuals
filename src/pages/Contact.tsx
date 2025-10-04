import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Building
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["123 Business Avenue", "Suite 100", "Your City, ST 12345"],
    action: "Get Directions"
  },
  {
    icon: Phone,
    title: "Call Us Today",
    details: ["Main: (555) 123-4567", "Emergency: (555) 987-6543", "Toll Free: (800) 555-0123"],
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@fbrsigns.com", "support@fbrsigns.com", "sales@fbrsigns.com"],
    action: "Send Email"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed"],
    action: "Schedule Call"
  }
];

const serviceTypes = [
  "Custom Business Signs",
  "Digital LED Displays", 
  "Vehicle Wraps",
  "Banners & Flags",
  "Trade Show Displays",
  "Interior Signage",
  "Outdoor Advertising",
  "Installation Services",
  "Design Services",
  "Maintenance & Repair",
  "Other"
];

export default function Contact() {
  const { t } = useTranslation();
  const { data: companyInfo, isLoading } = useCompanyInfo();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    projectDetails: "",
    budget: "",
    timeline: ""
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: t('content:contact.info.office.title'),
      details: companyInfo?.company_address 
        ? companyInfo.company_address.split(',').map(part => part.trim())
        : ["123 Business Avenue", "Suite 100", "Your City, ST 12345"],
      action: t('content:contact.info.office.action')
    },
    {
      icon: Phone,
      title: t('content:contact.info.phone.title'),
      details: companyInfo?.company_phone 
        ? [companyInfo.company_phone]
        : ["Main: (555) 123-4567"],
      action: t('content:contact.info.phone.action')
    },
    {
      icon: Mail,
      title: t('content:contact.info.email.title'),
      details: companyInfo?.company_email 
        ? [companyInfo.company_email]
        : ["info@fbrsigns.com"],
      action: t('content:contact.info.email.action')
    },
    {
      icon: Clock,
      title: t('content:contact.info.hours.title'),
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed"],
      action: t('content:contact.info.hours.action')
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('content:contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('content:contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <GlassCard key={info.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                  <div className="space-y-2 mb-6">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <GlassButton variant="outline" size="sm" className="w-full">
                    {info.action}
                  </GlassButton>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                {t('content:contact.form.title')}
              </h2>
              
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10 glass-input"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="glass-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 glass-input"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10 glass-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="pl-10 glass-input"
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Needed *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="over-10000">Over $10,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Project timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-week">Within 1 week</SelectItem>
                          <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <Label htmlFor="projectDetails">Project Details *</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="projectDetails"
                        placeholder="Please describe your project, including dimensions, materials, location, and any specific requirements..."
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        className="pl-10 glass-input min-h-[120px] resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <GlassButton type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Quote Request
                  </GlassButton>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond within 2 hours during business hours
                  </p>
                </form>
              </GlassCard>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Visit Our <span className="text-gradient">Showroom</span>
                </h2>
                
                <GlassCard className="p-8 mb-8">
                  {/* Placeholder for map */}
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-6">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        {companyInfo?.company_address || "123 Business Avenue, Suite 100, Your City, ST 12345"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Why Visit Our Showroom?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        See material samples and quality up close
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        View completed projects and portfolio
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Meet our design team for consultation
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        Get instant pricing and project timelines
                      </li>
                    </ul>
                  </div>
                </GlassCard>

                {/* Quick Contact */}
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
                  <div className="space-y-3">
                    <GlassButton variant="outline" size="lg" className="w-full justify-start">
                      <Phone className="mr-3 h-5 w-5" />
                      Call: {companyInfo?.company_phone || "(555) 123-4567"}
                    </GlassButton>
                    <GlassButton variant="outline" size="lg" className="w-full justify-start">
                      <Mail className="mr-3 h-5 w-5" />
                      Email: {companyInfo?.company_email || "info@fbrsigns.com"}
                    </GlassButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3">How long does a typical project take?</h3>
              <p className="text-muted-foreground">
                Most projects are completed within 5-7 business days from approval. 
                Complex installations may take longer, and we'll provide a detailed timeline with your quote.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3">Do you provide installation services?</h3>
              <p className="text-muted-foreground">
                Yes! We offer professional installation services with certified technicians. 
                All installations include a warranty and are completed to safety standards.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3">Can you help with design if I don't have artwork?</h3>
              <p className="text-muted-foreground">
                Absolutely! Our design team can create custom artwork, logos, and layouts. 
                Design services start at $199 and are often included with larger projects.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3">What materials do you use?</h3>
              <p className="text-muted-foreground">
                We use only premium materials including aluminum, acrylic, vinyl, LED components, 
                and weather-resistant inks. All materials come with manufacturer warranties.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Palette, 
  Printer, 
  Wrench, 
  Headphones, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Award,
  Zap
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

export default function Services() {
  const { t } = useTranslation('content');

  const getArrayFromTranslation = (key: string, fallback: string[]) => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : fallback;
  };

  const services = [
    {
      icon: Palette,
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: getArrayFromTranslation('services.design.features', [
        "Custom Logo Design",
        "Brand Identity Development", 
        "Layout & Mockup Creation",
        "Color Scheme Consultation"
      ]),
      process: getArrayFromTranslation('services.design.process', [
        "Initial Consultation",
        "Concept Development", 
        "Design Refinement",
        "Final Approval"
      ]),
      timeline: t('services.design.timeline') || "3-5 business days",
      startingPrice: t('services.design.startingPrice')
    },
    {
      icon: Printer,
      title: t('services.production.title'),
      description: t('services.production.description'),
      features: getArrayFromTranslation('services.production.features', [
        "Digital Printing",
        "Vinyl Cutting & Application",
        "Metal Fabrication",
        "Lamination & Finishing"
      ]),
      process: getArrayFromTranslation('services.production.process', [
        "File Preparation",
        "Material Selection",
        "Production",
        "Quality Control"
      ]),
      timeline: t('services.production.timeline') || "2-7 business days",
      startingPrice: t('services.production.startingPrice')
    },
    {
      icon: Wrench,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      features: getArrayFromTranslation('services.installation.features', [
        "Professional Mounting",
        "Electrical Connections",
        "Site Preparation",
        "Safety Compliance"
      ]),
      process: getArrayFromTranslation('services.installation.process', [
        "Site Survey",
        "Installation Planning",
        "Professional Installation",
        "Final Testing"
      ]),
      timeline: t('services.installation.timeline') || "1-3 business days",
      startingPrice: t('services.installation.startingPrice')
    },
    {
      icon: Headphones,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      features: getArrayFromTranslation('services.maintenance.features', [
        "Regular Cleaning",
        "Repair Services",
        "Content Updates",
        "24/7 Support"
      ]),
      process: getArrayFromTranslation('services.maintenance.process', [
        "Maintenance Schedule",
        "Regular Inspections",
        "Preventive Care",
        "Emergency Repairs"
      ]),
      timeline: t('services.maintenance.timeline') || "Ongoing",
      startingPrice: t('services.maintenance.startingPrice')
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: t('services.process.consultation.title'),
      description: t('services.process.consultation.description')
    },
    {
      step: "02", 
      title: t('services.process.design.title'),
      description: t('services.process.design.description')
    },
    {
      step: "03",
      title: t('services.process.production.title'),
      description: t('services.process.production.description')
    },
    {
      step: "04",
      title: t('services.process.installation.title'),
      description: t('services.process.installation.description')
    },
    {
      step: "05",
      title: t('services.process.support.title'),
      description: t('services.process.support.description')
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: t('services.whyChoose.expertise.title'),
      description: t('services.whyChoose.expertise.description')
    },
    {
      icon: Zap,
      title: t('services.whyChoose.turnaround.title'),
      description: t('services.whyChoose.turnaround.description')
    },
    {
      icon: CheckCircle,
      title: t('services.whyChoose.quality.title'),
      description: t('services.whyChoose.quality.description')
    },
    {
      icon: Clock,
      title: t('services.whyChoose.delivery.title'),
      description: t('services.whyChoose.delivery.description')
    }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassCard key={service.title} variant="interactive" className="group">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300 mr-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
                      <p className="text-gradient font-semibold">Starting at {service.startingPrice}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3">{t('services.featuresIncluded') || 'Features Included:'}</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">{t('services.ourProcess') || 'Our Process:'}</h4>
                      <ul className="space-y-2">
                        {service.process.map((step, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <span className="w-6 h-6 rounded-full bg-gradient-primary text-white text-xs flex items-center justify-center mr-2 flex-shrink-0">
                              {idx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-glass-neutral/20">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {service.timeline}
                    </div>
                    <GlassButton variant="outline" size="sm">
                      {t('services.getQuote') || 'Get Quote'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </GlassButton>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('services.process.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.process.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-primary opacity-30" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('services.whyChoose.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow-secondary group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard variant="hero">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('services.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton variant="hero" size="xl" asChild>
                <Link to="/contact">
                  {t('services.cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlassButton>
              <GlassButton variant="outline" size="xl" asChild>
                <Link to="/portfolio">{t('services.cta.portfolio')}</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
}
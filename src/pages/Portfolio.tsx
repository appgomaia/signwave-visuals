import React, { useState } from "react";
import { Eye, ExternalLink, Filter } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

const categories = [
  "All Projects",
  "Business Signs",
  "Digital Displays", 
  "Vehicle Wraps",
  "Trade Shows",
  "Interior Signage",
  "Outdoor Advertising"
];

const portfolioItems = [
  {
    id: 1,
    title: "Modern Restaurant Signage",
    category: "Business Signs",
    client: "Bella Vista Restaurant",
    description: "Complete signage package including storefront sign, menu boards, and interior wayfinding.",
    image: "/placeholder.svg",
    tags: ["LED", "Acrylic", "Interior Design"],
    year: "2024"
  },
  {
    id: 2,
    title: "Digital Billboard Campaign",
    category: "Digital Displays",
    client: "Tech Solutions Inc",
    description: "Large-format LED display for high-traffic advertising with dynamic content management.",
    image: "/placeholder.svg",
    tags: ["LED", "Digital", "High-Traffic"],
    year: "2024"
  },
  {
    id: 3,
    title: "Fleet Vehicle Wraps",
    category: "Vehicle Wraps",
    client: "Green Clean Services",
    description: "Complete fleet branding with eye-catching vehicle wraps for 12 service vehicles.",
    image: "/placeholder.svg",
    tags: ["Fleet", "Branding", "Vinyl"],
    year: "2023"
  },
  {
    id: 4,
    title: "Trade Show Booth Design",
    category: "Trade Shows",
    client: "Innovation Expo 2024",
    description: "Modular trade show display system with integrated lighting and interactive elements.",
    image: "/placeholder.svg",
    tags: ["Modular", "Interactive", "Portable"],
    year: "2024"
  },
  {
    id: 5,
    title: "Corporate Office Signage",
    category: "Interior Signage",
    client: "Atlantic Financial Group",
    description: "Professional interior signage suite including lobby display, directional signs, and room identification.",
    image: "/placeholder.svg",
    tags: ["Corporate", "Wayfinding", "Professional"],
    year: "2023"
  },
  {
    id: 6,
    title: "Shopping Center Directory",
    category: "Outdoor Advertising",
    client: "Riverside Shopping Plaza",
    description: "Large-scale directory sign with illuminated tenant panels and map integration.",
    image: "/placeholder.svg",
    tags: ["Directory", "Illuminated", "Large-Scale"],
    year: "2024"
  },
  {
    id: 7,
    title: "Medical Center Wayfinding",
    category: "Interior Signage",
    client: "Sunrise Medical Center",
    description: "Comprehensive wayfinding system with ADA-compliant signage throughout the facility.",
    image: "/placeholder.svg",
    tags: ["ADA Compliant", "Healthcare", "Wayfinding"],
    year: "2023"
  },
  {
    id: 8,
    title: "Real Estate Development Signs",
    category: "Business Signs",
    client: "Premier Properties",
    description: "Monument signs, directional signage, and sales center displays for luxury development.",
    image: "/placeholder.svg",
    tags: ["Monument", "Luxury", "Development"],
    year: "2024"
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  const filteredProjects = portfolioItems.filter(project =>
    selectedCategory === "All Projects" || project.category === selectedCategory
  );

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our recent projects and see how we've helped businesses 
              transform their visual communication and stand out from the competition.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <GlassButton
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </GlassButton>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <GlassCard
                key={project.id}
                variant="interactive"
                className="group overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-muted relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <GlassButton variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </GlassButton>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  
                  <p className="text-primary font-medium text-sm">{project.client}</p>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-glass-neutral/10 rounded-md text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <GlassCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-glass-neutral/20 flex items-center justify-center hover:bg-glass-neutral/30 transition-colors z-10"
              >
                ×
              </button>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                    <span className="text-lg text-muted-foreground">{selectedProject.year}</span>
                  </div>
                  <p className="text-xl text-primary font-medium mb-2">{selectedProject.client}</p>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-primary text-white rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-glass-neutral/20">
                  <div className="flex gap-4">
                    <GlassButton variant="hero" size="lg">
                      Start Similar Project
                    </GlassButton>
                    <GlassButton variant="outline" size="lg">
                      Get Quote
                    </GlassButton>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Project <span className="text-gradient">Statistics</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassCard className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">150+</div>
              <div className="text-muted-foreground">Projects This Year</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">25</div>
              <div className="text-muted-foreground">Industry Awards</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">5.0</div>
              <div className="text-muted-foreground">Average Rating</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard variant="hero">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Inspired by Our <span className="text-gradient">Work?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing for your business. Every project starts 
              with understanding your unique needs and vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton variant="hero" size="xl">
                Start Your Project
              </GlassButton>
              <GlassButton variant="outline" size="xl">
                Schedule Consultation
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
}
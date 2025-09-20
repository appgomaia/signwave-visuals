import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Grid, List, Star, ShoppingCart, Eye } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Input } from "@/components/ui/input";

const categories = [
  "All Products",
  "Business Signs",
  "Digital Displays",
  "Vehicle Wraps",
  "Banners",
  "Trade Show",
  "Yard Signs",
];

const products = [
  {
    id: 1,
    name: "Custom Business Sign",
    category: "Business Signs",
    description: "Professional storefront signage with custom design and premium materials",
    price: 299,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 2,
    name: "LED Digital Display",
    category: "Digital Displays",
    description: "High-resolution LED display for dynamic content and advertising",
    price: 899,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 3,
    name: "Vehicle Wrap Design",
    category: "Vehicle Wraps",
    description: "Full vehicle wrap with custom design and professional installation",
    price: 1299,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 4,
    name: "Trade Show Banner",
    category: "Trade Show",
    description: "Portable, high-quality banners perfect for trade shows and events",
    price: 149,
    rating: 4.7,
    reviews: 312,
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 5,
    name: "Vinyl Banner",
    category: "Banners",
    description: "Durable vinyl banners for outdoor advertising and promotions",
    price: 89,
    rating: 4.6,
    reviews: 445,
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 6,
    name: "Yard Sign",
    category: "Yard Signs",
    description: "Weather-resistant yard signs for real estate and business promotion",
    price: 29,
    rating: 4.5,
    reviews: 567,
    image: "/placeholder.svg",
    featured: false,
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of professional signage solutions, 
              from custom business signs to digital displays.
            </p>
          </div>

          {/* Filters */}
          <GlassCard className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
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

              {/* View Mode */}
              <div className="flex gap-2">
                <GlassButton
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </GlassButton>
                <GlassButton
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </GlassButton>
              </div>
            </div>
          </GlassCard>

          {/* Products Grid */}
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <GlassCard 
                key={product.id} 
                variant="interactive" 
                className={`group ${viewMode === "list" ? "flex gap-6" : ""}`}
              >
                <div className={`${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "mb-6"
                } aspect-square rounded-lg overflow-hidden bg-muted`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gradient">
                      ${product.price}
                    </span>
                    <div className="flex gap-2">
                      <GlassButton variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </GlassButton>
                      <GlassButton variant="default" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
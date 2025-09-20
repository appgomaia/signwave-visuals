import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-card backdrop-blur-glass border-glass-neutral/20 shadow-glass"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow group-hover:shadow-glow-secondary transition-all duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">FBRSigns</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-glass-neutral/10 text-primary shadow-glass"
                    : "text-foreground/80 hover:text-foreground hover:bg-glass-neutral/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <GlassButton variant="outline" size="sm">
              Get Quote
            </GlassButton>
            <GlassButton variant="hero" size="sm">
              Start Project
            </GlassButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <GlassButton
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-glass-neutral/20">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "text-foreground/80 hover:text-foreground hover:bg-glass-neutral/10"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <GlassButton variant="outline" className="w-full" size="lg">
                Get Quote
              </GlassButton>
              <GlassButton variant="hero" className="w-full" size="lg">
                Start Project
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
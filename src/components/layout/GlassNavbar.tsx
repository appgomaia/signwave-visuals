import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import fbrSignsLogo from "@/assets/fbrsigns-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/ecommerce" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { state } = useCart();

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
          <Link to="/" className="flex items-center group">
            <img 
              src={fbrSignsLogo} 
              alt="FBRSigns Logo" 
              className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
            />
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

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <Link to="/ecommerce">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {state.itemCount > 99 ? '99+' : state.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Login Button */}
            <LoginDialog>
              <GlassButton variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </GlassButton>
            </LoginDialog>
            
            <Link to="/quote-request">
              <GlassButton variant="outline" size="sm">
                Get a quote
              </GlassButton>
            </Link>
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
              {/* Mobile Cart */}
              <Link to="/ecommerce" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-center" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrinho
                  {state.itemCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              {/* Mobile Login */}
              <LoginDialog>
                <GlassButton variant="outline" className="w-full" size="lg">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </GlassButton>
              </LoginDialog>
              
              <Link to="/quote-request" onClick={() => setIsOpen(false)}>
                <GlassButton variant="outline" className="w-full" size="lg">
                  Get a quote
                </GlassButton>
              </Link>
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
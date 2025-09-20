import React from "react";
import { GlassNavbar } from "./GlassNavbar";
import { GlassFooter } from "./GlassFooter";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-secondary rounded-full opacity-10 blur-3xl animate-float float-delay-1" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float float-delay-2" />
      </div>

      <GlassNavbar />
      
      <main className={`relative pt-16 ${className}`}>
        {children}
      </main>
      
      <GlassFooter />
    </div>
  );
};
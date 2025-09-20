import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GlassButton } from '@/components/ui/glass-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { User, Lock, Mail } from 'lucide-react';

interface LoginDialogProps {
  children: React.ReactNode;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API endpoint
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      toast({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
      });
      
      setIsOpen(false);
      setFormData({ email: '', password: '' });
      
      // TODO: Redirect to customer dashboard
      // window.location.href = '/dashboard';
      
    } catch (error) {
      toast({
        title: "Login error",
        description: "Check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Recovery",
      description: "Feature under development. Please contact us.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <User className="h-5 w-5" />
            Dashboard Access
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex flex-col space-y-3 pt-4">
            <GlassButton
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </GlassButton>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </Button>
          </div>
        </form>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{' '}
          <Button variant="link" size="sm" className="p-0 h-auto">
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
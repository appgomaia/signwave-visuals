import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/useCart';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const checkoutSchema = z.object({
  // Customer Information
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email'),
  customerPhone: z.string().min(10, 'Phone must be at least 10 digits'),
  customerCompany: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password confirmation is required'),
  
  // Shipping Address
  street: z.string().min(5, 'Address must be at least 5 characters'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Neighborhood is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  
  // Payment
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'pix']),
  
  // Additional
  notes: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack, onSuccess }) => {
  const { state, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'pix'
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const onSubmit = async (data: CheckoutForm) => {
    if (state.items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add items to cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create shipping address object
      const shippingAddress = {
        street: data.street,
        number: data.number,
        complement: data.complement || '',
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      };

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          total: state.total,
          payment_method: data.paymentMethod,
          shipping_address: shippingAddress,
          notes: data.notes || '',
          status: 'Pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and show success
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.invoice_number || order.id.slice(0, 8)} has been created. You will receive a confirmation email shortly.`
      });

      onSuccess();

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Error processing order",
        description: error.message || "Please try again or contact us.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Empty Cart</h1>
        <p className="text-muted-foreground mb-8">
          Add products to your cart before checkout.
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Customer Information */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Customer Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" placeholder="+1 (555) 123-4567" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password *</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </GlassCard>

                {/* Shipping Address */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment/Suite</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neighborhood *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" placeholder="CA" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="md:w-48">
                          <FormLabel>ZIP Code *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" placeholder="12345" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </GlassCard>

                {/* Payment Method */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50">
                              <RadioGroupItem value="pix" id="pix" />
                              <Label htmlFor="pix" className="flex-1 cursor-pointer">PIX (Instant Approval)</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50">
                              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                              <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">Bank Transfer</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50">
                              <RadioGroupItem value="credit_card" id="credit_card" />
                              <Label htmlFor="credit_card" className="flex-1 cursor-pointer">Credit Card</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </GlassCard>

                {/* Additional Notes */}
                <GlassCard className="p-6">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="glass-input min-h-20"
                            placeholder="Additional information about your order..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </GlassCard>

                {/* Submit Button */}
                <GlassButton 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </GlassButton>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/50 pt-4 mt-6">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Frete:</span>
                  <span className="text-success">Grátis</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border/30">
                  <span>Total:</span>
                  <span className="text-gradient">{formatPrice(state.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Ao finalizar a compra, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
  );
};